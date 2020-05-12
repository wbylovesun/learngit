"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("./Constants");
var Request_1 = require("./Request");
var AbstractRequest = /** @class */ (function () {
    function AbstractRequest(apiPath) {
        this.accessToken = "";
        this.apiPath = apiPath;
    }
    AbstractRequest.prototype.setAccessToken = function (accessToken) {
        this.accessToken = accessToken;
    };
    AbstractRequest.prototype.getAccessToken = function () {
        return this.accessToken;
    };
    AbstractRequest.prototype.buildApi = function () {
        return Constants_1.default.BCE_HOST + (this.apiPath.startsWith("/") ? this.apiPath : "/" + this.apiPath);
    };
    AbstractRequest.prototype.createRequest = function (timeout) {
        if (timeout === undefined) {
            timeout = Constants_1.default.DEFAULTS.REQUEST_TIMEOUT;
        }
        return new Request_1.default(this.buildApi(), timeout);
    };
    return AbstractRequest;
}());
exports.default = AbstractRequest;
