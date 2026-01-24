import { Stack } from 'expo-router';

export default function StudentRootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen 
        name="details" 
        options={{ 
          presentation: 'card',
        }} 
      />
    </Stack>
  );
}
