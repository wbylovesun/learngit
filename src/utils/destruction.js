var mainStructure = function (source) {
    var _a = source.code, code = _a === void 0 ? "9999" : _a, _b = source.msg, msg = _b === void 0 ? "" : _b;
    var _c = source.hasOwnProperty("result") ? source.result : {}, _d = _c.applyList, applyList = _d === void 0 ? [] : _d, _e = _c.currPageNo, currPageNo = _e === void 0 ? 0 : _e, _f = _c.pageSize, pageSize = _f === void 0 ? 0 : _f, _g = _c.totalElement, totalElement = _g === void 0 ? 0 : _g, _h = _c.totalPageNo, totalPageNo = _h === void 0 ? 0 : _h;
    return {
        code: code,
        msg: msg,
        result: {
            applyList: applyList,
            currPageNo: currPageNo,
            pageSize: pageSize,
            totalElement: totalElement,
            totalPageNo: totalPageNo
        }
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
    "                \"openingTime\" : \"2020-04-01 12:12:12\"," +
    "            }\n" +
    "        ],\n" +
    "        \"currPageNo\": 1," +
    "        \"pageSize\": 10," +
    "        \"totalElement\": 555," +
    "        \"totalPageNo\": 56" +
    "    }\n" +
    "}";
var jsonObject = JSON.parse(json);
var dest = mainStructure({ a: 1, b: 2, d: { x: "Thanks!" } });
console.log(dest);
