class blob {
    static toBlob(dataURI: string): Blob {
        const regExp = /^data:((?:image|video)\/(?:[^;]*));base64,([\w_\/+=]*)/g;
        const array = regExp.exec(dataURI);
        const mime = array[0];
        const stream = atob(array[1]);
        let n: number = stream.length;
        const arrayBuffer: ArrayBuffer = new ArrayBuffer[n];
        while (n--) {
            arrayBuffer[n] = stream.charCodeAt(n);
        }

        const x: number = n / 1024 / 1024 / 1024 / 2;
        const buffer: ArrayBuffer[] = new ArrayBuffer[x]();
        for (let i: number = 0; i < x; i++) {
            buffer[i] = arrayBuffer.slice(i * 1024 * 1024 * 1024 * 2, (i + i) * 1024 * 1024 * 1024 * 2);
        }
        return new Blob(buffer, {type: mime});
    }

    static toBase64(blob: Blob): string {
        return null;
    }

}