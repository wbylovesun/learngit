export interface ResponseInterface {
    isSuccess(): boolean;
}

export interface BceInterface {
    request(): Promise<ResponseInterface>
}

