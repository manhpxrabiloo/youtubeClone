import React, {forwardRef, ReactNode, useCallback, useMemo} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';

type BottomSheetForwardRefProps = {
  children: ReactNode;
  initialSnapPoints?: (string | number)[];
  backdropOpacity?: number;
} & BottomSheetProps;
const BottomSheetForwardRef = forwardRef<
  BottomSheet,
  BottomSheetForwardRefProps
>(
  (
    {children, initialSnapPoints = ['100%'], backdropOpacity = 1, ...rest},
    ref,
  ) => {
    const snapPoints = useMemo(() => initialSnapPoints, [initialSnapPoints]);
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={backdropOpacity}
        />
      ),
      [backdropOpacity],
    );
    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        enableContentPanningGesture={false}
        detached
        backgroundStyle={styles.backgroundStyle}
        {...rest}>
        {children}
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  backgroundStyle: {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
});

export default BottomSheetForwardRef;
