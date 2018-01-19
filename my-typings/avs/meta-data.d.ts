declare namespace AVS {
    interface EventMetadata<T> {
        context?: AVS.ContextItem[];
        event: {
            header: {
                namespace: string;
                name: string;
                messageId: string;
                dialogRequestId?: string;
            };
            payload: T;
        };
    }

    interface DirectiveMetadata<T> {
        directive: {
            header: {
                namespace: string;
                name: string;
                messageId: string;
                dialogRequestId?: string;
            };
            payload: T;
        };
    }
}
