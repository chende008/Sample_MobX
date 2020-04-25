import React, {PureComponent} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {NavigationBar} from '../../Common/widgets/WidgetNavigation';
import {RFText} from 'react-native-fast-app';
import {RNItem} from '../../Common/widgets/WidgetDefault';
import {Colors, CommonStyles} from '../../Common/storage/Const';
import StoreHttp from "../../Store/StoreHttp";
import {observer} from 'mobx-react';

/**
 * 其它接口请求，接口返回的非json数据结构（纯文本&XML数据）
 */

@observer
export default class HttpController extends PureComponent {

    render() {
        const {moviesList, animalImageList, queryMemberList, getCityAmount, content} = StoreHttp;
        return <SafeAreaView style={CommonStyles.container}>
            <NavigationBar title='请求示例'/>
            <RNItem text='简单数据：标准的json' onPress={moviesList}/>
            <RNItem text='获取图片列表：标准的json' onPress={animalImageList}/>
            <RNItem text='同步请求成员列表：标准的json' onPress={queryMemberList}/>
            <RNItem text='省份、城市记录数量：返回 XML' onPress={getCityAmount}/>
            <ScrollView>
                <RFText style={{fontSize: 12, color: Colors.text_lighter, padding: 10}} text={content}/>
            </ScrollView>
        </SafeAreaView>;
    }
}

