import {action, observable} from 'mobx';
import {XHttp} from 'react-native-easy-app';
import {Api} from "../Home/http/Api";
import {showLoading, showToast} from "../Common/widgets/Loading";

export default class StoreMine {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable content;

    @action.bound
    moviesList() {// 返回标准的json的http请求
        XHttp().url(Api.btcPrice).loadingFunc((loading) => showLoading('请求中，请稍候...', loading)).get((success, json, msg, code) => {
            if (success) {
                showToast('请求成功');
                this.content = JSON.stringify(json)
            } else {
                showToast(msg);
            }
        });
    }

    @action.bound
    animalImageList() { // 返回标准的json的http请求
        XHttp().url(Api.animalImageList).loadingFunc((loading) => showLoading('请求中，请稍候...', loading)).get((success, json, msg, code) => {
            if (success) {
                showToast('请求成功');
                this.content = JSON.stringify(json)
            } else {
                showToast(msg);
            }
        });
    }

    @action.bound
    async queryMemberList() {// 同步请求数据
        let {success, json, message, status} = await XHttp().url(Api.queryMembers).execute('GET');

        success ? this.content = JSON.stringify(json) : showToast(message);

        /* 或者得使用标准的promise方式解析数据（异步promise）
        RFHttp().url(Api.queryMembers).execute('GET').then(({success, json, message, status}) => {
            if (success) {
                showToast('请求成功');
                this.content = JSON.stringify(json)
            } else {
                showToast(message);
            }
        }).catch(({message}) => {
            showToast(message);
        })
        */
    }

    @action.bound
    getCityList() { //查询各城市Mobile服务数量
        XHttp().url(Api.queryCitiesAmount)
            .contentType('text/xml; charset=utf-8')
            .loadingFunc((loading) => showLoading('请求中，请稍候...', loading))
            .pureText().get((success, data, msg, code) => {
            if (success) {
                showToast('请求成功');
                this.content = data;
            } else {
                showToast(msg);
            }
        });
    }
}

