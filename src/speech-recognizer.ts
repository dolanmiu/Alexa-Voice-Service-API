// https://developer.amazon.com/docs/alexa-voice-service/speechrecognizer.html
import * as http2 from "http2";

export default class SpeechRecognizer {
    constructor(private readonly client: http2.ClientHttp2Session) {}

    public fire(): void {
        // Todo
    }
}
