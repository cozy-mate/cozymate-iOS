import analytics from '@react-native-firebase/analytics';
import React, { createContext, useContext } from 'react';

import {
  Actions,
  ButtonEvent,
  EventCategory,
  GestureEvent,
  InputEvent,
  ScreenName,
} from '@/utils/ga/eventEnum';

type TrackerContextType = {
  trackButton: (
    name: ButtonEvent,
    category: EventCategory,
    extra?: Record<string, unknown>,
  ) => Promise<void>;
  trackInput: (
    name: InputEvent,
    category: EventCategory,
    extra?: Record<string, unknown>,
  ) => Promise<void>;
  trackScreen: (screen: ScreenName | string, extra?: Record<string, unknown>) => Promise<void>;
  trackGesture: (
    gesture: GestureEvent,
    category: EventCategory,
    extra?: Record<string, unknown>,
  ) => Promise<void>;
};

const TrackerContext = createContext<TrackerContextType>({
  trackButton: async () => {},
  trackInput: async () => {},
  trackScreen: async () => {},
  trackGesture: async () => {},
});

export const useTracker = () => useContext(TrackerContext);

export const TrackerProvider = ({ children }: { children: React.ReactNode }) => {
  const trackButton = async (
    label: ButtonEvent,
    category: EventCategory,
    extra?: Record<string, unknown>,
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

  const trackScreen = async (screen: ScreenName | string, extra?: Record<string, unknown>) => {
    try {
      await analytics().logScreenView({
        screen_name: screen,
        screen_class: screen,
        ...extra,
      });
    } catch (e) {
      console.error('[GA] trackScreen error', e);
    }
  };

  const trackGesture = async (
    gesture: GestureEvent,
    category: EventCategory,
    extra?: Record<string, unknown>,
  ) => {
    try {
      await analytics().logEvent('gesture', {
        gesture,
        category,
        ...extra,
      });
    } catch (e) {
      console.error('[GA] trackGesture error', e);
    }
  };

  return (
    <TrackerContext.Provider value={{ trackButton, trackInput, trackScreen, trackGesture }}>
      {children}
    </TrackerContext.Provider>
  );
};
