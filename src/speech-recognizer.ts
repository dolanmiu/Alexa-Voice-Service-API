// https://developer.amazon.com/docs/alexa-voice-service/speechrecognizer.html
import * as https from "https";
import * as spdy from "spdy";

export default class SpeechRecognizer {
    constructor(private agent: spdy.Agent) {}

    public fire(): void {
        const req = https.get(
            {
                host: "https://avs-alexa-eu.amazon.com",
                agent: this.agent,
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
