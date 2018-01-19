// https://developer.amazon.com/docs/alexa-voice-service/speechsynthesizer.html#speechstarted
declare namespace AVS {
    namespace SpeechSynthesizer {
        interface SpeechStartedEvent extends AVS.EventMetadata {
            payload: {
                token: string;
            };
        }
    }
}
