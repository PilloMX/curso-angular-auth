import { Component, OnInit } from '@angular/core';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { User } from '@models/user.model';
import { TokenService } from '@services/token.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent  {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  user$ = this.authServ.users$;

  constructor(
    private authServ: AuthService,
    private router: Router,
    private tokenServ: TokenService
  ) {}

  logOut(){
    this.authServ.logout();
    this.router.navigate(['/login']);
  }

  isValidToken(){
    console.log(this.tokenServ.isValidToken());
  }

}
