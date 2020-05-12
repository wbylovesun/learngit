const destruct = (source: any) => {
    const {
        code = "9999",
        msg = "",
    } = source;
    const {
        applyList = [],
        currPageNo = 0,
        pageSize = 0,
        totalElement = 0,
        totalPageNo = 0
    } = source.hasOwnProperty("result") ? source.result : {};
    applyList.forEach((v, k) => {
        let {
            applyId = "",
            name = "",
            idNo = "",
            mobileNo = "",
            openAccStatus = undefined,
            openAccName = "",
            accountArea = "",
            accountAreaName = "",
            authenticationMethod = "",
            authenticationName = "",
            submitTime = "",
            openingTime = ""
        } = v;
        applyList[k] = {
            applyId,
            name,
            idNo,
            mobileNo,
            openAccStatus,
            openAccName,
            accountArea,
            accountAreaName,
            authenticationMethod,
            authenticationName,
            submitTime,
            openingTime,
        }
    })
    return {
        code,
        msg,
        result : {
            applyList,
            currPageNo,
            pageSize,
            totalElement,
            totalPageNo
        },
    };
}

let json: string = "\n" +
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

let jsonObject = JSON.parse(json);
let dest = destruct(jsonObject);
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
