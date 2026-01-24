# Bundle Analysis

This project is set up with `react-native-bundle-visualizer` to help you analyze the size of your application bundle.

## How to use

### Analyze Mobile (iOS/Android)
To analyze the mobile bundle, run:
```bash
npm run analyze
```
This will generate a visual representation of the bundle size and open it in your browser.

### Analyze Web
To analyze the web bundle, run:
```bash
npm run analyze:web
```
This will export the web files to the `dist` folder and then run the bundle analyzer on the generated JavaScript files.

## Tools used
- [react-native-bundle-visualizer](https://github.com/didierbahengel/react-native-bundle-visualizer) - For mobile bundle visualization.
- [expo-bundle-analyzer](https://www.npmjs.com/package/expo-bundle-analyzer) - For web bundle analysis.
