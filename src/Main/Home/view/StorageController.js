import React, {PureComponent} from 'react';

import {Clipboard, ScrollView, StyleSheet} from 'react-native';
import {Colors} from '../../Common/storage/Const';
import {toStr} from '../../Common/utils/Utils';
import {dateFormat} from '../../Common/utils/DateUtils';
import {RNStorage} from '../../Common/storage/AppStorage';
import {RFText, RFView} from 'react-native-fast-app';
import {NavigationBar, ParentView} from '../../Common/widgets/WidgetNavigation';
import {RNItem, RNLine} from '../../Common/widgets/WidgetDefault';
import DeviceInfo from 'react-native-device-info';
import {showToast} from '../../Common/widgets/Loading';
import {observer} from "mobx-react";

const json = {age: 25, name: 'Tom', gender: 'male', time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm')};

@observer
export default class StorageController extends PureComponent {

    render() {
        let {text, dataChangedCount, refreshText, refreshDataCount} = this.props.storeData;
        return <ParentView bottomINSET>
            <NavigationBar title='数据存储'/>
            <RFView>
                <RFView style={{flexDirection: 'row'}}>
                    <RNItem text='设置字符串' style={{flex: 1}} onPress={() => RNStorage.str = 'this is a string '}/>
                    <RNItem text='获取字符串' style={{flex: 1}} onPress={() => refreshText(RNStorage.str + dateFormat(new Date(), 'yyyy-MM-dd hh:mm'))}/>
                </RFView>
                <RFView style={{flexDirection: 'row'}}>
                    <RNItem text='设置Json' style={{flex: 1}} onPress={() => RNStorage.json = json}/>
                    <RNItem text='获取Json' style={{flex: 1}} onPress={() => refreshText(JSON.stringify(RNStorage.json))}/>
                </RFView>
                <RNItem text='随机字符串' onPress={() => {
                    RNStorage[DeviceInfo.getBundleId()] = '随机数据value：' + new Date().valueOf();
                    refreshDataCount(dataChangedCount + 1);
                }}/>
            </RFView>
            <ScrollView>{
                Object.keys(RNStorage).map((key) => <RFView style={{backgroundColor: Colors.split_line, marginBottom: 1, padding: 10}}>
                    <RFText style={{fontSize: 15, color: Colors.text, fontWeight: 'bold'}} text={key + '-> '}/>
                    {RNStorage[key] && <RFText style={{fontSize: 13, color: Colors.text_light, marginTop: 10}} text={toStr(RNStorage[key])} onPress={() => {
                        Clipboard.setString(toStr(RNStorage[key]));
                        showToast('已复制【' + toStr(RNStorage[key]) + '】到粘贴板');
                    }}/>}
                </RFView>)}
            </ScrollView>
            <RNLine/>
            <RFText style={styles.text} text={'文本内容：' + text}/>
        </ParentView>;
    }
}

const styles = StyleSheet.create({
    text: {
        padding: 10,
        fontSize: 14,
        color: Colors.red,
    },
});
