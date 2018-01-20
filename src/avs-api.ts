import {ReadStream, WriteStream} from "fs";
import * as http2 from "http2";

import Connection from "./connection";
import {BASE_URLS} from "./constants/base-urls";
import {API_VERSION} from "./constants/general";
import SpeechRecognizer from "./speech-recognizer";
import System from "./system";

export class AVSApi {
    constructor(private readonly readStream: ReadStream, private readonly writeStream: WriteStream) {}

    public start(): void {
        const client = http2.connect(`${BASE_URLS.europe}`);
        client.on("error", (err) => console.error(err));
        client.on("socketError", (err) => console.error(err));

        const context: AVS.Context = [];

        const speechRecognizer = new SpeechRecognizer(client);
        const connection = new Connection(client);
        const system = new System(client);

        const accessToken =
            "Atza|IwEBIFymtJ3Bb2MIW4SvBaYj7Gb9jSdrMoo1iFvfun3Ttp-oXxDXFy815mm1b2lksZZU1b3b2RWVUBslKbs9ef6R0UoEF21RcK3I0uMcmQ8yXEuXuy_wR_Z6wyHvAqcxFxPxdVzmqw145-eHPNu2gbk4nQ731JXrPYwdHs38IsLgnaeHCUHTj-DDF6Tq1AnTW7aoyNUfg0hwNIbtDKV--xQ0M5LYgMAe4cfdIz43n5dMbp1hMhe4ZPrwFeCttnkfheW04-sNmhAGjA5dgT11XSW8kAfsZ7RvMLt28DRJKcVAYxhvjjzT3h9yW-g2MOhXBrYyxezKHH1FpPmHQIBBTG_iCrPSwmOUEWfFrz7iEfjWH6rcdBVBpEyXghTaZkMI2d3ZdugQJ48-ES9QNk30QUn41q3IqOimCN5sKJ83KsRSY4aGaSqn8csuVXeZHROqvYNavHjA4vbjmtSbydrTYMarNHmBznULzb-CQGsSWIL4RYxA3mCRvDQjoQzGigAnS5rzHg0";

        connection.connect(accessToken);
        system.synchronizeState(accessToken, context);
        speechRecognizer.recognize(accessToken, context, this.readStream);
    }
}
