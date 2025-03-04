import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RequestStatus } from '@models/RequestStatus';
import {AuthService} from '@services/auth.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['test01@testing.com', [Validators.email, Validators.required]],
    password: ['test1234', [ Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe(p =>{
      const email = p.get('email');
      if(email){
        this.form.controls.email.setValue(email);
      }else{
        this.form.controls.email.setValue('test01@testing.com');
        this.form.controls.password.setValue('pruebas123')
      }
    })
  }

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();

      this.authService.login(email,password).subscribe({
        next: ()=>{
          this.status = 'success';
          this.router.navigate(['/app']);
        },
        error: ()=>{
          this.status = 'failed';
        }
      });


    } else {
      this.form.markAllAsTouched();
    }
  }

}
