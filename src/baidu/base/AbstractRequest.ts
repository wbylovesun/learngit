import CONSTANTS from "./Constants";
import Request from "./Request";

export default abstract class AbstractRequest {
    private readonly apiPath: string;
    private accessToken: string = "";

    protected constructor(apiPath: string) {
        this.apiPath = apiPath;
    }

    setAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
    }

    getAccessToken(): string {
        return this.accessToken;
    }

    protected buildApi(): string {
        return CONSTANTS.BCE_HOST + (this.apiPath.startsWith("/") ? this.apiPath : "/" + this.apiPath);
    }

    protected createRequest(timeout?: number): Request {
        if (timeout === undefined) {
            timeout = CONSTANTS.DEFAULTS.REQUEST_TIMEOUT;
        }
        return new Request(this.buildApi(), timeout);
    }
}
