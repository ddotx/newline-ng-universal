import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import {SeoService} from "../seo.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('name@email.com'),
    password: new FormControl('abc123'),
  });

  constructor(
    private userService: UserService,
    private seo: SeoService
    ) {}

  ngOnInit(): void {
    this.seo.setTitle('Login Page')
  }

  public logIn() {
    const login = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.userService.login(login, password);
  }
}
