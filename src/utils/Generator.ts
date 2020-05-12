class Generator {
    private readonly json: string;
    private readonly dest: string;
    private readonly jsonObject: object;

    constructor(json: string, dest: string) {
        this.json = json;
        this.dest = dest;
        this.jsonObject = JSON.parse(json);
    }

    public generate(): void {
        const accumulation = {"keyframes": {}};
        this.recusive("root", this.jsonObject, accumulation)
        console.log(accumulation);
        const collection = {};
        this.convert("root", accumulation, collection);
        console.log(collection);
        this.write(accumulation, collection);
    }

    private write(accumulation, collection) {
        let sb: string = "const {\n";
        for (let k in collection.root) {
            sb += `\t${k} = '',\n`;
        };
        sb += "} = source;\n";
        delete collection.root;
        const objects = new Set<string>();
        const arrays = new Set<string>();
        for (let k in accumulation.keyframes) {
            const v = accumulation.keyframes[k];
            if (v.type === 'object') {
                objects.add(k);
            } else {
                arrays.add(k);
            }
        }

        let sbObject: string = "";
        objects.forEach((v, k) => {
            sbObject += "const {\n";
            const keys = accumulation[v];
            for (let k in keys) {
                const v = keys[k];
                if (accumulation.keyframes.hasOwnProperty(k) && accumulation.keyframes[k].type === 'array') {
                    sbObject += `\t${v.name} = [],\n`;
                } else {
                    sbObject += `\t${v.name} = '',\n`;
                }
            }
            const name = accumulation.keyframes[v].name;
            sbObject += `} = source.hasOwnProperty('${name}') ? source.${name} : {};\n`;
        });
        let sbArray: string = "";
        arrays.forEach((v, k) => {
        });

        console.log(sb + sbObject);
    }

    private convert(key, collection, accumulation) {
        if (!accumulation.hasOwnProperty(key)) {
            accumulation[key] = {}
        }
        for (let k in collection[key]) {
            const item = collection[key][k];
            if (item.type === 'object') {
                this.convert(k, collection, accumulation);
            } else if (item.type === 'array') {
                accumulation[key][item.name] = "[]";
                this.convert(k, collection, accumulation);
            } else {
                accumulation[key][item.name] = "";
            }
        }
    }

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
    private uniqid(): string {
        const x: number = Math.random();
        return x.toString();
    }

    private recusive(topKey, value, accumulation) {
        if (!accumulation.hasOwnProperty(topKey)) {
            accumulation[topKey] = {};
        }
        for (let key in value) {
            const uniqid = this.uniqid();
            console.log("uniqid=", uniqid);
            const item = value[key];
            const type = typeof item;
            if (type === 'string' || type === 'number' || type === 'boolean' || type === null) {
                accumulation[topKey][uniqid] = {name: key, type};
            } else if (Array.isArray(item) && item.length > 0) {
                accumulation[topKey][uniqid] = {name: key, type: 'array'};
                accumulation.keyframes[uniqid] = {name: key, type: 'array'};
                this.recusive(uniqid, item[0], accumulation);
            } else {
                accumulation[topKey][uniqid] = {name: key, type: 'object'};
                accumulation.keyframes[uniqid] = {name: key, type: 'object'};
                this.recusive(uniqid, item, accumulation);
            }
        }
    }
}

const json2: string = "\n" +
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

const generator = new Generator(json2, "");
generator.generate();