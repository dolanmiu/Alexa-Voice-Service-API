import * as http2 from "http2";

import Connection from "./connection";
import {BASE_URLS} from "./constants/base-urls";
import {API_VERSION} from "./constants/general";
import SpeechRecognizer from "./speech-recognizer";
import System from "./system";

const client = http2.connect(`${BASE_URLS.europe}`);
client.on("error", (err) => console.error(err));
client.on("socketError", (err) => console.error(err));

const context: AVS.Context = [];

const speechSynthesizer = new SpeechRecognizer(client);
const connection = new Connection(client);
const system = new System(client);

const accessToken = "";

connection.connect(accessToken);
system.synchronizeState(accessToken, context);
