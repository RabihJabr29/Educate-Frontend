import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

// const BACKEND_URL = environment.apiURL + '/user/';
const BACKEND_URL = 'should be changed';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  private tokenTimer: any;
  private userType: string;
  private userId: string;


  constructor(private router: Router) {

  }

  @Output() authInvalid = new EventEmitter<boolean>();

  getToken() {
    return this.token;
  }

  getUserType() {
    return this.userType;
  }

  getUserId() {
    return this.userId;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuthStatus() {
    return this.isAuthenticated;
  }


  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn: number =
      authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userType = authInformation.userType;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  async login(email: string, password1: string) {
    const authData = { email: email, password: password1 };
    try {
      let res = await fetch('api/logins', {
        method: "POST",
        body: JSON.stringify(authData),
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
      });
      if (res.status == 200) {
        let body = await res.json();
        let token = body.token;
        let userType = body.userType;
        let userId = body.user_id;

        if (token) {
          let expiresInDuration: number = body.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.token = token;
          this.userType = userType;
          this.userId = userId;
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(token, expirationDate, userType, userId);
          this.router.navigateByUrl('/');
        }
      } else {
        console.log(res.text());
        this.authInvalid.emit(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    this.token = null;
    this.userType = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigateByUrl('/auth/login');
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, exirationDate: Date, userType: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', exirationDate.toISOString());
    localStorage.setItem('userType', userType);
    localStorage.setItem('userId', userId);

  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');

  }

  private getAuthData() {
    const token: string = localStorage.getItem('token');
    const date = localStorage.getItem('expiration');
    const userType: string = localStorage.getItem('userType');
    const userId: string = localStorage.getItem('userId');

    if (!token || !date || !userType || !userId) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(date),
      userType: userType,
      userId: userId
    };
  }

}
