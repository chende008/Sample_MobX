import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {XText} from 'react-native-easy-app';
import {Colors} from "../../Common/storage/Const";
import {observer} from "mobx-react";
import {ParentView} from "../../Common/widgets/WidgetNavigation";

@observer
export default class HomeController extends PureComponent {

    render() {
        let {tips, dataList, addRandom, delRandom} = this.props.storeHome;
        return <ParentView>
            <XText text={tips} style={{fontSize: 13, fontWeight: 'bold', color: Colors.yellow, paddingLeft: 15, paddingTop: 15}}/>
            <XText text='添加随机数' style={styles.btn} onPress={() => addRandom()}/>
            <ScrollView>{
                dataList && dataList.map((item, index) => {
                    return <XText key={index}
                                  text={'随机数：' + item}
                                  iconPosition='right'
                                  iconSize={16}
                                  textExtend={true}
                                  icon='close'
                                  style={styles.itemText}
                                  onPress={() => delRandom(index)}/>;
                })}
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
    itemText: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderBottomColor: Colors.split_line,
        borderBottomWidth: 0.3,
    },
});
