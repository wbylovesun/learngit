"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../base/Constants");
var AbstractRequest_1 = require("../base/AbstractRequest");
var AbstractResponse_1 = require("../base/AbstractResponse");
var SessionCodeRequest = /** @class */ (function (_super) {
    __extends(SessionCodeRequest, _super);
    function SessionCodeRequest() {
        var _this = _super.call(this, Constants_1.default.BCE_APIS.FACE.LIVENESS.SESSION_CODE) || this;
        _this.minCodeLength = Constants_1.default.DEFAULTS.SESSION_CODE.MIN_CODE_LENGTH;
        _this.maxCodeLength = Constants_1.default.DEFAULTS.SESSION_CODE.MAX_CODE_LENGTH;
        return _this;
    }
    SessionCodeRequest.prototype.getMinCodeLength = function () {
        return this.minCodeLength;
    };
    SessionCodeRequest.prototype.setMinCodeLength = function (minCodeLength) {
        this.minCodeLength = minCodeLength;
    };
    SessionCodeRequest.prototype.getMaxCodeLength = function () {
        return this.maxCodeLength;
    };
    SessionCodeRequest.prototype.setMaxCodeLength = function (maxCodeLength) {
        this.maxCodeLength = maxCodeLength;
    };
    SessionCodeRequest.prototype.request = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.getAccessToken() === "") {
                            throw new Error("Access token must not be blank");
                        }
                        request = this.createRequest();
                        request.addQuery("access_token", this.getAccessToken());
                        request.addParameter("min_code_length", this.getMinCodeLength());
                        request.addParameter("max_code_length", this.getMaxCodeLength());
                        return [4 /*yield*/, request.get().then(function (response) { return new SessionCodeResponse(response); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return SessionCodeRequest;
}(AbstractRequest_1.default));
exports.SessionCodeRequest = SessionCodeRequest;
var SessionCodeResponse = /** @class */ (function (_super) {
    __extends(SessionCodeResponse, _super);
    function SessionCodeResponse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.response = {};
        return _this;
    }
    SessionCodeResponse.prototype.getSessionId = function () {
        return this.response.sessionId;
    };
    SessionCodeResponse.prototype.getCode = function () {
        return this.response.code;
    };
    SessionCodeResponse.prototype.parse = function () {
        var _a = (this.origData.hasOwnProperty("result") ? this.origData["result"] : {}).result, _b = _a === void 0 ? {} : _a, _c = _b.session_id, sessionId = _c === void 0 ? "" : _c, _d = _b.code, code = _d === void 0 ? "" : _d;
        this.response = {
            sessionId: sessionId,
            code: code,
        };
    };
    return SessionCodeResponse;
}(AbstractResponse_1.AbstractResponse));
exports.SessionCodeResponse = SessionCodeResponse;
