import { inject, Injectable, signal } from "@angular/core";
import { STORAGE_SERVICE } from "../storage";
import { AuthApiService } from "./auth-api.service";
import { Observable, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _storage = inject(STORAGE_SERVICE);
    private _api = inject(AuthApiService);
    
    private readonly _isAuthenticatedUserKey = 'authenticatedUser';
    private readonly _authenticatedUserState = signal(
        this._storage.get<string | null>(this._isAuthenticatedUserKey) ?? null
    );
    readonly authenticatedUser = this._authenticatedUserState.asReadonly();

    login(username: string, password: string): Observable<void> {
        return this._api.login(username, password)
            .pipe(tap(() => this._changeAuthenticationUser(username)));
    }

    logout(): Observable<void> {
        return this._api.logout().pipe(tap(() => this._changeAuthenticationUser(null)));
    }

    private _changeAuthenticationUser(authenticatedUser: string | null) {
        authenticatedUser 
            ? this._storage.set<string>(this._isAuthenticatedUserKey, authenticatedUser)
            : this._storage.remove(this._isAuthenticatedUserKey);
        this._authenticatedUserState.set(authenticatedUser);
    }
}