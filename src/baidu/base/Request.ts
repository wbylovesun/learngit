import axios, { AxiosRequestConfig } from "axios";
import * as qs from 'qs';

export default class Request {
    private readonly api: string;
    private timeout: number = 2000;
    private queries: Map<string, string | number | boolean> = new Map<string, string | number | boolean>();
    private headers: Map<string, string> = new Map<string, string>();
    private parameters: Map<string, string | number | boolean | Blob> = new Map<string, string | number | boolean | Blob>();

    constructor(api: string, timeout: number) {
        this.api = api;
        this.timeout = timeout;
    }

    addHeader(key: string, value: string): void {
        this.headers.set(key, value);
    }

    setHeaders(headers: Map<string, string>): void {
        this.headers = headers;
    }

    clearHeader(key: string): void {
        if (!this.headers.has(key)) {
            return;
        }
        this.headers.delete(key);
    }

    clearHeaders(): void {
        this.headers.clear();
    }

    addQuery(key: string, value: string | number | boolean): void {
        this.queries.set(key, value);
    }

    setQueries(queries: Map<string, string | number | boolean>): void {
        this.queries = queries;
    }

    clearQuery(name: string): void {
        if (!this.queries.has(name)) {
            return;
        }
        this.queries.delete(name);
    }

    clearQueries(): void {
        this.queries.clear();
    }

    addParameter(key: string, value: string | number | boolean | Blob): void {
        this.parameters[key] = value;
    }

    setParameters(parameters: Map<string, string | number | boolean | Blob>): void {
        this.parameters = parameters;
    }

    clearParameter(key: string): void {
        if (!this.parameters.has(key)) {
            return;
        }
        this.parameters.delete(key);
    }

    public clearParameters(): void {
        this.parameters.clear();
    }

    public async get() {
        return await axios.get(this.buildApi(), this.buildConfig());
    }

    public async post(body?: Map<string, string | number | boolean>) {
        if (body) {
            this.setParameters(body);
        }
        return await axios.post(this.buildApi(), this.buildConfig());
    }

    public async postJson(body?: Map<string, string | number | boolean>) {
        if (body) {
            this.setParameters(body);
        }
        this.addHeader("Content-Type", "application/json");
        return await axios.post(this.buildApi(), this.buildConfig())
    }

    public async postFormData(body?: Map<string, string | number | boolean | Blob>) {
        let formData = new FormData();
        if (body) {
            this.clearParameters();
            body.forEach((value, key) => {
                if (value instanceof Blob) {
                    formData.set(key, value);
                } else {
                    formData.set(key, value.toString());
                }
            })
        } else {
            this.parameters.forEach((value, key) => {
                if (value instanceof Blob) {
                    formData.set(key, value);
                } else {
                    formData.set(key, value.toString());
                }
            })
        }
        this.addHeader("Content-Type", "multipart/form-data");
        const config: AxiosRequestConfig = this.buildConfig();
        config.data = formData;
        return await axios.post(this.buildApi(), config);
    }

    private buildApi(): string {
        if (this.queries.size > 0) {
            const queries = this.convertMapToObject(this.queries);
            return this.api + "?" + qs.stringify(queries);
        }
        return this.api;
    }

    private buildConfig(): AxiosRequestConfig {
        const config = {};
        if (this.headers.size > 0) {
            config['headers'] = this.headers;
        }
        if (this.queries.size > 0) {
            config['params'] = this.convertMapToObject(this.queries);
            config['paramsSerializer'] = (params: any) => {
                return qs.stringify(params, {arrayFromat: 'brackets'});
            }
        }
        if (this.parameters.size > 0) {
            config['data'] = this.convertMapToObject(this.parameters);
        }
        return config;
    }

    private convertMapToObject(map: Map<string, any>): Object {
        const p = Object.create(null);
        map.forEach((v, k) => {
            p[k] = v;
        })
        return p;
    }
}
