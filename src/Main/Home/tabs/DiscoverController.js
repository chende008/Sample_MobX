import React, {PureComponent} from 'react';

import {StyleSheet} from 'react-native';

import {Colors, Const} from '../../Common/storage/Const';
import {XImage, XFlatList, XText, XView} from 'react-native-easy-app';
import {ParentView} from '../../Common/widgets/WidgetNavigation';
import {observer} from 'mobx-react';

const headerText = '分页列表支持：无网络，加载中，无数据，加载错误，加载更多等一系列状态展示';

@observer
export default class DiscoverController extends PureComponent {

    render() {
        const {dataList = [], queryDataList} = this.props.storeDiscover;
        return <ParentView>
            <XFlatList data={dataList}
                      onRefresh={() => queryDataList(true, this.refreshList)}
                      onLoadMore={() => queryDataList(false, this.refreshList)}
                      refreshStatus={{RefreshingData: {text: '刷新中，请稍候...'},}}
                      ListHeaderComponent={() => <XText style={styles.header} text={headerText}/>}
                      ref={refreshList => this.refreshList = refreshList}
                      renderItem={({item, index}) => this.renderItem(item, index)}/>
        </ParentView>;
    }

    componentDidMount() {
        const {queryDataList} = this.props.storeDiscover;
        queryDataList(true, this.refreshList);
    }

    renderItem = (item, index) => {
        let {title, image_url, type, score, synopsis, members} = item;
        return <XView key={index} style={styles.itemParent}>
            <XImage style={{width: 120, height: 120, margin: 5}} resizeMode='contain' icon={image_url}/>
            <XView style={{flex: 1}}>
                <XText style={{fontSize: 14, fontWeight: 'bold', color: Colors.text, paddingRight: 5}} text={'名称：' + title}/>
                <XText style={styles.itemDesc} numberOfLines={4} text={synopsis}/>
                <XText style={{fontSize: 12, color: Colors.text}} text={'评分：' + score + '    参与人数：' + members}/>
            </XView>
        </XView>;
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
