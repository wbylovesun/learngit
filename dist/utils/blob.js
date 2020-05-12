var blob = /** @class */ (function () {
    function blob() {
    }
    blob.toBlob = function (dataURI) {
        var regExp = /^data:((?:image|video)\/(?:[^;]*));base64,([\w_\/+=]*)/g;
        var array = regExp.exec(dataURI);
        var mime = array[0];
        var stream = atob(array[1]);
        var n = stream.length;
        var arrayBuffer = new ArrayBuffer[n];
        while (n--) {
            arrayBuffer[n] = stream.charCodeAt(n);
        }
        var x = n / 1024 / 1024 / 1024 / 2;
        var buffer = new ArrayBuffer[x]();
        for (var i = 0; i < x; i++) {
            buffer[i] = arrayBuffer.slice(i * 1024 * 1024 * 1024 * 2, (i + i) * 1024 * 1024 * 1024 * 2);
        }
        return new Blob(buffer, { type: mime });
    };
    blob.toBase64 = function (blob) {
        return null;
    };
    return blob;
}());
