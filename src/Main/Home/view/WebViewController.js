import React, {PureComponent} from 'react';

import {StyleSheet, SafeAreaView, View} from 'react-native';
import WebUtils from "../../Common/utils/WebUtils";
import {Notify} from "../../Common/events/Notify";
import {NavigationBar} from "../../Common/widgets/WidgetNavigation";
import ProgressBar from "../../Common/widgets/ProgressBar";
import WebView from "react-native-webview";
import {CommonStyles} from "../../Common/storage/Const";
import {DebugManager} from "react-native-debug-tool";
import StoreWebView from "../../Store/StoreWebView";
import {observer} from "mobx-react";

@observer
export default class WebViewController extends PureComponent {

    render() {
        let {title, loading, url, canGoBack} = StoreWebView;
        return <SafeAreaView style={CommonStyles.container}>
            <NavigationBar title={title} onBack={() => canGoBack ? this.webView.goBack() : this.props.navigation.goBack()}/>
            <View style={{flex: 1}}>
                <WebView source={{uri: url}}
                         domStorageEnabled={true}
                         javaScriptEnabled={true}
                         injectedJavaScript={WebUtils.initInjectJs()}
                         ref={webView => (this.webView = webView)}
                         onMessage={({nativeEvent}) => {
                             let postMsgData = JSON.parse(nativeEvent.data);
                             if (postMsgData.hasOwnProperty('TitleEvent')) {
                                 StoreWebView.refreshData({...nativeEvent, ...postMsgData});
                             } else {
                                 WebUtils.msgFromH5(postMsgData, this.webView)
                             }
                         }}
                         onNavigationStateChange={params => {
                             let {url, ...other} = params;
                             StoreWebView.refreshData({...other});
                             DebugManager.appendWebViewLogs(url);
                         }}
                         onLoadProgress={({nativeEvent}) => {
                             if (nativeEvent.progress < 1) {
                                 this.progressBar && this.progressBar.showAnimal()
                             } else {
                                 this.progressBar && this.progressBar.markToFinished()
                             }
                         }}
                />
                <ProgressBar loading={loading} style={{position: 'absolute', top: 0}} ref={progressBar => (this.progressBar = progressBar)}/>
            </View>
        </SafeAreaView>
    }

    componentDidMount() {
        this.progressBar && this.progressBar.showAnimal();
        Notify.H5_RELOAD_URL.register(StoreWebView.reloadPage)
    }

    componentWillUnmount() {
        Notify.H5_RELOAD_URL.unRegister(StoreWebView.reloadPage)
    }
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
