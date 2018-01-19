import {HTTP2_BOUNDARY} from "./constants/general";

export default class Http2Utility {
    public createMetadata<T>(body: T): string {
        const output = `--${HTTP2_BOUNDARY}
        Content-Disposition: form-data; name="metadata"
        Content-Type: application/json; charset=UTF-8

        ${JSON.stringify(body)}

        --${HTTP2_BOUNDARY}--
        `;

        return output;
    }
}
