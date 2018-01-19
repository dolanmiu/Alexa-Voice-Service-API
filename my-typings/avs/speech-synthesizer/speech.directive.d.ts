// https://developer.amazon.com/docs/alexa-voice-service/speechsynthesizer.html#speak
declare namespace AVS {
    namespace SpeechSynthesizer {
        interface SpeechDirective extends AVS.DirectiveMetadata {
            payload: {
                url: string;
                format: string;
                token: string;
            };
        }
    }
}
