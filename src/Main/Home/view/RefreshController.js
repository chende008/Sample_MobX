import React, {PureComponent} from 'react';

import {StyleSheet, View, SafeAreaView} from 'react-native';

import {Colors, CommonStyles, Const} from '../../Common/storage/Const';
import {RFImage, RFlatList, RFText, RFView} from 'react-native-fast-app';
import {NavigationBar} from '../../Common/widgets/WidgetNavigation';
import StoreRefresh from "../../Store/StoreRefresh";
import {observer} from 'mobx-react';

const headerText = '分页列表支持：无网络，加载中，无数据，加载错误，加载更多等一系列状态展示';

@observer
export default class RefreshController extends PureComponent {

    render() {
        const {queryDataList} = StoreRefresh;
        return <SafeAreaView style={CommonStyles.container}>
            <NavigationBar title='RefreshList组件'/>
            <RFlatList data={StoreRefresh.dataList}
                       onRefresh={() => queryDataList(true, this.refreshList)}
                       onLoadMore={() => queryDataList(false, this.refreshList)}
                       refreshStatus={{RefreshingData: {text: '刷新中，请稍候...'},}}
                       ListHeaderComponent={() => <RFText style={styles.header} text={headerText}/>}
                       ref={refreshList => this.refreshList = refreshList}
                       renderItem={({item, index}) => this.renderItem(item, index)}/>
        </SafeAreaView>;
    }

    componentDidMount() {
        StoreRefresh.queryDataList(true, this.refreshList);
    }

    renderItem = (item, index) => {
        let {title, image_url, type, score, synopsis, members} = item;
        return <RFView key={index} style={styles.itemParent}>
            <RFImage style={{width: 120, height: 120, margin: 5}} resizeMode='contain' icon={image_url}/>
            <RFView style={{flex: 1}}>
                <RFText style={{fontSize: 14, fontWeight: 'bold', color: Colors.text, paddingRight: 5}} text={'名称：' + title}/>
                <RFText style={styles.itemDesc} numberOfLines={4} text={synopsis}/>
                <RFText style={{fontSize: 12, color: Colors.text}} text={'评分：' + score + '    参与人数：' + members}/>
            </RFView>
        </RFView>;
    };


}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        fontSize: 12,
        lineHeight: 16,
        color: Colors.red,
    },
    itemParent: {
        marginTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        borderBottomWidth: Const.onePixel,
        borderBottomColor: Colors.split_line,
    },
    itemDesc: {
        flex: 1,
        fontSize: 12,
        lineHeight: 16,
        paddingRight: 8,
        paddingVertical: 5,
        color: Colors.text_lighter,
    },
});
