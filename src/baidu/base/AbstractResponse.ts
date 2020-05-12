import {AxiosResponse} from "axios";

export abstract class AbstractResponse {
    protected abstract parse();

    private origResponse: AxiosResponse;
    private statusCode: number;
    private errorCode: number = 9999;
    protected origData: object = {};

    constructor(response: AxiosResponse) {
        this.origResponse = response;
        this.statusCode = this.origResponse.status;
        this.origData = this.origResponse.data;
        if (this.origData.hasOwnProperty("error_code")) {
            this.errorCode = this.origData["error_code"];
        }
        this.parse();
    }

    isSuccess(): boolean {
        return this.statusCode === 200 && this.errorCode === 0;
    }
}