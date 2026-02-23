// src/screens/ChatScreen/container.tsx

import { useState } from 'react';
import { Alert } from 'react-native';
import SarvamAPI from '../../api/sarvamAPI';
import { getApiKey } from '../../services/storage';
import { ChatMessage } from '../../api/types';

export const useChatScreen = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            type: 'ai',
            text: 'Upload and extract text from a document first, then ask me questions about it!',
            content:'',
            role:'user'
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            type: 'user',
            text: inputText,
            content:inputText,
            role:'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setLoading(true);

        try {
            const apiKey = await getApiKey();
            if (!apiKey) {
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    type: 'ai',
                    text: 'Please configure API key in Settings.',
                    content:'',
                    role:'user'
                }]);
                return;
            }

            const result = await SarvamAPI.chatCompletion(apiKey, inputText);
            const aiResponse = result.choices?.[0]?.message?.content || 'No response';

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                text: aiResponse,
                content:aiResponse,
                role:'user'
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                text: 'Error: Failed to get response.',
                content:'',
                role:'user'
            }]);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        inputText,
        loading,
        setInputText,
        sendMessage,
    };
};