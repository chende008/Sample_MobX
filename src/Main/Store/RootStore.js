import StoreData from "./StoreData";
import StoreHttp from "./StoreHttp";
import StoreRefresh from "./StoreRefresh";
import StoreWebView from "./StoreWebView";

export default class RootStore {

    constructor() {
        this.initStore()
    }

    initStore() {
        this.storeData = new StoreData(this);
        this.storeHttp = new StoreHttp(this);
        this.storeRefresh = new StoreRefresh(this);
        this.storeWebView = new StoreWebView(this);
    }

}
