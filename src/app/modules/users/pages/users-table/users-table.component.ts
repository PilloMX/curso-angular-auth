import { Component, OnInit } from '@angular/core';

import { GenericDataSource } from './data-source';
import { UsersService } from '@services/users.service';
import { User } from '@models/user.model';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit  {

  dataSource = new GenericDataSource<User>();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user$ = this.authServ.users$;

  constructor(
    private usersServ:UsersService,
    private authServ: AuthService
  ) {

  }

  ngOnInit(): void {
    // this.authServ.getProfile().subscribe(user => {
    //   this.user = user;
    // });

    this.usersServ.getUsers().subscribe(users =>{
      this.dataSource.init(users);
    });
  }

}
