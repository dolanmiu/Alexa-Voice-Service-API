declare namespace AVS {
    interface Header {
        namespace: string;
        name: string;
    }

    interface State {
        header: Header;
    }

    interface PlaybackState extends State {
        payload: {
            token: string;
            offsetInMilliseconds: number;
            playerActivity: string;
        };
    }

    interface AlertsState extends State {
        payload: {
            allAlerts: [
                {
                    token: string;
                    type: string;
                    scheduledTime: string;
                }
            ];
            activeAlerts: [
                {
                    token: string;
                    type: string;
                    scheduledTime: string;
                }
            ];
        };
    }

    interface VolumeState extends State {
        payload: {
            volume: number;
            muted: boolean;
        };
    }

    interface SpeechState extends State {
        payload: {
            token: string;
            offsetInMilliseconds: number;
            playerActivity: string;
        };
    }

    interface IndicatorState extends State {
        payload: {
            isEnabled: boolean;
            isVisualIndicatorPersisted: boolean;
        };
    }

    type AVSContextItem = PlaybackState | AlertsState | VolumeState | SpeechState | IndicatorState;
}
