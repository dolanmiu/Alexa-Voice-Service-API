declare namespace AVS {
    interface EventMetadata {
        context?: AVS.ContextItem[];
        event: {
            header: {
                namespace: string;
                name: string;
                messageId: string;
                dialogRequestId?: string;
            };
        };
    }

    interface DirectiveMetadata {
        directive: {
            header: {
                namespace: string;
                name: string;
                messageId: string;
                dialogRequestId?: string;
            };
        };
    }
}
