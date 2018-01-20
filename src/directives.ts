// https://developer.amazon.com/docs/alexa-voice-service/manage-http2-connection.html
import * as http2 from "http2";

import {API_VERSION} from "./constants/general";

export default class Directives {
    constructor(private readonly client: http2.ClientHttp2Session) {}

    public connect(accessToken: string): void {
        const req = this.client.request({
            ":path": `/${API_VERSION}/directives`,
            authorization: `Bearer ${accessToken}`,
        });

        req.on("response", (headers, flags) => {
            // tslint:disable-next-line:forin
            for (const name in headers) {
                console.log(`${name}: ${headers[name]}`);
            }
        });

        req.setEncoding("utf8");
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            console.log(`\n${data}`);
        });

        req.end();
    }
}
