import { AxiosResponse } from "axios";
import CONSTANTS from "../base/Constants";
import AbstractRequest from "../base/AbstractRequest";
import {ResponseInterface} from "../base/BceInterface";
import {AbstractResponse} from "../base/AbstractResponse";

export class SessionCodeRequest extends AbstractRequest {
    private minCodeLength: number = CONSTANTS.DEFAULTS.SESSION_CODE.MIN_CODE_LENGTH;
    private maxCodeLength: number = CONSTANTS.DEFAULTS.SESSION_CODE.MAX_CODE_LENGTH;

    constructor() {
        super(CONSTANTS.BCE_APIS.FACE.LIVENESS.SESSION_CODE);
    }

    getMinCodeLength(): number {
        return this.minCodeLength;
    }

    setMinCodeLength(minCodeLength: number): void {
        this.minCodeLength = minCodeLength;
    }

    getMaxCodeLength(): number {
        return this.maxCodeLength;
    }

    setMaxCodeLength(maxCodeLength: number): void {
        this.maxCodeLength = maxCodeLength;
    }

    async request(): Promise<ResponseInterface> {
        if (this.getAccessToken() === "") {
            throw new Error("Access token must not be blank");
        }
        const request = this.createRequest();
        request.addQuery("access_token", this.getAccessToken());
        request.addParameter("min_code_length", this.getMinCodeLength());
        request.addParameter("max_code_length", this.getMaxCodeLength());
        return await request.get().then(response => new SessionCodeResponse(response));
    }
}

/**
 * SessionCodeResponse的自有数据结构
 */
interface SessionCodeInterface {
    sessionId?: string;
    code?: string;
}

export class SessionCodeResponse extends AbstractResponse {
    private response: SessionCodeInterface = {};

    public getSessionId() {
        return this.response.sessionId;
    }

    public getCode() {
        return this.response.code;
    }

    protected parse(): void {
        const {
            result: {
                session_id: sessionId = "",
                code = ""
            } = {}
        } = this.origData.hasOwnProperty("result") ? this.origData["result"] : {};
        this.response = {
            sessionId,
            code,
        }
    }
}
