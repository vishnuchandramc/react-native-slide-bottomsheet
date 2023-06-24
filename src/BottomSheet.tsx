/**
 * Developed by Vishnu Chandra MC <https://https://github.com/vishnuchandramc>
 * BottomSheet component for displaying a bottom sheet overlay.
 *
 * @param {BottomSheetProps} props - The component props.
 * @returns {JSX.Element|null} The rendered BottomSheet component.
 */

/**
 * Props for the BottomSheet component.
 *
 * @typedef {Object} BottomSheetProps
 * @property {boolean} visible - Whether the bottom sheet is visible or not.
 * @property {React.ReactNode} children - Content of the bottom sheet.
 * @property {number|string} [height=300] - Height of the bottom sheet (can be a number or a string with percentage).
 * @property {boolean} [scrollable=true] - Whether the content of the bottom sheet is scrollable.
 * @property {number} [animationDuration=300] - Duration of the animation for opening/closing the bottom sheet.
 * @property {Object} [backdrop] - Configurations for the backdrop behind the bottom sheet.
 * @property {number} [backdrop.backdropOpacity=0.2] - Opacity of the backdrop.
 * @property {string} [backdrop.backdropColor='#000'] - Color of the backdrop.
 * @property {Object} [style] - Custom styles for the bottom sheet container.
 * @property {string} [style.backgroundColor='#fff'] - Background color of the bottom sheet.
 * @property {number} [style.borderTopLeftRadius=10] - Top left border radius of the bottom sheet.
 * @property {number} [style.borderTopRightRadius=10] - Top right border radius of the bottom sheet.
 * @property {string} [style.borderColor] - Border color of the bottom sheet.
 * @property {number} [style.borderWidth] - Border width of the bottom sheet.
 * @property {string} [style.shadowColor] - Shadow color of the bottom sheet.
 * @property {{ width: number, height: number }} [style.shadowOffset] - Shadow offset of the bottom sheet.
 * @property {number} [style.shadowRadius] - Shadow radius of the bottom sheet.
 * @property {number} [style.elevation] - Elevation of the bottom sheet (Android only).
 * @property {boolean} [handleBarVisible=true] - Whether to show the handle bar at the top of the bottom sheet.
 * @property {Object} [handleBarStyle] - Custom styles for the handle bar.
 * @property {string} [handleBarStyle.backgroundColor='#ccc'] - Background color of the handle bar.
 * @property {number} [handleBarStyle.width=40] - Width of the handle bar.
 * @property {number} [handleBarStyle.height=4] - Height of the handle bar.
 * @property {() => void} onClose - Callback function when the bottom sheet is closed.
 * @property {() => void} [onBackdropPress] - Callback function when the backdrop is pressed.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';

const { height: windowHeight } = Dimensions.get('window');

interface BottomSheetProps {
  visible: boolean;
  children: React.ReactNode;
  height?: number | string;
  scrollable?: boolean;
  animationDuration?: number;
  backdrop?: {
    backdropOpacity?: number;
    backdropColor?: string;
  };
  style?: {
    backgroundColor?: string;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderColor?: string;
    borderWidth?: number;
    shadowColor?: string;
    shadowOffset?: { width: number; height: number };
    shadowRadius?: number;
    elevation?: number;
  };
  handleBarVisible?: boolean;
  handleBarStyle?: {
    backgroundColor?: string;
    width?: number;
    height?: number;
  };
  onClose: () => void;
  onBackdropPress?: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  height = 300,
  scrollable = true,
  animationDuration = 300,
  backdrop = {},
  style = {},
  handleBarVisible: handleBarVisible = true,
  handleBarStyle = {},
  onBackdropPress = onClose,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const bottomSheetAnimation = useRef(new Animated.Value(0)).current;
  const backdropAnimation = useRef(new Animated.Value(0)).current;
  const opacityAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      setIsRendered(true);
      Animated.parallel([
        Animated.timing(bottomSheetAnimation, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnimation, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnimation, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(bottomSheetAnimation, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }).start(() => {
        setIsRendered(false);
        onClose();
      });

      Animated.timing(backdropAnimation, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();

      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!isRendered) {
    return null;
  }

  const parseHeight = () => {
    if (typeof height === 'number') {
      return height;
    }
    if (typeof height === 'string' && height.endsWith('%')) {
      const percentage = parseInt(height, 10) / 100;
      return percentage * windowHeight;
    }
    return height;
  };

  const sheetHeight = parseHeight();

  const handleContentPress = (event: any) => {
    event.stopPropagation();
  };

  const renderContent = () => {
    if (scrollable) {
      return (
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <TouchableOpacity activeOpacity={1} onPress={handleContentPress}>
          <View style={styles.contentWrapper}>{children}</View>
          </TouchableOpacity>
        </ScrollView>
      );
    }
    return (
      <TouchableOpacity activeOpacity={1} onPress={handleContentPress}>
         <View style={styles.contentWrapper}>{children}</View>
      </TouchableOpacity>
    );
  };

  const { backdropOpacity = 0.2, backdropColor = '#000' } = backdrop;

  const backdropOpacityInterpolation = backdropAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, backdropOpacity],
  });

  const {
    backgroundColor = '#fff',
    borderTopLeftRadius = 10,
    borderTopRightRadius = 10,
    borderColor,
    borderWidth,
    shadowColor,
    shadowOffset,
    shadowRadius,
    elevation,
  } = style;

  const { backgroundColor: handleBarBackgroundColor = '#ccc', width: handleBarWidth = 40, height: handleBarHeight = 4 } =
    handleBarStyle;

  const handleBarComponent = handleBarVisible ? (
    <View
      style={[
        styles.handleBar,
        {
          backgroundColor: handleBarBackgroundColor,
          width: handleBarWidth,
          height: handleBarHeight,
        },
      ]}
    />
  ) : null;

  return (
    <TouchableOpacity activeOpacity={1} onPress={onBackdropPress} style={styles.overlay}>
      <Animated.View
        style={[
          styles.backdrop,
          {
            backgroundColor: backdropColor,
            opacity: backdropOpacityInterpolation,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            height: sheetHeight,
            transform: [
              {
                translateY: bottomSheetAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [sheetHeight, 0],
                }),
              },
            ],
            opacity: opacityAnimation,
            backgroundColor,
            borderTopLeftRadius,
            borderTopRightRadius,
            borderColor,
            borderWidth,
            shadowColor,
            shadowOffset,
            shadowRadius,
            elevation,
          },
        ]}
      >
        <TouchableOpacity activeOpacity={1} style={[styles.bottomSheet,{height:sheetHeight}]} onPress={handleContentPress}>
        {handleBarComponent}
        {renderContent()}
      </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  contentWrapper: {
    flex: 1,
  },
  bottomSheet: {
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -3 },
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  scrollContentContainer: {
    flexGrow: 1,
    padding: 16,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  handleBar: {
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 12,
    borderRadius: 3,
  },
});

export default BottomSheet;
