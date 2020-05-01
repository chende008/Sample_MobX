import React, {PureComponent} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {RFStorage, RFWidget} from 'react-native-fast-app';
import {RNStorage} from '../Common/storage/AppStorage';
import {Assets} from "../Home/http/Api";
import RFLog from "../Common/utils/RFLog";

export default class LaunchController extends PureComponent {

    constructor(props) {
        super(props);
        this.init();
    }

    init = () => {
        RFStorage.initStorage(RNStorage, () => {
            global.navigation = this.props.navigation;
            navigation.reset({routes: [{name: 'Main'}],});
        }, (data) => {
            this.printLog(data)
        }, '1.0', AsyncStorage);
        RFWidget.initReferenceScreen(375, 677);
    };

    printLog = (data) => {
        data.map(([keyStr, value]) => {
            let [, key] = keyStr.split('#');
            RFLog.log('持久化数据变更:', key, '<###>', value);
        })
    };

    render() {
        return null;
    }

}

