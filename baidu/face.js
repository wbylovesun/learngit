import CONSTANTS from './constants';

const sessionCode = () => {
    const api = getApiUrl(CONSTANTS.BCE_HOST, CONSTANTS.BCE_APIS.FACE.LIVENESS.SESSION_CODE)
    let minCodeLength = CONSTANTS.DEFAULTS.SESSION_CODE.MIN_CODE_LENGTH
    let maxCodeLength = CONSTANTS.DEFAULTS.SESSION_CODE.MAX_CODE_LENGTH
    if (arguments.length > 0) {
        if (arguments.length == 2) {
            minCodeLength = Number(arguments[0])
            maxCodeLength = Number(arguments[1])
        } else if (arguments.length == 1) {
            minCodeLength = maxCodeLength = Number(arguments[0])
        }
    }
    const parameters = {
        min_code_length: minCodeLength,
        max_code_length: maxCodeLength
    }

}

const getApiUrl = (host, apiPath) => {
    return host + apiPath;
}
