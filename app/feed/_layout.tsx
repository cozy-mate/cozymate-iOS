import { Stack } from 'expo-router';

export default function FeedLayout() {
    return (
        <Stack>
            <Stack.Screen name="edit" options={{ headerShown: false }} />
            <Stack.Screen name="create" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
    );
}
