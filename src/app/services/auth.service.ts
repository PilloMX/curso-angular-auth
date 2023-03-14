import { Injectable, enableProdMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ProfileComponent } from '../modules/profile/pages/profile/profile.component';
import { switchMap, tap } from 'rxjs/operators';
import {TokenService} from '@services/token.service';
import {ResponseLogin} from '@models/auth.model';
import { User } from '@models/user.model';
import { BehaviorSubject } from 'rxjs';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = environment.API_URL;
  users$ = new BehaviorSubject<User | null>(null); //reactividad en el perfil

  constructor(
      private http:HttpClient,
      private tokenServ: TokenService
    ) { }

  login(email:string, password:string){
    return this.http.post<ResponseLogin>(`${this.apiURL}/api/v1/auth/login`, {email, password})
      //antes de devolver el flujo normal, genera el token
      .pipe(
        tap(response => {
          this.tokenServ.saveToken(response.access_token);
        })
      );
  }
  register(name:string, email:string, password:string){
    return this.http.post(`${this.apiURL}/api/v1/auth/register`, {name, email, password});
  }
  isAvaliable(email:string){
    return this.http.post<{isAvailable:boolean}>(`${this.apiURL}/api/v1/auth/is-available`, {email})
  }
  registerAndLogin(name:string, email:string, password:string){
    return this.register(name, email, password).pipe(
      switchMap(()=> this.login(email, password))
    );
  }
  logout(){
    this.tokenServ.removeToken();
  }
  getProfile(){
    const bearerToken = this.tokenServ.getToken();
      return this.http.get<User>(`${this.apiURL}/api/v1/auth/profile`, {context: checkToken()}).pipe(
        tap(user => { //antes de devolver el flujo normal, envía el valor de usuario
          this.users$.next(user);
        })
      );
  }
}
