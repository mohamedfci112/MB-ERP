import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService) 
  {
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]
      });
  }

  ngOnInit(): void {
  }

  postdata(angForm1: { value: { email: any; password: any; }; })
  {
    var dta = {user_id:angForm1.value.email, password:angForm1.value.password};
  this.userService.userlogin(dta).subscribe(
  (data: any) => {
      localStorage.setItem('user_id', data[0].id);
      localStorage.setItem('group_id', data[0].group_id);
      localStorage.setItem('username', data[0].username);
      localStorage.setItem('group_name', data[0].group_name);
      window.location.href = '/';
    },
  () => {
      alert('User name or password is incorrect');
    });
  }
  // tslint:disable-next-line:typedef
  get email() { return this.angForm.get('email'); }
  // tslint:disable-next-line:typedef
  get password() { return this.angForm.get('password'); }

}
