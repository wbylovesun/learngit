import AbstractRequest from "../base/AbstractRequest";
import CONSTANTS from "../base/Constants";
import {ResponseInterface} from "../base/BceInterface";
import Request from "../base/Request";
import {AxiosResponse} from "axios";
import {AbstractResponse} from "../base/AbstractResponse";

export type LipIdentify = 'COMMON' | 'STRICT' | 'OFF';

export class VideoBioassayRequest extends AbstractRequest {
    private videoBase64: string;
    private sessionId: string;
    private lipIdentity: LipIdentify = 'OFF';
    private faceField: string;
    private threshold: number =  0.68;

    constructor() {
        super(CONSTANTS.BCE_APIS.FACE.LIVENESS.VERIFY);
    }

    setVideo(video: string, isBase64: boolean = false) {
        if (!isBase64) {
            this.videoBase64 = btoa(video);
        } else {
            this.videoBase64 = video;
        }
    }

    getVideo(base64: boolean = true) {
        if (base64) {
            return this.videoBase64;
        }
        return atob(this.videoBase64);
    }

    setSessionId(sessionId: string) {
        this.sessionId = sessionId;
    }

    getSessionId(): string {
        return this.sessionId;
    }

    setLipIdentify(lipIdentify: LipIdentify) {
        this.lipIdentity = lipIdentify;
    }

    getLipIdentify(): LipIdentify {
        return this.lipIdentity;
    }

    enableFaceField() {
        this.faceField = 'spoofing';
    }

    setThreshold(threshold: number) {
        if (threshold < 0 || threshold >= 1) {
            throw new Error("Threshold must be a value between 0 and 1 (not included).");
        }
        this.threshold = threshold;
    }

    getThreshold(): number {
        return this.threshold;
    }

    async request(): Promise<ResponseInterface> {
        const request: Request = this.createRequest();
        request.addQuery("access_token", this.getAccessToken());
        request.addParameter("video_base64", this.getVideo());
        if (this.getSessionId() != '') {
            request.addParameter("session_id", this.getSessionId());
        }
        if (this.getLipIdentify()) {
            request.addParameter("lip_identify", this.getLipIdentify().toString());
        }
        return await request.post().then(response => new VideoBioassayResponse(response, this.getThreshold()));
    }
}

/**
 * VideoBioassayResponse的自有数据结构
 */
interface VideoBioassayInterface {
    score?: number;
    codeSimiliarity?: number;
    picList?: Array<string>;
    spoofing?: number;
}

export class VideoBioassayResponse extends AbstractResponse implements ResponseInterface {
    private response: VideoBioassayInterface = {};
    private threshold: number = 0.68;

    constructor(response: AxiosResponse, threshold?: number) {
        super(response);
        if (threshold > 0 && threshold < 1) {
            this.setThreshold(threshold);
        }
    }

    private setThreshold(threshold: number) {
        this.threshold = threshold;
    }

    getScore(): number {
        return this.response.score;
    }

    getCodeSimiliarity(): number {
        return this.response.codeSimiliarity;
    }

    getPicList(): Array<string> {
        return this.response.picList;
    }

    protected parse(): void {
        const {
            score = 0,
            code: {
                similiarity = 0
            } = {},
            pic_list: picList = []
        } = this.origData.hasOwnProperty('result') ? this.origData['result'] : {};
        // 过滤图片列表，需要在阈值以上的数据才有效
        const arrPics: Array<string> = new Array<string>();
        picList.filter(pic => pic['liveness_score'] > this.threshold)
            .forEach(pic => arrPics.push(pic['pic']));
        //
        this.response = {
            score,
            codeSimiliarity: similiarity,
            picList: arrPics
        };
    }
}