// https://developer.amazon.com/docs/alexa-voice-service/audioplayer.html
enum AudioPlayerState {
    IDLE,
    PLAYING,
    STOPPED,
    PAUSED,
    BUFFER_UNDERRUN,
    FINISHED,
}

export default class AudioPlayer {
    private state: AudioPlayerState;
}
