// https://developer.amazon.com/docs/alexa-voice-service/system.html
import * as http2 from "http2";

import {API_VERSION, HTTP2_BOUNDARY} from "./constants/general";
import Http2Utility from "./http2-utility";

export default class System {
    private readonly http2Utility: Http2Utility;

    constructor(private readonly client: http2.ClientHttp2Session) {
        this.http2Utility = new Http2Utility();
    }

    public synchronizeState(accessToken: string, context: AVS.Context): void {
        const req = this.client.request({
            ":method": "POST",
            ":path": `/${API_VERSION}/events`,
            authorization: `Bearer ${accessToken}`,
            "content-type": `multipart/form-data; boundary=${HTTP2_BOUNDARY}`,
        });

        console.log("okie");

        // req.on("response", (headers, flags) => {
        //     for (const name in headers) {
        //         console.log(`${name}: ${headers[name]}`);
        //     }
        // });

        const f = this.http2Utility.createMetadata({
            context: context,
            event: {
                header: {
                    namespace: "System",
                    name: "SynchronizeState",
                    messageId: "test",
                },
                payload: {},
            },
        });

        req.write(f);

        req.setEncoding("utf8");
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            console.log(`\n${data}`);
            // client.close();
        });
        req.end();
    }
}
