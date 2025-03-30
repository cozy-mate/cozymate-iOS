import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { ReactNode, useEffect, useRef } from 'react';

interface BottomSheetComponentProps {
  children: ReactNode;
}

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={['100%']} index={-1} enablePanDownToClose={true}>
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetComponent;
