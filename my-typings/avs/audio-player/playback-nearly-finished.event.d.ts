// https://developer.amazon.com/docs/alexa-voice-service/audioplayer.html#playbacknearlyfinished
declare namespace AVS {
    namespace AudioPlayer {
        interface PlaybackNearlyFinishedEvent {
            token: string;
            offsetInMilliseconds: number;
        }
    }
}
