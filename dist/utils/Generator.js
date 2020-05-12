var Generator = /** @class */ (function () {
    function Generator(json, dest) {
        this.json = json;
        this.dest = dest;
        this.jsonObject = JSON.parse(json);
    }
    Generator.prototype.generate = function () {
        var accumulation = { "keyframes": {} };
        this.recusive("root", this.jsonObject, accumulation);
        console.log(accumulation);
        var collection = {};
        this.convert("root", accumulation, collection);
        console.log(collection);
        this.write(accumulation, collection);
    };
    Generator.prototype.write = function (accumulation, collection) {
        var sb = "const {\n";
        for (var k in collection.root) {
            sb += "\t" + k + " = '',\n";
        }
        ;
        sb += "} = source;\n";
        delete collection.root;
        var objects = new Set();
        var arrays = new Set();
        for (var k in accumulation.keyframes) {
            var v = accumulation.keyframes[k];
            if (v.type === 'object') {
                objects.add(k);
            }
            else {
                arrays.add(k);
            }
        }
        var sbObject = "";
        objects.forEach(function (v, k) {
            sbObject += "const {\n";
            var keys = accumulation[v];
            for (var k_1 in keys) {
                var v_1 = keys[k_1];
                if (accumulation.keyframes.hasOwnProperty(k_1) && accumulation.keyframes[k_1].type === 'array') {
                    sbObject += "\t" + v_1.name + " = [],\n";
                }
                else {
                    sbObject += "\t" + v_1.name + " = '',\n";
                }
            }
            var name = accumulation.keyframes[v].name;
            sbObject += "} = source.hasOwnProperty('" + name + "') ? source." + name + " : {};\n";
        });
        var sbArray = "";
        arrays.forEach(function (v, k) {
        });
        console.log(sb + sbObject);
    };
    Generator.prototype.convert = function (key, collection, accumulation) {
        if (!accumulation.hasOwnProperty(key)) {
            accumulation[key] = {};
        }
        for (var k in collection[key]) {
            var item = collection[key][k];
            if (item.type === 'object') {
                this.convert(k, collection, accumulation);
            }
            else if (item.type === 'array') {
                accumulation[key][item.name] = "[]";
                this.convert(k, collection, accumulation);
            }
            else {
                accumulation[key][item.name] = "";
            }
        }
    };
    /**
     * parent-key/ child{id: key}
     * root, child{xxx1: {name: a, type: string}, xxx2: {name: b, type: number}, xxx3: {name: c, type: object}, xxx4: {name: f, type: array}}
     * xxx3, child{xxx5: {name: d, type: string>}, xxx6: {name: e, type: string}}
     * xxx4, child{xxx7: {name: g, type: string}, xxx8: {name: h, type: boolean}, xxx9: {name: i, type: object}}
     * xxx9: child{xx10: {name: j, type: string}, xx11: {name: k, type: number}, xx12: {name: l, type: array}}
     * xx12: child{xx13: {name: m, type: string}, xx14: {name: n, type: boolean}}
     * @param level
     * @param topKey
     * @param value
     * @param accumulation
     */
    Generator.prototype.uniqid = function () {
        var x = Math.random();
        return x.toString();
    };
    Generator.prototype.recusive = function (topKey, value, accumulation) {
        if (!accumulation.hasOwnProperty(topKey)) {
            accumulation[topKey] = {};
        }
        for (var key in value) {
            var uniqid = this.uniqid();
            console.log("uniqid=", uniqid);
            var item = value[key];
            var type = typeof item;
            if (type === 'string' || type === 'number' || type === 'boolean' || type === null) {
                accumulation[topKey][uniqid] = { name: key, type: type };
            }
            else if (Array.isArray(item) && item.length > 0) {
                accumulation[topKey][uniqid] = { name: key, type: 'array' };
                accumulation.keyframes[uniqid] = { name: key, type: 'array' };
                this.recusive(uniqid, item[0], accumulation);
            }
            else {
                accumulation[topKey][uniqid] = { name: key, type: 'object' };
                accumulation.keyframes[uniqid] = { name: key, type: 'object' };
                this.recusive(uniqid, item, accumulation);
            }
        }
    };
    return Generator;
}());
var json2 = "\n" +
    "{\n" +
    "    \"code\": \"\"," +
    "    \"msg\":\"\"," +
    "    \"result\": {\n" +
    "        \"applyList\": [\n" +
    "            {\n" +
    "                \"applyId\": 0," +
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
var generator = new Generator(json2, "");
generator.generate();
