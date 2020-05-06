import React, {PureComponent} from 'react';

import {StyleSheet, View} from 'react-native';
import WebUtils from "../../Common/utils/WebUtils";
import {NavigationBar, ParentView} from "../../Common/widgets/WidgetNavigation";
import ProgressBar from "../../Common/widgets/ProgressBar";
import WebView from "react-native-webview";
import {DebugManager} from "react-native-debug-tool";
import {observer} from "mobx-react";
import {Actions} from 'react-native-router-flux'

@observer
export default class WebViewController extends PureComponent {

    render() {
        let {title, loading, url, canGoBack, refreshData} = this.props.storeWebView;
        return <ParentView>
            <NavigationBar title={title} onBack={canGoBack ? this.webView.goBack : Actions.pop}/>
            <View style={{flex: 1}}>
                <WebView source={{uri: url}}
                         domStorageEnabled={true}
                         javaScriptEnabled={true}
                         injectedJavaScript={WebUtils.initInjectJs()}
                         ref={webView => (this.webView = webView)}
                         onMessage={({nativeEvent}) => {
                             let postMsgData = JSON.parse(nativeEvent.data);
                             if (postMsgData.hasOwnProperty('TitleEvent')) {
                                 refreshData({...nativeEvent, ...postMsgData});
                             } else {
                                 WebUtils.msgFromH5(postMsgData, this.webView)
                             }
                         }}
                         onNavigationStateChange={params => {
                             let {url, ...other} = params;
                             refreshData({...other});
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
        </ParentView>
    }

    // componentDidMount() {
    //     this.progressBar && this.progressBar.showAnimal();
    //     Notify.H5_RELOAD_URL.register(this.props.storeWebView.reloadPage)
    // }
    //
    // componentWillUnmount() {
    //     Notify.H5_RELOAD_URL.unRegister(this.props.storeWebView.reloadPage)
    // }
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
