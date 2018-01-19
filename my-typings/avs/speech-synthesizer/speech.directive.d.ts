// https://developer.amazon.com/docs/alexa-voice-service/speechsynthesizer.html#speak
declare namespace AVS {
    namespace SpeechSynthesizer {
        interface SpeechDirective {
            url: string;
            format: string;
            token: string;
        }
    }
}
