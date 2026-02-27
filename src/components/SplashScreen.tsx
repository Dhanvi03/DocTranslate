import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  // --- Animated values ---
  const containerOpacity = useRef(new Animated.Value(0)).current;
  const containerScale = useRef(new Animated.Value(0.8)).current;

  const logoScale = useRef(new Animated.Value(0.8)).current;

  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;

  const dotsOpacity = useRef(new Animated.Value(0)).current;

  // Per-dot pulse animations
  const dot0Scale = useRef(new Animated.Value(1)).current;
  const dot1Scale = useRef(new Animated.Value(1)).current;
  const dot2Scale = useRef(new Animated.Value(1)).current;
  const dot0Opacity = useRef(new Animated.Value(0.5)).current;
  const dot1Opacity = useRef(new Animated.Value(0.5)).current;
  const dot2Opacity = useRef(new Animated.Value(0.5)).current;

  const screenOpacity = useRef(new Animated.Value(1)).current;

  const pulseDot = (scale: Animated.Value, opacity: Animated.Value, delay: number) =>
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.sequence([
            Animated.timing(scale, { toValue: 1.5, duration: 500, useNativeDriver: true }),
            Animated.timing(scale, { toValue: 1, duration: 500, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0.5, duration: 500, useNativeDriver: true }),
          ]),
        ]),
      ])
    );

  useEffect(() => {
    // 1. Container fade + scale in
    Animated.parallel([
      Animated.timing(containerOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(containerScale, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(logoScale, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();

    // 2. Text slides up (delay 300ms)
    Animated.parallel([
      Animated.timing(textOpacity, { toValue: 1, duration: 500, delay: 300, useNativeDriver: true }),
      Animated.timing(textTranslateY, { toValue: 0, duration: 500, delay: 300, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();

    // 3. Dots appear (delay 600ms)
    Animated.timing(dotsOpacity, { toValue: 1, duration: 400, delay: 600, useNativeDriver: true }).start(() => {
      // Start pulsing
      pulseDot(dot0Scale, dot0Opacity, 0).start();
      pulseDot(dot1Scale, dot1Opacity, 200).start();
      pulseDot(dot2Scale, dot2Opacity, 400).start();
    });

    // 4. Fade out at 2500ms
    Animated.timing(screenOpacity, {
      toValue: 0,
      duration: 500,
      delay: 2500,
      useNativeDriver: true,
    }).start(() => onFinish());
  }, []);

  return (
    <Animated.View style={[styles.screen, { opacity: screenOpacity }]}>
      <Animated.View
        style={[
          styles.content,
          { opacity: containerOpacity, transform: [{ scale: containerScale }] },
        ]}
      >
        {/* Logo Circle */}
        <Animated.View style={[styles.logoCircle, { transform: [{ scale: logoScale }] }]}>
          <Text style={styles.logoText}>D</Text>
        </Animated.View>

        {/* App Name + Tagline */}
        <Animated.View
          style={[
            styles.textBlock,
            { opacity: textOpacity, transform: [{ translateY: textTranslateY }] },
          ]}
        >
          <Text style={styles.appName}>DocTranslate Pro</Text>
          <Text style={styles.tagline}>Scan, Translate, Transform</Text>
        </Animated.View>

        {/* Loading Dots */}
        <Animated.View style={[styles.dotsRow, { opacity: dotsOpacity }]}>
          {[
            { scale: dot0Scale, opacity: dot0Opacity },
            { scale: dot1Scale, opacity: dot1Opacity },
            { scale: dot2Scale, opacity: dot2Opacity },
          ].map((dot, i) => (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                { transform: [{ scale: dot.scale }], opacity: dot.opacity },
              ]}
            />
          ))}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1a1d29',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  content: {
    alignItems: 'center',
    gap: 32,
  },
  logoCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#4dd0e1',
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow matching "shadow-2xl shadow-[#4dd0e1]/30"
    shadowColor: '#4dd0e1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 20,
  },
  logoText: {
    fontSize: 56,
    fontWeight: '700',
    color: '#1a1d29',
    lineHeight: 64,
  },
  textBlock: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 34,
    fontWeight: '700',
    color: '#4dd0e1',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 17,
    color: '#9ca3af', // gray-400
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4dd0e1',
  },
});