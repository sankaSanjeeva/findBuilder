import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './_models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  uri = 'http://localhost:3000'

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.uri}/users/authenticate`, { username, password })
        .pipe(map(user => {

          console.log(user);
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken() {
    return localStorage.getItem('currentUser')
  }

  isLoggednIn(){
    return this.getToken() !== null;
    // return true;
  }


}

  /* authToken: any;
  user: any;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  uri = 'http://localhost:3000'

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log('this is currentUserSubject'+this.currentUser);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  
  // LogIn
  loginUser(user){
    return this.http.post(`${this.uri}/users/login`,user)
  }

  // Profile
  getProfile(){
    let headers = new HttpHeaders();
    this.loadToken();
    console.log(this.authToken);
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.uri}/users/profile`,{headers:headers});
  }

  // Store taken
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Load token
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // LogOut
  logOut(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('id_token')
  }

  isLoggednIn(){
    return this.getToken() !== null;
    // return true;

  } */
