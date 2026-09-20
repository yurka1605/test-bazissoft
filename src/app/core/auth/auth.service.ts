import { inject, Injectable, signal } from "@angular/core";
import { STORAGE_SERVICE } from "../storage";
import { AuthApiService } from "./auth-api.service";
import { Observable, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _storage = inject(STORAGE_SERVICE);
    private _api = inject(AuthApiService);
    
    private readonly _isAuthenticatedKey = 'isAuthenticated';
    private readonly _isAuthenticatedState = signal(
        this._storage.get<boolean>(this._isAuthenticatedKey)
    );
    readonly isAuthenticated = this._isAuthenticatedState.asReadonly();

    login(username: string, password: string): Observable<void> {
        return this._api.login(username, password)
            .pipe(tap(() => this._changeAuthentication(true)));
    }

    logout(): Observable<void> {
        return this._api.logout().pipe(tap(() => this._changeAuthentication(false)));
    }

    private _changeAuthentication(isAuthenticated: boolean) {
        this._storage.set(this._isAuthenticatedKey, isAuthenticated);
        this._isAuthenticatedState.set(isAuthenticated);
    }
}