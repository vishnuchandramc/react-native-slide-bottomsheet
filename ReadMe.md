# React Native Slide BottomSheet

React Native Slide BottomSheet is a customizable component for creating elegant bottom sheets in your React Native applications. It provides a great user experience with smooth animations and flexible height options.

## Features

- Customizable styles to match your app's design and theme.
- Support for scrollable content within the bottom sheet.
- Configurable backdrop with adjustable opacity and color.
- Optional handle bar for easy interaction.
- Responsive height options, including fixed height and percentage-based height.
- Event callbacks for closing the bottom sheet and handling backdrop press.

## Example
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/43258677/248535693-50b7cc71-18fa-4cf1-bb25-51e44384cbef.gif" alt="Image" width="420" height="772" />

## Installation

You can install the React Native BottomSheet package using npm or yarn:

```bash
npm install react-native-slide-bottomsheet
```

or

```bash
yarn add react-native-slide-bottomsheet
```

## Usage

To use the BottomSheet component in your React Native application, simply import it and include it in your JSX:

```jsx
import React from "react";
import { View, Text } from "react-native";
import BottomSheet from "react-native-slide-bottomsheet";

const App = () => {
  return (
    <View>
      <Text>Content above the bottom sheet</Text>
      <BottomSheet
        visible={true}
        onClose={() => console.log("Bottom sheet closed")}
      >
        <View>
          <Text>Content inside the bottom sheet</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default App;
```

## Props

The following table describes the available props for the React Native BottomSheet component:

| Prop                             | Type                              | Description                                                               |
| -------------------------------- | --------------------------------- | ------------------------------------------------------------------------- |
| `visible`                        | boolean                           | Whether the bottom sheet is visible or not.                               |
| `onClose`                        | () => void                        | Callback function when the bottom sheet is closed.                        |
| `children`                       | React.ReactNode                   | Content of the bottom sheet.                                              |
| `height`                         | number \| string                  | Height of the bottom sheet (can be a number or a string with percentage). |
| `scrollable`                     | boolean                           | Whether the content of the bottom sheet is scrollable.                    |
| `animationDuration`              | number                            | Duration of the animation for opening/closing the bottom sheet.           |
| `backdrop`                       | object                            | Configurations for the backdrop behind the bottom sheet.                  |
| `backdrop.backdropOpacity`       | number                            | Opacity of the backdrop.                                                  |
| `backdrop.backdropColor`         | string                            | Color of the backdrop.                                                    |
| `style`                          | object                            | Custom styles for the bottom sheet container.                             |
| `style.backgroundColor`          | string                            | Background color of the bottom sheet.                                     |
| `style.borderTopLeftRadius`      | number                            | Top left border radius of the bottom sheet.                               |
| `style.borderTopRightRadius`     | number                            | Top right border radius of the bottom sheet.                              |
| `style.borderColor`              | string                            | Border color of the bottom sheet.                                         |
| `style.borderWidth`              | number                            | Border width of the bottom sheet.                                         |
| `style.shadowColor`              | string                            | Shadow color of the bottom sheet.                                         |
| `style.shadowOffset`             | { width: number, height: number } | Shadow offset of the bottom sheet.                                        |
| `style.shadowRadius`             | number                            | Shadow radius of the bottom sheet.                                        |
| `style.elevation`                | number                            | Elevation of the bottom sheet (Android only).                             |
| `handleBarVisible`               | boolean                           | Whether to show the handle bar at the top of the bottom sheet.            |
| `handleBarStyle`                 | object                            | Custom styles for the handle bar.                                         |
| `handleBarStyle.backgroundColor` | string                            | Background color of the handle bar.                                       |
| `handleBarStyle.width`           | number                            | Width of the handle bar.                                                  |
| `handleBarStyle.height`          | number                            | Height of the handle bar.                                                 |
| `onBackdropPress`                | () => void                        | Callback function when the backdrop is pressed.                           |

<!-- ## Examples

You can find complete examples and usage scenarios in the [examples](link-to-examples) directory of this repository. Feel free to explore them and adapt them to your needs. -->

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request. Let's make this package even better together!

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007.
