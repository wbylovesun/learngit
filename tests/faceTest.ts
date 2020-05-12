import { ResponseInterface } from "../src/baidu/base/BceInterface";
import {SessionCodeRequest, SessionCodeResponse} from "../src/baidu/face/SessionCode";
import {VideoBioassayRequest, VideoBioassayResponse} from "../src/baidu/face/VideoBioassay";

const request = new SessionCodeRequest();
request.setAccessToken("24.ff25defab9eff9c6da365339eab064a0.2592000.1591422489.282335-19661882");
request.setMinCodeLength(3);
request.setMaxCodeLength(5);
const response: Promise<ResponseInterface> = request.request();
response.then(
    (response: SessionCodeResponse) => {
        console.log(response.isSuccess());
        console.log(response.getSessionId());
        console.log(response.getCode());
    }
).catch(e => console.log(e));

const videoBioassayRequest = new VideoBioassayRequest();
videoBioassayRequest.setAccessToken("24.ff25defab9eff9c6da365339eab064a0.2592000.1591422489.282335-19661882");
videoBioassayRequest.setVideo('aaaa');
videoBioassayRequest.setThreshold(0.6);
videoBioassayRequest.setLipIdentify('OFF');
videoBioassayRequest.request().then(
    (response: VideoBioassayResponse) => {
        console.log(response.isSuccess())
        response.getPicList().forEach(v => {
            console.log(v);
        })
}
)
