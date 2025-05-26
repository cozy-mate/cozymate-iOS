import analytics from '@react-native-firebase/analytics';
import React, { createContext, useContext } from 'react';

import { Actions, ButtonEvent, EventCategory, InputEvent, ScreenName } from '@/utils/ga/eventEnum';

type TrackerContextType = {
    trackButton: (name: ButtonEvent, category: EventCategory, extra?: Record<string, unknown>) => Promise<void>;
    trackInput: (name: InputEvent, category: EventCategory, extra?: Record<string, unknown>) => Promise<void>;
    trackScreen: (screen: ScreenName) => Promise<void>;
};

const TrackerContext = createContext<TrackerContextType>({
    trackButton: async () => { },
    trackInput: async () => { },
    trackScreen: async () => { },
});

export const useTracker = () => useContext(TrackerContext);

export const TrackerProvider = ({ children }: { children: React.ReactNode }) => {
    const trackButton = async (
        label: ButtonEvent,
        category: EventCategory,
        extra?: Record<string, unknown>
    ) => {
        try {
            await analytics().logEvent('button_click', {
                action: Actions.button_click,
                label,
                category,
                ...extra,
            });
        } catch (e) {
            console.error('[GA] trackButton error', e);
        }
    };

    const trackInput = async (
        name: InputEvent,
        category: EventCategory,
        extra?: Record<string, unknown>,
    ) => {
        try {
            await analytics().logEvent('input_box', {
                name,
                category,
                ...extra,
            });
        } catch (e) {
            console.error('[GA] trackInput error', e);
        }
    };

    const trackScreen = async (screen: ScreenName) => {
        try {
            await analytics().logScreenView({
                screen_name: screen,
                screen_class: screen,
            });
        } catch (e) {
            console.error('[GA] trackScreen error', e);
        }
    };

    return (
        <TrackerContext.Provider value={{ trackButton, trackInput, trackScreen }}>
            {children}
        </TrackerContext.Provider>
    );
};