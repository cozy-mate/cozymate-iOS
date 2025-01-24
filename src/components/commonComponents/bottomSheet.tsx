import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useRef, useMemo, ReactNode, useCallback } from 'react';
import BottomSheetModal, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

interface BottomSheetComponentProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  isVisible,
  children,
  onClose,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['30%'], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={1} appearsOnIndex={2} onPress={onClose} />
    ),
    [],
  );

  return (
    isVisible && (
      <GestureHandlerRootView
        className="absolute h-screen w-screen flex-1 bg-modalBack"
        onTouchEnd={onClose}
      >
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          enablePanDownToClose={true}
          onChange={(index) => {
            if (index === -1) onClose();
          }}
          backdropComponent={renderBackdrop}
        >
          {children}
        </BottomSheetModal>
      </GestureHandlerRootView>
    )
  );
};

export default BottomSheetComponent;
