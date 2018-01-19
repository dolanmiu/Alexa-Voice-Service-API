// https://developer.amazon.com/docs/alexa-voice-service/audioplayer.html#play
declare namespace AVS {
    namespace AudioPlayer {
        interface PlayDirective extends AVS.DirectiveMetadata {
            payload: {
                playBehavior: string;
                audioItem: {
                    audioItemId: string;
                    stream: {
                        url: string;
                        streamFormat: "AUDIO_MPEG";
                        offsetInMilliseconds: number;
                        expiryTime: string;
                        progressReport: {
                            progressReportDelayInMilliseconds: number;
                            progressReportIntervalInMilliseconds: number;
                        };
                        token: string;
                        expectedPreviousToken: string;
                    };
                };
            };
        }
    }
}
