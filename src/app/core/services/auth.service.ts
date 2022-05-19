import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

import { LoggedUserData } from "../interfaces/LoggedUserData";

import { HttpService } from "./http.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loggedUserData: LoggedUserData;
    loggedUserData$: BehaviorSubject<LoggedUserData>
    currentUserToken: string;
    userLoggedIn = new BehaviorSubject<boolean>(false);//TBD this.hasToken());


    constructor(private httpService: HttpService, private router: Router) { }

    register(details) {
        this.httpService.post('profiles/researcher/', details).subscribe({
            next: (res) => {
                console.log(res);
            },
            error: e => console.log(e),
        })
    }

    isLoggedIn(): Observable<boolean> {
        return this.userLoggedIn.asObservable();
    }

    async login(user) {
        this.httpService.post('profiles/login/', user).subscribe({
            next: (res) => {
                this.loggedUserData = res;
                this.loggedUserData$ = new BehaviorSubject<LoggedUserData>(this.loggedUserData);
                if (this.loggedUserData)
                    this.httpService.setUserToken(res.token);
                this.httpService.setUserData(res);
                this.userLoggedIn.next(true);
                this.router.navigate(['']);
                return this.userLoggedIn;
            },
            error: e => {
                console.log(e);
                return this.userLoggedIn;
            }
        })
    }

    authenticate() {
        this.httpService.post('profiles/login/', {}).subscribe({
            next: (res) => {
                this.loggedUserData = res;
                this.loggedUserData$ = new BehaviorSubject<LoggedUserData>(this.loggedUserData);
                this.httpService.setUserData(res);
                this.userLoggedIn.next(true);
                this.router.navigate(['']);
                return this.userLoggedIn;
            },
            error: e => {
                console.log(e);
                return this.userLoggedIn;
            }
        })
    }

    tryLoginWithToken() {
        const userToken = this.httpService.checkForUserToken();
        if (userToken == undefined || userToken == null || userToken == "") {
            return;
        }
        this.httpService.setUserToken(userToken);
        this.authenticate();
    }

    logout() {
        this.loggedUserData = null;
        this.loggedUserData$.next(this.loggedUserData);
        this.userLoggedIn.next(false);
        localStorage.removeItem('Token');
        this.httpService.removeUserToken();
    }
}