import {action, observable} from "mobx";

export default class StoreWebView {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable title = '';

    @observable loading = true;

    @observable canGoBack = false;

    @observable url = 'https://www.baidu.com';

    @action.bound
    reloadPage(data) {
        this.url = data.url
    }

    @action.bound
    refreshData(data) {
        const {title, loading, canGoBack, url} = data;
        this.loading = loading;
        this.canGoBack = canGoBack;
        this.title = title;
    }
}
