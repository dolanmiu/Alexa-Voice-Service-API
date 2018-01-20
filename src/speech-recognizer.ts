// https://developer.amazon.com/docs/alexa-voice-service/speechrecognizer.html
import {ReadStream} from "fs";
import * as http2 from "http2";
import {v4 as uuid} from "uuid";

import {API_VERSION, HTTP2_BOUNDARY} from "./constants/general";
import Http2Utility from "./http2-utility";

export default class SpeechRecognizer {
    private readonly http2Utility: Http2Utility;
    constructor(private readonly client: http2.ClientHttp2Session) {
        this.http2Utility = new Http2Utility();
    }

    public recognize(accessToken: string, context: AVS.Context, readStream: ReadStream): Promise<void> {
        const req = this.client.request({
            ":method": "POST",
            ":path": `/${API_VERSION}/events`,
            authorization: `Bearer ${accessToken}`,
            "content-type": `multipart/form-data; boundary=${HTTP2_BOUNDARY}`,
        });

        const metadata = this.http2Utility.createMultipartMetadata<AVS.SpeechRecognizer.SpeechRecognizerMetadata>({
            context: context,
            event: {
                header: {
                    namespace: "SpeechRecognizer",
                    name: "Recognize",
                    messageId: uuid(),
                },
                payload: {
                    profile: "NEAR_FIELD",
                    format: "AUDIO_L16_RATE_16000_CHANNELS_1",
                    initiator: {
                        type: "TAP",
                    },
                },
            },
        });

        return new Promise<void>((resolve) => {
            req.on("response", (headers, flags) => {
                console.log("response from speech");

                // tslint:disable-next-line:forin
                for (const name in headers) {
                    console.log(`${name}: ${headers[name]}`);
                }
            });

            req.write(metadata);
            console.log("speech recognizer");

            readStream.on("data", (chunk: Buffer) => {
                console.log("data in");
                console.log(chunk.length);

                const audio = this.http2Utility.createBinaryAudioAttachment(chunk);
                req.write(audio);
            });

            req.setEncoding("utf8");
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });
            req.on("end", () => {
                console.log(`\n${data}`);
            });

            setTimeout(() => {
                console.log("ending speech");
                readStream.removeListener("data", () => {
                    // TODO
                });
                console.log("ENDING");
                req.write(this.http2Utility.createEnding());
                req.end();
                resolve();
            }, 3000);
        });
    }
}
