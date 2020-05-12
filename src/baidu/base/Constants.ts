const BCE_HOST = "https://aip.baidubce.com"

const BCE_APIS = {
    OAUTH: "/oauth/2.0/token",
    FACE: {
        LIVENESS: {
            SESSION_CODE: "/rest/2.0/face/v1/faceliveness/sessioncode",
            VERIFY: "/reset/2.0/face/v1/faceliveness/verify"
        },
        PERSON: {
            VERIFY: "/rest/2.0/face/v3/person/verify"
        }
    }
}

const DEFAULTS = {
    REQUEST_TIMEOUT: 10000,
    SESSION_CODE: {
        MIN_CODE_LENGTH: 3,
        MAX_CODE_LENGTH: 6
    }
}

export default {
    BCE_HOST,
    BCE_APIS,
    DEFAULTS,
}
