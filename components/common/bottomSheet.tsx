import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import type { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useRef } from 'react';
import { Text, View } from 'react-native';
import { Portal } from 'react-native-portalize';


import OpacityPressable from '../opacityPressable';

interface BottomSheetComponentProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  snapPoints: number[];
  backdropFunc?: () => void;
  children: React.ReactNode;
}

const BottomSheetComponent = ({
  bottomSheetRef,
  snapPoints,
  backdropFunc,
  children,
}: BottomSheetComponentProps) => {
  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.7}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            onPress={backdropFunc}
          />
        )}
      >
        {children}
      </BottomSheet>
    </Portal>
  );
};

export const BottomSheetItem = ({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) => {
  return (
    <OpacityPressable
      onPress={onPress}
      className="py-[11.5px]"
    >
      <Text className="Medium16 text-basicFont mx-[4px]">{text}</Text>
    </OpacityPressable>
  );
};

export const BottomSheetTitle = ({
  title,
}: {
  title: string;
}) => {
  return <View className="flex flex-row items-center justify-center w-full">
    <Text className="Medium18 text-emphasizedFont font-bold">{title}</Text>
  </View>

};
export const BottomSheetDivider = () => {
  return <View className="bg-[#F1F2F4] w-full h-[1px] my-[8px]" />;
};


export const useBottomSheet = ({
  snapPoints,
  backdropFunc
}: {
  snapPoints: number[];
  backdropFunc?: () => void;
}) => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  return {
    bottomSheetRef,
    open: () => bottomSheetRef.current?.expand(),
    close: () => bottomSheetRef.current?.close(),
    BottomSheetComponent: ({ children }: { children: React.ReactNode }) => (
      <BottomSheetComponent
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        backdropFunc={backdropFunc}
      >
        {children}
      </BottomSheetComponent>
    )
  };
};


export default BottomSheetComponent;
