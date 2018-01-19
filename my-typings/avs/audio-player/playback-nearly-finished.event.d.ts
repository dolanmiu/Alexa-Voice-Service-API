// https://developer.amazon.com/docs/alexa-voice-service/audioplayer.html#playbacknearlyfinished
declare namespace AVS {
    namespace AudioPlayer {
        interface PlaybackNearlyFinishedEvent extends AVS.EventMetadata {
            payload: {
                token: string;
                offsetInMilliseconds: number;
            };
        }
    }
}
