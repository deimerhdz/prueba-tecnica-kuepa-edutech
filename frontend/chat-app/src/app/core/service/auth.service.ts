import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Login } from '../interfaces/login.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { AuthStatus } from '../enums/auth-status.enum';
import { LoginResponse } from '@core/interfaces/response-login.interface';
import { CheckTokenResponse } from '@core/interfaces/check-token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url:string = environment.url;
  private http:HttpClient = inject(HttpClient);
  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.CHECKING);

  public currentUser = computed(()=>this._currentUser());
  public authStatus = computed(()=>this._authStatus());

  private setAuthentication(user:User,token:string):boolean{
    this._authStatus.set(AuthStatus.AUTHENTICATED);
    this._currentUser.set(user)
    localStorage.setItem('token',token)
    return true;
  }
  constructor() {
    this.checkAuthStatus().subscribe()
   }

  login(login:Login):Observable<boolean>{
   return this.http.post<LoginResponse>(`${this.url}/auth/login`,login).pipe(
    map(({user,token})=>this.setAuthentication(user,token)),
    catchError(err=> throwError(()=>{
      return err.error.error})
    ));
  }
  checkAuthStatus():Observable<boolean>{
    const token = localStorage.getItem('token');
    if(!token){
      this.logout();  
      return of(false);
    }

    return this.http.get<CheckTokenResponse>(`${this.url}/auth/check-token`)
    .pipe(
      map(({user,token})=>this.setAuthentication(user,token)),
      catchError(()=>{
        this._authStatus.set(AuthStatus.NOTAUTHENTICATED)
        return of(false)
      }))
  }

  logout(){
    localStorage.removeItem('token');
    this._authStatus.set(AuthStatus.NOTAUTHENTICATED);
    this._currentUser.set(null);
  }
}
