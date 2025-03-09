/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { BackgroundManager } from './BackgroundManager';

AppRegistry.registerHeadlessTask('BackgroundManager', () =>
    BackgroundManager,
);
AppRegistry.registerComponent(appName, () => App);
