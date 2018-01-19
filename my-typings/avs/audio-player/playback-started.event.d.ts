// https://developer.amazon.com/docs/alexa-voice-service/audioplayer.html#playbackstarted
declare namespace AVS {
    namespace AudioPlayer {
        interface PlaybackStartedEvent {
            token: string;
            offsetInMilliseconds: number;
        }
    }
}
