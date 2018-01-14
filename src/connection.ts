// https://developer.amazon.com/docs/alexa-voice-service/manage-http2-connection.html
import * as https from "https";
import * as spdy from "spdy";

export default class Connection {
    constructor(private readonly agent: spdy.Agent, private readonly endpoint: string) {}

    public connect(accessToken: string): void {
        const req = https.get(
            {
                host: `${this.endpoint}/directives`,
                agent: this.agent,
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            },
            (response) => {
                // TODO
            },
        );

        req.on("push", (stream) => {
            stream.on("error", (err) => {
                // Handle error
            });
            // Read data from stream
        });
    }
}
