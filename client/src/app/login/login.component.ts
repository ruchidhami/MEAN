import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { LoginService } from "./login.service";
import { LoginUser } from "./login-user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, RouterModule]
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private loginService: LoginService) {
  }

  loginUser: LoginUser;

  ngOnInit() {
    this.loginUser = new LoginUser();
  }

  login() {
    console.log(this.loginUser)
  }

}
