// https://developer.amazon.com/docs/alexa-voice-service/manage-http2-connection.html
import * as http2 from "http2";
import {API_VERSION} from "./constants/general";

export default class Connection {
    constructor(private readonly client: http2.ClientHttp2Session) {}

    public connect(accessToken: string): void {
        const req = this.client.request({
            ":path": `/${API_VERSION}/directives`,
            authorization: `Bearer ${accessToken}`,
        });

        req.end();
    }
}
