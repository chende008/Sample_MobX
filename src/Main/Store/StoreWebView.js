import {observable, set} from 'mobx';

const StoreWebView = observable({
    title: '',
    loading: true,
    canGoBack: false,
    url: 'https://www.baidu.com'
});

StoreWebView.reloadPage = ({pageName, url}) => {
    if ('WebViewController'.equals(pageName) && url) {
        StoreWebView.url = url
    }
};

StoreWebView.refreshData = (data) => {
    set(StoreWebView, data);
};


export default StoreWebView;
