import { inject, Service } from "@angular/core";
import { BaseDataProvider } from "../storage";
import { AuthApiService } from "./auth-api.service";
import { Observable, tap } from "rxjs";

@Service()
export class AuthService extends BaseDataProvider<string | null> {
    private readonly _api = inject(AuthApiService);
    readonly authenticatedUser = this.data.asReadonly();

    constructor() {
        super('authenticatedUser', null);
    }

    login(username: string, password: string): Observable<void> {
        return this._api.login(username, password)
            .pipe(tap(() => this._changeAuthenticationUser(username)));
    }

    logout(): Observable<void> {
        return this._api.logout().pipe(tap(() => this._changeAuthenticationUser(null)));
    }

    private _changeAuthenticationUser(authenticatedUser: string | null) {
        this.data.set(authenticatedUser);
        this.updateStorage();
    }
}