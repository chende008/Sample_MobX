import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import {RootSiblingParent} from 'react-native-root-siblings';

import LaunchController from "./Main/Welcome/LaunchController";
import MainController from "./Main/Home/MainController";
import StorageController from "./Main/Home/storage/StorageController";
import WidgetController from "./Main/Home/view/WidgetController";
import RefreshController from "./Main/Home/view/RefreshController";
import HttpController from "./Main/Home/view/HttpController";
import WebViewController from "./Main/Home/view/WebViewController";

function ScreenList() {
    return <Stack.Navigator initialPage={LaunchController}
                            headerMode='none'>
        <Stack.Screen name='launch' component={LaunchController}/>
        <Stack.Screen name='main' component={MainController}/>
        <Stack.Screen name='http' component={HttpController}/>
        <Stack.Screen name='storage' component={StorageController}/>
        <Stack.Screen name='widget' component={WidgetController}/>
        <Stack.Screen name='refreshList' component={RefreshController}/>
        <Stack.Screen name='webView' component={WebViewController}/>
    </Stack.Navigator>
}

const Stack = createStackNavigator();

export default function RouterList() {
    console.disableYellowBox = true;
    return <SafeAreaProvider>
        <NavigationContainer>
            <RootSiblingParent>
                <ScreenList/>
            </RootSiblingParent>
        </NavigationContainer>
    </SafeAreaProvider>
}
