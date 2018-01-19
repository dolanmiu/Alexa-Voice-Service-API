declare namespace AVS {
    namespace SpeechRecognizer {
        interface ExpectSpeechDirective extends AVS.DirectiveMetadata {
            payload: {
                timeoutInMilliseconds: number;
                initiator: string;
            };
        }
    }
}
