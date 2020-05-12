"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractResponse = /** @class */ (function () {
    function AbstractResponse(response) {
        this.errorCode = 9999;
        this.origData = {};
        this.origResponse = response;
        this.statusCode = this.origResponse.status;
        this.origData = this.origResponse.data;
        if (this.origData.hasOwnProperty("error_code")) {
            this.errorCode = this.origData["error_code"];
        }
        this.parse();
    }
    AbstractResponse.prototype.isSuccess = function () {
        return this.statusCode === 200 && this.errorCode === 0;
    };
    return AbstractResponse;
}());
exports.AbstractResponse = AbstractResponse;
