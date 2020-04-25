import {observable} from 'mobx';
import {RFHttp} from 'react-native-fast-app';
import {Api} from "../Home/http/Api";
import {showToast} from "../Common/widgets/Loading";
import {netWorkException} from "../Common/utils/Utils";

const StoreRefresh = observable({
    dataList: undefined,
});

StoreRefresh.queryDataList = (isPullDown, refreshList) => {
    this.pageIndex = isPullDown ? 1 : this.pageIndex + 1;
    refreshList && refreshList.refreshPreLoad(isPullDown);
    let params = {page: isPullDown ? 1 : this.pageIndex};
    RFHttp().url(Api.queryAnimations).param(params).get((success, {results, last_page}, msg, code) => {
        refreshList && refreshList.refreshLoaded(success, isPullDown, params.page >= last_page, netWorkException(code));
        if (success) {
            StoreRefresh.dataList = isPullDown ? results : [...StoreRefresh.dataList, ...results];
        } else {
            showToast(msg);
        }
    });
};


export default StoreRefresh;
