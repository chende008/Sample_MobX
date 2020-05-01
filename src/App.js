import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {RootSiblingParent} from 'react-native-root-siblings';

import LaunchController from "./Main/Welcome/LaunchController";
import MainController from "./Main/Home/MainController";
import StorageController from "./Main/Home/storage/StorageController";
import WidgetController from "./Main/Home/view/WidgetController";
import RefreshController from "./Main/Home/view/RefreshController";
import HttpController from "./Main/Home/view/HttpController";
import WebViewController from "./Main/Home/view/WebViewController";

const {Navigator, Screen} = createStackNavigator();

export default function App() {
    console.disableYellowBox = true;
    return <SafeAreaProvider>
        <NavigationContainer>
            <RootSiblingParent>
                <ScreenList/>
            </RootSiblingParent>
        </NavigationContainer>
    </SafeAreaProvider>
}

function ScreenList() {
    return <Navigator headerMode='none'
                      initialPage={LaunchController}>
        <Screen name='Launch' component={LaunchController}/>
        <Screen name='Main' component={MainController}/>
        <Screen name='Http' component={HttpController}/>
        <Screen name='Storage' component={StorageController}/>
        <Screen name='Widget' component={WidgetController}/>
        <Screen name='RefreshList' component={RefreshController}/>
        <Screen name='WebView' component={WebViewController}/>
    </Navigator>
}
