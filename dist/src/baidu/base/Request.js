"use strict";
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
var axios_1 = require("axios");
var qs = require("qs");
var Request = /** @class */ (function () {
    function Request(api, timeout) {
        this.timeout = 2000;
        this.queries = new Map();
        this.headers = new Map();
        this.parameters = new Map();
        this.api = api;
        this.timeout = timeout;
    }
    Request.prototype.addHeader = function (key, value) {
        this.headers.set(key, value);
    };
    Request.prototype.setHeaders = function (headers) {
        this.headers = headers;
    };
    Request.prototype.clearHeader = function (key) {
        if (!this.headers.has(key)) {
            return;
        }
        this.headers.delete(key);
    };
    Request.prototype.clearHeaders = function () {
        this.headers.clear();
    };
    Request.prototype.addQuery = function (key, value) {
        this.queries.set(key, value);
    };
    Request.prototype.setQueries = function (queries) {
        this.queries = queries;
    };
    Request.prototype.clearQuery = function (name) {
        if (!this.queries.has(name)) {
            return;
        }
        this.queries.delete(name);
    };
    Request.prototype.clearQueries = function () {
        this.queries.clear();
    };
    Request.prototype.addParameter = function (key, value) {
        this.parameters[key] = value;
    };
    Request.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };
    Request.prototype.clearParameter = function (key) {
        if (!this.parameters.has(key)) {
            return;
        }
        this.parameters.delete(key);
    };
    Request.prototype.clearParameters = function () {
        this.parameters.clear();
    };
    Request.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get(this.buildApi(), this.buildConfig())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Request.prototype.post = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (body) {
                            this.setParameters(body);
                        }
                        return [4 /*yield*/, axios_1.default.post(this.buildApi(), this.buildConfig())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Request.prototype.postJson = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (body) {
                            this.setParameters(body);
                        }
                        return [4 /*yield*/, axios_1.default.post(this.buildApi(), this.buildConfig())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Request.prototype.postFormData = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        if (body) {
                            this.clearParameters();
                            body.forEach(function (value, key) {
                                if (value instanceof Blob) {
                                    formData.set(key, value);
                                }
                                else {
                                    formData.set(key, value.toString());
                                }
                            });
                        }
                        else {
                            this.parameters.forEach(function (value, key) {
                                if (value instanceof Blob) {
                                    formData.set(key, value);
                                }
                                else {
                                    formData.set(key, value.toString());
                                }
                            });
                        }
                        config = this.buildConfig();
                        config.data = formData;
                        return [4 /*yield*/, axios_1.default.post(this.buildApi(), config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Request.prototype.buildApi = function () {
        var queries = "";
        for (var name_1 in this.queries) {
            queries += "&" + name_1 + "=" + encodeURIComponent(this.queries[name_1]);
        }
        console.log(queries);
        if (queries !== "") {
            return this.api + "?" + queries.substr(1);
        }
        return this.api;
    };
    Request.prototype.buildConfig = function () {
        var config = {};
        if (this.headers.size > 0) {
            config['headers'] = this.headers;
        }
        if (this.queries.size > 0) {
            var queries = this.convertMapToObject(this.queries);
            config['params'] = queries;
            config['paramsSerializer'] = function (params) {
                var q = qs.stringify(params, { arrayFromat: 'brackets' });
                console.log("q=", q, ', params=', params);
                return q;
            };
        }
        if (this.parameters.size > 0) {
            var parameters = this.convertMapToObject(this.parameters);
            config['data'] = parameters;
        }
        return config;
    };
    Request.prototype.convertMapToObject = function (map) {
        var p = Object.create(null);
        map.forEach(function (v, k) {
            p[k] = v;
        });
        return p;
    };
    return Request;
}());
exports.default = Request;
