import StoreData from "./StoreData";
import StoreMine from "./StoreMine";
import StoreDiscover from "./StoreDiscover";
import StoreWebView from "./StoreWebView";
import StoreHome from "./StoreHome";

export default class RootStore {

    constructor() {
        this.initStore()
    }

    initStore() {
        this.storeHome = new StoreHome(this);
        this.storeDiscover = new StoreDiscover(this);
        this.storeMine = new StoreMine(this);
        this.storeData = new StoreData(this);
        this.storeWebView = new StoreWebView(this);
    }

}
