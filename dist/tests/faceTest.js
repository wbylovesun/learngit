"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionCode_1 = require("../src/baidu/face/SessionCode");
var VideoBioassay_1 = require("../src/baidu/face/VideoBioassay");
var request = new SessionCode_1.SessionCodeRequest();
request.setAccessToken("24.ff25defab9eff9c6da365339eab064a0.2592000.1591422489.282335-19661882");
request.setMinCodeLength(3);
request.setMaxCodeLength(5);
var response = request.request();
response.then(function (response) {
    console.log(response.isSuccess());
    console.log(response.getSessionId());
    console.log(response.getCode());
}).catch(function (e) { return console.log(e); });
var videoBioassayRequest = new VideoBioassay_1.VideoBioassayRequest();
videoBioassayRequest.setAccessToken("24.ff25defab9eff9c6da365339eab064a0.2592000.1591422489.282335-19661882");
videoBioassayRequest.setVideo('aaaa');
videoBioassayRequest.setThreshold(0.6);
videoBioassayRequest.setLipIdentify('OFF');
videoBioassayRequest.request().then(function (response) {
    console.log(response.isSuccess());
    response.getPicList().forEach(function (v) {
        console.log(v);
    });
});
