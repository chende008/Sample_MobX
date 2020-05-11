import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {RFText, RFView} from 'react-native-fast-app';
import {Colors} from "../../Common/storage/Const";
import {ParentView} from "../../Common/widgets/WidgetNavigation";
import {RNItem} from "../../Common/widgets/WidgetDefault";
import {Actions} from 'react-native-router-flux'
import {observer} from "mobx-react";

/**
 * 其它接口请求，接口返回的非json数据结构（纯文本&XML数据）
 */

@observer
export default class MineController extends PureComponent {

    render() {
        const {moviesList, animalImageList, queryMemberList, getCityList, content} = this.props.storeMine;
        return <ParentView>
            <RNItem text='简单数据：标准的json' onPress={() => moviesList()}/>
            <RNItem text='获取图片列表：标准的json' onPress={() => animalImageList()}/>
            <RNItem text='同步请求成员列表：标准的json' onPress={() => queryMemberList()}/>
            <RNItem text='省份、城市记录数量：返回 XML' onPress={() => getCityList()}/>
            <RFView style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <RFText text='跳转到首页' style={styles.btn} onPress={() => Actions.jump('home')}/>
                <RFText text='数据存储管理' style={styles.btn} onPress={() => Actions.storage()}/>
                <RFText text='打开H5页面' style={styles.btn} onPress={() => Actions.webView()}/>
            </RFView>
            <ScrollView>
                <RFText style={{fontSize: 12, color: Colors.text_lighter, padding: 10}} text={content}/>
            </ScrollView>
        </ParentView>;
    }


}

const styles = StyleSheet.create({
    btn: {
        margin: 10,
        padding: 10,
        fontSize: 14,
        borderRadius: 5,
        textAlign: 'center',
        color: Colors.white,
        backgroundColor: Colors.text_disable,
    },
});

