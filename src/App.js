import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {SafeAreaProvider, useSafeArea} from 'react-native-safe-area-context';
import {RootSiblingParent} from 'react-native-root-siblings';

import LaunchController from "./Main/Welcome/LaunchController";
import MainController from "./Main/Home/MainController";
import StorageController from "./Main/Home/storage/StorageController";
import WidgetController from "./Main/Home/view/WidgetController";
import RefreshController from "./Main/Home/view/RefreshController";
import HttpController from "./Main/Home/view/HttpController";
import WebViewController from "./Main/Home/view/WebViewController";
import RootStore from "./Main/Store/RootStore";

const rootStore = new RootStore();

export default function App() {
    console.disableYellowBox = true;
    return <SafeAreaProvider>
        <RootSiblingParent>
            <RouterList/>
        </RootSiblingParent>
    </SafeAreaProvider>
}

function RouterList() {//项目页面清单
    global.INSETS = useSafeArea();
    return <Router {...rootStore}>
        <Scene key="root" hideNavBar>
            <Scene initial={true} component={LaunchController}/>
            <Scene key='main' component={MainController}/>
            <Scene key='http' component={HttpController}/>
            <Scene key='storage' component={StorageController}/>
            <Scene key='widget' component={WidgetController}/>
            <Scene key='refreshList' component={RefreshController}/>
            <Scene key='webView' component={WebViewController}/>
        </Scene>
    </Router>
}
