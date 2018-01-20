// https://developer.amazon.com/docs/alexa-voice-service/manage-http2-connection.html
import * as http2 from "http2";

import {API_VERSION} from "./constants/general";

export default class Directives {
    constructor(private readonly client: http2.ClientHttp2Session) {}

    public connect(accessToken: string): Promise<void> {
        const req = this.client.request({
            ":path": `/${API_VERSION}/directives`,
            authorization: `Bearer ${accessToken}`,
        });

        return new Promise<void>((resolve) => {
            req.on("response", (headers, flags) => {
                console.log("response from directives");

                // tslint:disable-next-line:forin
                for (const name in headers) {
                    console.log(`${name}: ${headers[name]}`);
                }

                resolve();
            });

            req.setEncoding("utf8");
            let data = "";
            req.on("data", (chunk) => {
                console.log("directive data");
                console.log(data);
                data += chunk;
            });
            req.on("end", () => {
                console.log("directive end");
                console.log(`\n${data}`);
            });

            req.end();
        });
    }
}
