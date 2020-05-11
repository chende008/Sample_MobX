import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {SafeAreaProvider, useSafeArea} from 'react-native-safe-area-context';
import {RootSiblingParent} from 'react-native-root-siblings';

import LaunchController from "./Main/Welcome/LaunchController";
import StorageController from "./Main/Home/view/StorageController";
import WebViewController from "./Main/Home/view/WebViewController";
import RootStore from "./Main/Store/RootStore";
import {RFImage, RFWidget} from "react-native-fast-app";
import {Assets} from "./Main/Home/http/Api";
import {Colors} from "./Main/Common/storage/Const";
import HomeController from "./Main/Home/tabs/HomeController";
import DiscoverController from "./Main/Home/tabs/DiscoverController";
import MineController from "./Main/Home/tabs/MineController";

const rootStore = new RootStore();

export default function App() {
    console.disableYellowBox = true;
    RFWidget.initResource(Assets);
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
            <Scene key='main' {...tabProps} >
                <Scene key='home'
                       tabs={true}
                       title='首页'
                       component={HomeController}
                       icon={({focused}) => <RFImage style={{width: 24, height: 24}} icon={focused ? 'home_sel' : 'home_dis'}/>}/>
                <Scene key='discover'
                       tabs={true}
                       title='发现'
                       component={DiscoverController}
                       icon={({focused}) => <RFImage style={{width: 24, height: 24}} icon={focused ? 'discover_sel' : 'discover_dis'}/>}/>
                <Scene key='mine'
                       tabs={true}
                       title='我的'
                       component={MineController}
                       icon={({focused}) => <RFImage style={{width: 24, height: 24}} icon={focused ? 'mine_sel' : 'mine_dis'}/>}/>
            </Scene>
            <Scene key='storage' component={StorageController}/>
            <Scene key='webView' component={WebViewController}/>
        </Scene>
    </Router>
}

const tabProps = {
    activeTintColor: Colors.text_light,
    inactiveTintColor: Colors.text_disable,
    swipeEnabled: true,
    headerMode: 'none',
    tabs: true
};
