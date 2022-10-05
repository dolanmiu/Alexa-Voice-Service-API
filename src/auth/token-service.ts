import * as request from "request-promise";
import { Observable } from "rxjs/Observable";

export interface IAmazonTokenResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: string;
}

export interface IAVSOptions {
    refreshToken: string;
    clientId: string;
    clientSecret: string;
}

export class TokenService {
    private token$: Observable<IAmazonTokenResponse>;

    constructor(options: IAVSOptions) {
        this.token$ = new Observable<IAmazonTokenResponse>((observer) => {
            this.obtainToken(options)
                .then((token) => {
                    observer.next(token);
                })
                .catch((err) => {
                    throw new Error(err);
                });

            setInterval(() => {
                this.obtainToken(options)
                    .then((token) => {
                        observer.next(token);
                    })
                    .catch((err) => {
                        throw new Error(err);
                    });
            }, 3000 * 1000);
        });
    }

    private async obtainToken(options: IAVSOptions): Promise<IAmazonTokenResponse> {
        const grantType = "refresh_token";
        const postData = `grant_type=${grantType}&refresh_token=${options.refreshToken}&client_id=${options.clientId}&client_secret=${
            options.clientSecret
        }&redirect_uri=${encodeURIComponent("")}`;

        const body = await request.post({
            uri: "https://api.amazon.com/auth/o2/token",
            json: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: postData,
        });

        return body;
    }

    public get Token$(): Observable<IAmazonTokenResponse> {
        return this.token$;
    }
}
