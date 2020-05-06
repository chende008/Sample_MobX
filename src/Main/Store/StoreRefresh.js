import {action, observable} from 'mobx';
import {RFHttp} from 'react-native-fast-app';
import {Api} from "../Home/http/Api";
import {showToast} from "../Common/widgets/Loading";
import {netWorkException} from "../Common/utils/Utils";

export default class StoreRefresh {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable dataList = [];

    @action.bound
    queryDataList(isPullDown, refreshList) {
        this.pageIndex = isPullDown ? 1 : this.pageIndex + 1;
        refreshList && refreshList.refreshPreLoad(isPullDown);
        let params = {page: isPullDown ? 1 : this.pageIndex};
        RFHttp().url(Api.queryAnimations).param(params).get((success, {results, last_page}, msg, code) => {
            refreshList && refreshList.refreshLoaded(success, isPullDown, params.page >= last_page, netWorkException(code));
            if (success) {
                this.dataList = isPullDown ? results : [...this.dataList, ...results];
            } else {
                showToast(msg);
            }
        });
    }
}
