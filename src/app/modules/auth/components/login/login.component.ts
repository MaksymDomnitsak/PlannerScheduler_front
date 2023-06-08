import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SaveUser } from 'src/app/models/saveUser';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private auth: AuthService,private route:Router,private formBuilder: FormBuilder) {
  }

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    let authFlow = this.auth.login(email,password);
    console.log(authFlow);

    authFlow.subscribe({
      next: (user: SaveUser) => {
        this.auth.saveUserToLocalStorage(user);
        console.log(user);
        this.route.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
