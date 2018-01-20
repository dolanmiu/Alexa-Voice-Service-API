import {ReadStream, WriteStream} from "fs";
import * as http2 from "http2";

import {IAVSOptions, TokenService} from "./auth/token-service";
import {BASE_URLS} from "./constants/base-urls";
import {API_VERSION} from "./constants/general";
import Directives from "./directives";
import SpeechRecognizer from "./speech-recognizer";
import System from "./system";

export class AVSApi {
    private accessToken: string;
    private readonly speechRecognizer: SpeechRecognizer;
    private readonly directives: Directives;
    private readonly system: System;
    private readonly context: AVS.Context;

    constructor(private readonly readStream: ReadStream, private readonly writeStream: WriteStream, options: IAVSOptions) {
        const client = http2
            .connect(`${BASE_URLS.europe}`)
            .on("error", (err) => console.error(err))
            .on("socketError", (err) => console.error(err));

        this.context = [];
        this.speechRecognizer = new SpeechRecognizer(client);
        this.directives = new Directives(client);
        this.system = new System(client);

        const tokenService = new TokenService(options);
        tokenService.Token$.subscribe((res) => (this.accessToken = res.access_token));
    }

    public start(): void {
        if (!this.accessToken) {
            setTimeout(() => {
                console.log("Access token not present. Re-trying in 1000");
                this.start();
            }, 1000);
            return;
        }

        console.log(`Access token found`);

        this.init();
    }

    private async init(): Promise<void> {
        await this.directives.connect(this.accessToken);
        await this.system.synchronizeState(this.accessToken, this.context);
        await this.speechRecognizer.recognize(this.accessToken, this.context, this.readStream);
    }
}
