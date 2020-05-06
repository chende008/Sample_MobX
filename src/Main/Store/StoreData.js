import {action, observable} from 'mobx';

export default class StoreData {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable text = '';
    @observable dataChangedCount = 0;

    @action.bound
    refreshText(text) {
        this.text = text
    }

    @action.bound
    refreshDataCount(count) {
        this.dataChangedCount = count;
    }
}
