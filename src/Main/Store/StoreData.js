import {observable, set} from 'mobx';
import {dateFormat} from "../Common/utils/DateUtils";

const StoreData = observable({
    text: '',
    json: {
        age: 25,
        name: 'Tom',
        gender: 'male',
        time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm'),
    },
    dataChangedCount: 0,//数据变更统计
});

export default StoreData;
