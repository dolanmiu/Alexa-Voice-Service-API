// https://developer.amazon.com/docs/alexa-voice-service/speechsynthesizer.html#speechfinished
declare namespace AVS {
    namespace SpeechSynthesizer {
        interface SpeechFinishedEvent extends AVS.EventMetadata {
            payload: {
                token: string;
            };
        }
    }
}
