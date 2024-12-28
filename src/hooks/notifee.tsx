import React, { useEffect, useState } from "react";
import notifee, { EventDetail, EventType } from '@notifee/react-native';
import { convertAction } from "@utils/fcm/convertAction";
import { AppState, Linking } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { requestUserPermission } from "@utils/fcm/fcmTokenUtil";

const deleteAllNotifee = async () => {
    await notifee.cancelAllNotifications();
};

export const useNotifee = (appLoaded: boolean = true) => {

    const [deepLinkUrl, setDeepLinkUrl] = useState<string | null>(null);

    useEffect(() => {
        const openDeepLink = async () => {
            if (deepLinkUrl && appLoaded) {
                await Linking.openURL(deepLinkUrl);
            }
        };
        openDeepLink();
    }, [appLoaded, deepLinkUrl])

    useEffect(() => {
        notifee.onForegroundEvent(async ({ type, detail }) => {
            console.log(detail)
            if (type === EventType.PRESS) {
                const deepLinkUrl = convertAction(detail);
                // console.log(deepLinkUrl);
                setDeepLinkUrl(deepLinkUrl);

                await deleteAllNotifee();
            } else if (type === EventType.DISMISSED) {
                await deleteAllNotifee();
            }
        });


        notifee.onBackgroundEvent(async ({ type, detail }) => {
            if (type === EventType.PRESS) {
                const deepLinkUrl = convertAction(detail);
                // console.log(deepLinkUrl);
                setDeepLinkUrl(deepLinkUrl);
                await deleteAllNotifee();
            } else if (type === EventType.DISMISSED) {
                await deleteAllNotifee();
            }
        });

    }, []);
}

export const useDeleteAllNotifee = () => {

    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                await deleteAllNotifee();
            }
            setAppState(nextAppState);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            deleteAllNotifee();
        }, []),
    );
};



