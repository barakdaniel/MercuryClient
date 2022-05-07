import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { LoggedUserData } from "../interfaces/LoggedUserData";

import { HttpService } from "./http.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loggedUserData: LoggedUserData;
    loggedUserData$: BehaviorSubject<LoggedUserData>
    currentUserToken: string;
    userLoggedIn: boolean = false;

    constructor(private httpService: HttpService) { }

    login(user) {
        this.httpService.post('Authenticate', user).subscribe(res => {
            this.loggedUserData = res;
            this.loggedUserData$ = new BehaviorSubject<LoggedUserData>(this.loggedUserData);
            if (this.loggedUserData)
                this.initUserData(this.loggedUserData);
        },
            error => {
                console.log(error);
            });
    }

    logout() {
        this.loggedUserData = null;
        this.loggedUserData$.next(this.loggedUserData);
        sessionStorage.removeItem('UserToken');
        //Navigate to login page
    }

    initUserData(userData) {
        this.loggedUserData = userData;
        //Set Token: this.httpService.userToken = ....
        //Set Headers: this.httpService.setHeaders() ....
        //Set User Token: this.httpService.setUserToken() ....
        this.loggedUserData$.next(this.loggedUserData);
        //Navigate
    }
}