import React, {PureComponent} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {XStorage, XWidget} from 'react-native-easy-app';
import {RNStorage} from '../Common/storage/AppStorage';
import {Actions} from 'react-native-router-flux'
import RFLog from "../Common/utils/RFLog";
import HttpConfig from "../Home/http/HttpConfig";

export default class LaunchController extends PureComponent {

    constructor(props) {
        super(props);
        this.init();
    }

    init = () => {
        HttpConfig.initDemo();
        XStorage.initStorage(RNStorage, () => {
            Actions.reset('main')
        }, (data) => {
            this.printLog(data)
        }, '1.0', AsyncStorage);
        XWidget.initReferenceScreen(375, 677);
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

