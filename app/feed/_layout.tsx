import { Stack } from 'expo-router';

export default function FeedLayout() {
    return (
        <Stack>
            <Stack.Screen name="edit" options={{ headerShown: false }} />
        </Stack>
    );
}
