import { Service } from "@angular/core";
import { loginSuccessData } from "./auth.mock";
import { Observable } from "rxjs";


@Service()
export class AuthApiService {
    login(username: string, password: string): Observable<void> {
        return new Observable((observer) => {
            if (this._isLoginSuccess(username, password)) {
                observer.next();
                observer.complete();
            } else {
                observer.error({
                    status: 401,
                    message: 'Неверный логин или пароль'
                });
            }
        });
    }

    logout(): Observable<void> {
        return new Observable((observer) => {
            observer.next();
            observer.complete();
        }); 
    }

    private _isLoginSuccess(username: string, password: string): boolean {
        return loginSuccessData.username === username && 
            loginSuccessData.password === password;
    }
}