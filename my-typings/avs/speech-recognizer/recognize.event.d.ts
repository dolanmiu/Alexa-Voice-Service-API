declare namespace AVS {
    namespace SpeechRecognizer {
        interface RecognizeEvent extends AVS.EventMetadata {
            payload: {
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
            };
        }
    }
}
