import React from 'react';
import {XHttpConfig} from 'react-native-easy-app';
import {DebugManager} from "react-native-debug-tool";
import {Notify} from "../../Common/events/Notify";

/**
 * RN Http请求 库设置类
 */
export default class HttpConfig {

    static init() {
        XHttpConfig().initHttpLogOn(true)
            .initParseDataFunc((result, request, callback) => {
                let {success, json, message, status, response} = result;
                DebugManager.appendHttpLogs(request.params, response);
                if (status === 503) {// token 过期
                    Notify.TOKEN_EXPIRED.sendEvent({message})
                } else {
                    callback(success, json, message, status, response)
                }
            });
    }

}
