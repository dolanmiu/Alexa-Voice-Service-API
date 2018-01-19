declare namespace AVS {
    namespace SpeechRecognizer {
        interface RecognizeEvent {
            profile: string;
            format: string;
            initiator: {
                type: string;
                payload?: {
                    wakeWordIndices: {
                        startIndexInSamples: number;
                        endIndexInSamples: number;
                    };
                };
            };
        }

        type SpeechRecognizerMetadata = AVS.EventMetadata<RecognizeEvent>;
    }
}
