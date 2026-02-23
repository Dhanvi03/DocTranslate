// src/api/sarvamAPI.ts (FIXED - SIMPLE WORKING ZIP)

import { DocumentIntelligenceResponse, TranslationResponse, ChatCompletionResponse } from './types';
import JSZip from 'jszip';
import * as cheerio from "cheerio";


const BASE_URL = 'https://api.sarvam.ai';

class SarvamAPI {
  private getHeaders(apiKey: string) {
    return {
      'api-subscription-key': apiKey,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Document Intelligence - Extract text from images
   */
  async documentIntelligence(apiKey: string, base64ImageString: string, imageType: string = 'jpg'): Promise<DocumentIntelligenceResponse> {
    try {
      console.log('📄 Starting Document Intelligence...');

      // Step 1: Create Job
      const job = await this.createJob(apiKey);
      const jobId = job.job_id;
      console.log('✅ Job created:', jobId);

      // Step 2: Get upload URLs
      const uploadUrls = await this.getUploadUrls(apiKey, jobId);
      const uploadUrl = uploadUrls["document.zip"].file_url;
      console.log('✅ Got upload URL for ZIP');

      // Step 3: Create ZIP and upload
      await this.createAndUploadZip(uploadUrl, base64ImageString, imageType);
      console.log('✅ ZIP file uploaded');

      // Step 4: Start job
      await this.startJob(apiKey, jobId);
      console.log('✅ Job started');

      // Step 5: Wait for completion
      const result = await this.waitForCompletion(apiKey, jobId);
      console.log('✅ Document Intelligence complete');

      return result;
    } catch (error) {
      console.error('❌ Document Intelligence Error:', error);
      throw error;
    }
  }

  /**
   * Step 1: Create Job
   */
  private async createJob(apiKey: string): Promise<{ job_id: string }> {
    try {
      const response = await fetch(`${BASE_URL}/doc-digitization/job/v1`, {
        method: 'POST',
        headers: this.getHeaders(apiKey),
        body: JSON.stringify({
          job_parameters: {
            language: "hi-IN",
            output_format: "html"
          }
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        console.error('Create Job Response:', text);
        throw new Error(`Create Job Failed: ${response.status} - ${text}`);
      }

      const data = JSON.parse(text);
      return data;
    } catch (error) {
      console.error('Create Job Error:', error);
      throw error;
    }
  }

  /**
   * Step 2: Get Upload URLs
   */
  private async getUploadUrls(apiKey: string, jobId: string): Promise<any> {
    try {
      const response = await fetch(
        `${BASE_URL}/doc-digitization/job/v1/upload-files`,
        {
          method: "POST",
          headers: this.getHeaders(apiKey),
          body: JSON.stringify({
            job_id: jobId,
            files: ["document.zip"],
          }),
        }
      );

      const text = await response.text();

      if (!response.ok) {
        console.error('Get Upload URLs Response:', text);
        throw new Error(`Get Upload URLs Failed: ${response.status} - ${text}`);
      }

      const data = JSON.parse(text);
      return data.upload_urls;
    } catch (error) {
      console.error('Get Upload URLs Error:', error);
      throw error;
    }
  }

  /**
   * Step 3: Create ZIP and upload
   * FIXED: Uses proper ZIP structure that Azure/Sarvam accepts
   */

  private async createAndUploadZip(uploadUrl: string, base64String: string, imageType: string = 'jpg'): Promise<void> {
    const zip = new JSZip();
    const filename = imageType === 'png' ? 'document.png' : 'document.jpg';

    const binary = atob(base64String);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    zip.file(filename, bytes);

    const zipBlob = await zip.generateAsync({ type: "uint8array" });

    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": "application/zip",
      },
      body: zipBlob,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }
  }

  /**
   * Step 4: Start Job
   */
  private async startJob(apiKey: string, jobId: string): Promise<void> {
    try {
      const response = await fetch(
        `${BASE_URL}/doc-digitization/job/v1/${jobId}/start`,
        {
          method: "POST",
          headers: {
            "api-subscription-key": apiKey,
          },
        }
      );

      console.log('Start Job Response:', response);
      const text = await response.text();
      console.log('Start Job Response Text:', text);

      if (!response.ok) {
        console.error('Start Job Response:', text);
        throw new Error(`Start Job Failed: ${response.status} - ${text}`);
      }

      console.log('Job started successfully');
    } catch (error) {
      console.error('Start Job Error:', error);
      throw error;
    }
  }

  /**
   * Step 5: Wait for Completion
   */
  private async waitForCompletion(apiKey: string, jobId: string): Promise<DocumentIntelligenceResponse> {
    let status = "";
    let attempts = 0;
    const maxAttempts = 500;

    while (status !== "Completed" && attempts < maxAttempts) {
      await new Promise(res => setTimeout(res, 2000));
      attempts++;

      try {
        const fullUrl = `${BASE_URL}/doc-digitization/job/v1/${jobId}/status`;

        const response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            "api-subscription-key": apiKey,
          },
        });

        const text = await response.text();

        if (!response.ok) {
          throw new Error(`Get Status Failed: ${response.status} - ${text}`);
        }

        const data = JSON.parse(text);
        status = data.job_state;

        console.log(`⏳ Status (${attempts}/${maxAttempts}): ${status}`);

        if (status === "Failed") {
          throw new Error(`Processing failed: ${data.error || 'Unknown'}`);
        }

        if (status === "Completed") {
          console.log('✅ Job completed');

          // Step 6: Get download URL
          const downloadUrl = await this.getDownloadUrl(apiKey, jobId);

          // Step 7: Download + extract text
          const extractedText = await this.downloadAndExtractText(downloadUrl);

          return {
            extracted_text: extractedText,
            job_state: status,
            job_id: jobId,
          } as DocumentIntelligenceResponse;
        }


      } catch (error) {
        if (attempts >= maxAttempts) {
          throw error;
        }
      }
    }

    throw new Error(`Timeout after ${maxAttempts} attempts`);
  }
  private async getDownloadUrl(apiKey: string, jobId: string): Promise<string> {
    const response = await fetch(
      `${BASE_URL}/doc-digitization/job/v1/${jobId}/download-files`,
      {
        method: "POST",
        headers: this.getHeaders(apiKey),
        body: JSON.stringify({
          job_id: jobId,
          files: ["document.zip"],
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Get Download URL Failed: ${response.status} - ${text}`);
    }

    const data = await response.json();
    return data.download_urls["document.zip"].file_url;
  }
  private extractTextFromHTML(html: string): string {
    if (!html) return "";
    
    html = html.replace(/<br\s*\/?>/gi, " ");
    //Remove Title

    html= html.replace(/<title>[\s\S]*?<\/title>/gi, "");
    // Remove style blocks
    html = html.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "");

    // Remove script blocks
    html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");

    // Remove images
    html = html.replace(/<img[^>]*>/gi, "");

    // Remove all remaining HTML tags
    html = html.replace(/<\/?[^>]+(>|$)/g, "");

    // Decode basic HTML entities
    html = html
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

    return html.trim();
}




private async downloadAndExtractText(downloadUrl: string): Promise<string> {
    const response = await fetch(downloadUrl);
    const zipArrayBuffer = await response.arrayBuffer();

    const zip = await JSZip.loadAsync(zipArrayBuffer);

    const fileNames = Object.keys(zip.files);

    for (const name of fileNames) {
        if (name.endsWith(".html")) {
            const html = await zip.files[name].async("text");

            console.log("Html from returned file:", html);

            return this.extractTextFromHTML(html);
        }
    }

    return "";
}


  /**
   * Translate text
   */
  async translate(
    apiKey: string,
    text: string,
    sourceLanguage: string = 'auto',
    targetLanguage: string = 'hi-IN'
  ): Promise<TranslationResponse> {
    try {
      const response = await fetch(`${BASE_URL}/translate`, {
        method: 'POST',
        headers: this.getHeaders(apiKey),
        body: JSON.stringify({
          input: text,
          source_language_code: sourceLanguage,
          target_language_code: targetLanguage,
        }),
      });

      const text_response = await response.text();

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return JSON.parse(text_response) as TranslationResponse;
    } catch (error) {
      console.error('Translation Error:', error);
      throw error;
    }
  }

  /**
   * Chat completion
   */
  async chatCompletion(apiKey: string, message: string): Promise<ChatCompletionResponse> {
    try {
      const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: this.getHeaders(apiKey),
        body: JSON.stringify({
          model: 'sarvam-m',
          messages: [{ role: 'user', content: message }],
          max_tokens: 500,
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return JSON.parse(text) as ChatCompletionResponse;
    } catch (error) {
      console.error('Chat Error:', error);
      throw error;
    }
  }

  /**
   * Detect language
   */
  async detectLanguage(apiKey: string, text: string) {
    try {
      const response = await fetch(`${BASE_URL}/detect-language`, {
        method: 'POST',
        headers: this.getHeaders(apiKey),
        body: JSON.stringify({ input: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Language Detection Error:', error);
      throw error;
    }
  }

  /**
   * Verify API key
   */
  async verifyApiKey(apiKey: string): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/detect-language`, {
        method: 'POST',
        headers: this.getHeaders(apiKey),
        body: JSON.stringify({ input: 'test' }),
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}

export default new SarvamAPI();