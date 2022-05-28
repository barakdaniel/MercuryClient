import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Researcher } from "../interfaces/Researcher";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    loggedUsedData: Researcher
    userToken: string;
    endPoint: string = 'http://localhost:8000/api/'
    // endPoint: string = 'https://mercury-be-network.herokuapp.com/api/'
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(protected http: HttpClient) { }

    get(entity: string, params?: any, responseType?: any): Observable<any> {
        return this.http.get(`${this.endPoint}${entity}`, { headers: this.headers, params, responseType })
    }

    post(entity: string, obj: any, responseType?: any): Observable<any> {
        return this.http.post(`${this.endPoint}${entity}`, obj, { headers: this.headers, responseType });
    }

    put(entity: string, obj: any): Observable<any> {
        return this.http.put(`${this.endPoint}${entity}`, obj, { headers: this.headers });
    }

    delete(entity: string, obj: any): Observable<any> {
        const options = {
            headers: this.headers,
            body: obj
        }
        return this.http.delete(`${this.endPoint}${entity}`, options);
    }

    setUserData(data) {
        this.loggedUsedData = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
        }
    }

    setUserToken(userToken: string) {
        this.userToken = userToken;
        this.headers = this.headers.set('Authorization', "Token " + userToken);
        localStorage.setItem('Token', this.userToken);
    }

    removeUserToken() {
        this.headers = this.headers.delete('Authorization');
    }

    checkForUserToken() {
        return localStorage.getItem('Token');
    }
}