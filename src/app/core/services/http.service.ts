import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    userToken: string;
    endPoint: string; //Add endPoint
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

    setHeaders(userToken: string) {
        this.headers = this.headers.set('UserToken', userToken);
    }

    setUserToken() {
        sessionStorage.setItem('UserToken', this.userToken);
    }

    checkForUserToken() {
        return sessionStorage.getItem('UserToken');
    }
}