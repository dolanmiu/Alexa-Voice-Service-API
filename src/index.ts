import * as https from "https";
import * as spdy from "spdy";
import SpeechRecognizer from "./speech-recognizer";

const agent = spdy.createAgent({
    host: "www.google.com",
    port: 443,

    // Optional SPDY options
    spdy: {
        plain: false,
        ssl: true,
        // **optional** send X_FORWARDED_FOR
        "x-forwarded-for": "127.0.0.1",
    },
});

const s = new SpeechRecognizer(agent);
