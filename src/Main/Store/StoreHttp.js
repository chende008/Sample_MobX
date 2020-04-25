import {observable} from 'mobx';
import {RFHttp} from 'react-native-fast-app';
import {Api} from "../Home/http/Api";
import {showLoading, showToast} from "../Common/widgets/Loading";

const StoreHttp = observable({
    content: undefined,
});

StoreHttp.moviesList = () => {//返回标准的json的http请求
    RFHttp().url(Api.moviesList).formJson().get((success, json, msg, code) => {
        if (success) {
            showToast('请求成功');
            StoreHttp.content = JSON.stringify(json)
        } else {
            showToast(msg);
        }
    });
};

StoreHttp.animalImageList = () => {//返回标准的json的http请求
    RFHttp().url(Api.animalImageList).get((success, json, msg, code) => {
        if (success) {
            showToast('请求成功');
            StoreHttp.content = JSON.stringify(json)
        } else {
            showToast(msg);
        }
    });
};

StoreHttp.queryMemberList = async () => {//同步请求数据
    let {success, json, message, status} = await RFHttp().url(Api.queryMembers).execute('GET');

    success ? StoreHttp.content = JSON.stringify(json) : showToast(message);

    /***
     * 或者得使用标准的promise方式解析数据（异步promise）
     *
     * RFHttp().url(Api.queryMembers).execute('GET').then(({success, json, message, status}) => {
            if (success) {
                showToast('请求成功');
                StoreHttp.content = JSON.stringify(json)
            } else {
                showToast(message);
            }
        }).catch(({message}) => {
            showToast(message);
        })
     */

};

StoreHttp.getCityAmount = () => {//查询各城市Mobile服务数量
    RFHttp().url(Api.queryCitiesAmount)
        .contentType('text/xml; charset=utf-8')
        .loadingFunc((loading) => showLoading('请求中，请稍候...', loading))
        .pureText().get((success, data, msg, code) => {
        if (success) {
            showToast('请求成功');
            StoreHttp.content = data;
        } else {
            showToast(msg);
        }
    });
};


export default StoreHttp;
