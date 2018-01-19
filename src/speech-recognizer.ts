// https://developer.amazon.com/docs/alexa-voice-service/speechrecognizer.html
import * as http2 from "http2";
import {v4 as uuid} from "uuid";

import {API_VERSION, HTTP2_BOUNDARY} from "./constants/general";
import Http2Utility from "./http2-utility";

export default class SpeechRecognizer {
    private readonly http2Utility: Http2Utility;
    constructor(private readonly client: http2.ClientHttp2Session) {
        this.http2Utility = new Http2Utility();
    }

    public recognize(accessToken: string, context: AVS.Context): void {
        const req = this.client.request({
            ":method": "POST",
            ":path": `/${API_VERSION}/events`,
            authorization: `Bearer ${accessToken}`,
            "content-type": `multipart/form-data; boundary=${HTTP2_BOUNDARY}`,
        });

        const metadata = this.http2Utility.createMetadata<AVS.SpeechRecognizer.SpeechRecognizerMetadata>({
            context: context,
            event: {
                header: {
                    namespace: "SpeechRecognizer",
                    name: "Recognize",
                    messageId: uuid(),
                },
                payload: {
                    profile: "{{STRING}}",
                    format: "{{STRING}}",
                    initiator: {
                        type: "{{STRING}}",
                    },
                },
            },
        });

        req.write(metadata);
    }
}
