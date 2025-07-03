import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Portal } from 'react-native-portalize';

interface BottomSheetComponentProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  snapPoints: number[];
  backdropFunc?: () => void;
  children: React.ReactNode;
}

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  bottomSheetRef,
  snapPoints,
  backdropFunc,
  children,
}) => {
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

export default BottomSheetComponent;
