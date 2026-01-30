import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Bell } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { client } from '@/src/lib/api';

interface ShakingBellIconProps {
  size?: number;
  color?: string;
  dotColor?: string;
  route: string; // Route to navigate to when tapped
  style?: any;
}

export function ShakingBellIcon({ size = 20, color = '#0EA5E9', dotColor = '#EF4444', route, style }: ShakingBellIconProps) {
  const router = useRouter();
  const [hasUnread, setHasUnread] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hasUnread) {
      // Create a smooth, wave-like bell ringing animation
      Animated.loop(
        Animated.sequence([
          // Smooth swing sequence with gentle rhythm
          Animated.parallel([
            // Rotation - smooth pendulum motion
            Animated.sequence([
              Animated.timing(shakeAnim, { 
                toValue: 1, 
                duration: 150, 
                easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Smooth ease-in-out
                useNativeDriver: true 
              }),
              Animated.timing(shakeAnim, { 
                toValue: -1, 
                duration: 300, 
                easing: Easing.bezier(0.42, 0, 0.58, 1), // Smooth swing
                useNativeDriver: true 
              }),
              Animated.timing(shakeAnim, { 
                toValue: 0.6, 
                duration: 200, 
                easing: Easing.bezier(0.42, 0, 0.58, 1),
                useNativeDriver: true 
              }),
              Animated.timing(shakeAnim, { 
                toValue: -0.6, 
                duration: 200, 
                easing: Easing.bezier(0.42, 0, 0.58, 1),
                useNativeDriver: true 
              }),
              Animated.timing(shakeAnim, { 
                toValue: 0, 
                duration: 150, 
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                useNativeDriver: true 
              }),
            ]),
            // Scale - subtle pulse
            Animated.sequence([
              Animated.timing(scaleAnim, { 
                toValue: 1.12, 
                duration: 200, 
                easing: Easing.out(Easing.quad),
                useNativeDriver: true 
              }),
              Animated.timing(scaleAnim, { 
                toValue: 1, 
                duration: 600, 
                easing: Easing.bezier(0.34, 1.56, 0.64, 1), // Elastic settle
                useNativeDriver: true 
              }),
              Animated.timing(scaleAnim, { 
                toValue: 1.05, 
                duration: 100, 
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true 
              }),
              Animated.timing(scaleAnim, { 
                toValue: 1, 
                duration: 200, 
                easing: Easing.out(Easing.quad),
                useNativeDriver: true 
              }),
            ]),
          ]),
          // Longer pause for elegance
          Animated.delay(3000),
        ])
      ).start();
    } else {
      shakeAnim.setValue(0);
      scaleAnim.setValue(1);
      opacityAnim.setValue(1);
    }
  }, [hasUnread]);

  const fetchNotifications = async () => {
    try {
      const data = await client.get('/notifications');
      const unread = data.some((n: any) => !n.read);
      setHasUnread(unread);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  const handlePress = () => {
    setHasUnread(false);
    router.push(route as any);
  };

  const rotation = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-12deg', '12deg'],
  });

  return (
    <TouchableOpacity onPress={handlePress} style={style} activeOpacity={0.7}>
      <View>
        <Animated.View style={{ 
          transform: [
            { rotate: rotation },
            { scale: scaleAnim }
          ] 
        }}>
          <Bell size={size} color={color} strokeWidth={2.2} />
        </Animated.View>
        {hasUnread && (
          <Animated.View style={[
            styles.notifDot, 
            { 
              backgroundColor: dotColor,
              transform: [{ scale: scaleAnim }]
            }
          ]} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  notifDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 3,
  },
});
