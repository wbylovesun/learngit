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
var AbstractRequest_1 = require("../base/AbstractRequest");
var Constants_1 = require("../base/Constants");
var AbstractResponse_1 = require("../base/AbstractResponse");
var VideoBioassayRequest = /** @class */ (function (_super) {
    __extends(VideoBioassayRequest, _super);
    function VideoBioassayRequest() {
        var _this = _super.call(this, Constants_1.default.BCE_APIS.FACE.LIVENESS.VERIFY) || this;
        _this.lipIdentity = 'OFF';
        _this.threshold = 0.68;
        return _this;
    }
    VideoBioassayRequest.prototype.setVideo = function (video, isBase64) {
        if (isBase64 === void 0) { isBase64 = false; }
        if (!isBase64) {
            this.videoBase64 = btoa(video);
        }
        else {
            this.videoBase64 = video;
        }
    };
    VideoBioassayRequest.prototype.getVideo = function (base64) {
        if (base64 === void 0) { base64 = true; }
        if (base64) {
            return this.videoBase64;
        }
        return atob(this.videoBase64);
    };
    VideoBioassayRequest.prototype.setSessionId = function (sessionId) {
        this.sessionId = sessionId;
    };
    VideoBioassayRequest.prototype.getSessionId = function () {
        return this.sessionId;
    };
    VideoBioassayRequest.prototype.setLipIdentify = function (lipIdentify) {
        this.lipIdentity = lipIdentify;
    };
    VideoBioassayRequest.prototype.getLipIdentify = function () {
        return this.lipIdentity;
    };
    VideoBioassayRequest.prototype.enableFaceField = function () {
        this.faceField = 'spoofing';
    };
    VideoBioassayRequest.prototype.setThreshold = function (threshold) {
        if (threshold < 0 || threshold >= 1) {
            throw new Error("Threshold must be a value between 0 and 1 (not included).");
        }
        this.threshold = threshold;
    };
    VideoBioassayRequest.prototype.getThreshold = function () {
        return this.threshold;
    };
    VideoBioassayRequest.prototype.request = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.createRequest();
                        request.addQuery("access_token", this.getAccessToken());
                        request.addParameter("video_base64", this.getVideo());
                        if (this.getSessionId() != '') {
                            request.addParameter("session_id", this.getSessionId());
                        }
                        if (this.getLipIdentify()) {
                            request.addParameter("lip_identify", this.getLipIdentify().toString());
                        }
                        return [4 /*yield*/, request.post().then(function (response) { return new VideoBioassayResponse(response, _this.getThreshold()); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return VideoBioassayRequest;
}(AbstractRequest_1.default));
exports.VideoBioassayRequest = VideoBioassayRequest;
var VideoBioassayResponse = /** @class */ (function (_super) {
    __extends(VideoBioassayResponse, _super);
    function VideoBioassayResponse(response, threshold) {
        var _this = _super.call(this, response) || this;
        _this.response = {};
        _this.threshold = 0.68;
        if (threshold > 0 && threshold < 1) {
            _this.setThreshold(threshold);
        }
        return _this;
    }
    VideoBioassayResponse.prototype.setThreshold = function (threshold) {
        this.threshold = threshold;
    };
    VideoBioassayResponse.prototype.getScore = function () {
        return this.response.score;
    };
    VideoBioassayResponse.prototype.getCodeSimiliarity = function () {
        return this.response.codeSimiliarity;
    };
    VideoBioassayResponse.prototype.getPicList = function () {
        return this.response.picList;
    };
    VideoBioassayResponse.prototype.parse = function () {
        var _this = this;
        var _a = this.origData.hasOwnProperty('result') ? this.origData['result'] : {}, _b = _a.score, score = _b === void 0 ? 0 : _b, _c = _a.code, _d = (_c === void 0 ? {} : _c).similiarity, similiarity = _d === void 0 ? 0 : _d, _e = _a.pic_list, picList = _e === void 0 ? [] : _e;
        // 过滤图片列表，需要在阈值以上的数据才有效
        var arrPics = new Array();
        picList.filter(function (pic) { return pic['liveness_score'] > _this.threshold; })
            .forEach(function (pic) { return arrPics.push(pic['pic']); });
        //
        this.response = {
            score: score,
            codeSimiliarity: similiarity,
            picList: arrPics
        };
    };
    return VideoBioassayResponse;
}(AbstractResponse_1.AbstractResponse));
exports.VideoBioassayResponse = VideoBioassayResponse;
