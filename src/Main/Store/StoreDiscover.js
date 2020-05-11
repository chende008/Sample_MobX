import {action, observable} from 'mobx';
import {XHttp} from 'react-native-easy-app';
import {Api} from "../Home/http/Api";
import {showToast} from "../Common/widgets/Loading";
import {netWorkException} from "../Common/utils/Utils";

export default class StoreDiscover {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable dataList = [];

    @action.bound
    queryDataList(isPullDown, refreshList) {
        this.pageIndex = isPullDown ? 1 : this.pageIndex + 1;
        refreshList && refreshList.refreshPreLoad(isPullDown);
        let params = {page: isPullDown ? 1 : this.pageIndex};
        XHttp().url(Api.queryAnimations).param(params).get((success, {results, last_page}, msg, code) => {
            refreshList && refreshList.refreshLoaded(success, isPullDown, params.page >= last_page, netWorkException(code));
            if (success) {
                this.dataList = isPullDown ? results : [...this.dataList, ...results];
            } else {
                showToast(msg);
            }
        });
    }
}
