import {action, observable, computed} from 'mobx';

export default class StoreHome {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable dataList = [];

    @computed get tips() {
        return '条目数量：' + this.dataList.length
    }

    @action.bound
    addRandom() {
        this.dataList.push(Math.round(Math.random() * 1000000))
    }

    @action.bound
    delRandom(index) {
        this.dataList.splice(index, 1);
    }
}
