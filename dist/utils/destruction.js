var destruct = function (source) {
    var _a = source.code, code = _a === void 0 ? "9999" : _a, _b = source.msg, msg = _b === void 0 ? "" : _b;
    var _c = source.hasOwnProperty("result") ? source.result : {}, _d = _c.applyList, applyList = _d === void 0 ? [] : _d, _e = _c.currPageNo, currPageNo = _e === void 0 ? 0 : _e, _f = _c.pageSize, pageSize = _f === void 0 ? 0 : _f, _g = _c.totalElement, totalElement = _g === void 0 ? 0 : _g, _h = _c.totalPageNo, totalPageNo = _h === void 0 ? 0 : _h;
    applyList.forEach(function (v, k) {
        var _a = v.applyId, applyId = _a === void 0 ? "" : _a, _b = v.name, name = _b === void 0 ? "" : _b, _c = v.idNo, idNo = _c === void 0 ? "" : _c, _d = v.mobileNo, mobileNo = _d === void 0 ? "" : _d, _e = v.openAccStatus, openAccStatus = _e === void 0 ? undefined : _e, _f = v.openAccName, openAccName = _f === void 0 ? "" : _f, _g = v.accountArea, accountArea = _g === void 0 ? "" : _g, _h = v.accountAreaName, accountAreaName = _h === void 0 ? "" : _h, _j = v.authenticationMethod, authenticationMethod = _j === void 0 ? "" : _j, _k = v.authenticationName, authenticationName = _k === void 0 ? "" : _k, _l = v.submitTime, submitTime = _l === void 0 ? "" : _l, _m = v.openingTime, openingTime = _m === void 0 ? "" : _m;
        applyList[k] = {
            applyId: applyId,
            name: name,
            idNo: idNo,
            mobileNo: mobileNo,
            openAccStatus: openAccStatus,
            openAccName: openAccName,
            accountArea: accountArea,
            accountAreaName: accountAreaName,
            authenticationMethod: authenticationMethod,
            authenticationName: authenticationName,
            submitTime: submitTime,
            openingTime: openingTime,
        };
    });
    return {
        code: code,
        msg: msg,
        result: {
            applyList: applyList,
            currPageNo: currPageNo,
            pageSize: pageSize,
            totalElement: totalElement,
            totalPageNo: totalPageNo
        },
    };
};
var json = "\n" +
    "{\n" +
    "    \"code\": \"0\"," +
    "    \"msg\":\"success\"," +
    "    \"result\": {\n" +
    "        \"applyList\": [\n" +
    "            {\n" +
    "                \"applyId\": 13145," +
    "                \"name\": \"张三\"," +
    "                \"idNo\": \"141109199901011111\"," +
    "                \"mobileNo\": \"13888888888\"," +
    "                \"openAccStatus\": 20," +
    "                \"openAccName\": \"已开户\"," +
    "                \"accountArea\": 20," +
    "                \"accountAreaName\": \"大陆\"," +
    "                \"authenticationMethod\": 20," +
    "                \"authenticationName\":\"CA认证\"," +
    "                \"submitTime\" : \"2020-04-01 12:12:12\"," +
    "                \"openingTime\" : \"2020-04-01 12:12:12\"" +
    "            }\n" +
    "        ],\n" +
    "        \"currPageNo\": 1," +
    "        \"pageSize\": 10," +
    "        \"totalElement\": 555," +
    "        \"totalPageNo\": 56" +
    "    }\n" +
    "}";
var jsonObject = JSON.parse(json);
var dest = destruct(jsonObject);
console.log(dest);
json = "\n" +
    "{\n" +
    "    \"code\": \"0\"," +
    "    \"msg\":\"success\"," +
    "    \"result\": {\n" +
    "        \"currPageNo\": 1," +
    "        \"pageSize\": 10," +
    "        \"totalElement\": 555," +
    "        \"totalPageNo\": 56" +
    "    }\n" +
    "}";
jsonObject = JSON.parse(json);
dest = destruct(jsonObject);
console.log(dest);
