import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { UtilitiesService } from "../services/utilities.service";
import { environment } from "../../environments/environment";
import { User } from './user'
import { UserService } from "./user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, UtilitiesService]
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private utilitiesService: UtilitiesService) {
  }

  API_IMAGE_URl = environment['API_IMAGE_URl']
  user: User;
  designations: any;
  formData = new FormData();
  userId: string;
  action: string;

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
    this.action = this.activatedRoute.snapshot.paramMap.get('action');
    if (this.userId && this.action === 'edit') {
      this.fetchUser();
    }

    this.designations = [{
      value: "doctor",
      name: "Doctor"
    }, {
      value: "intern",
      name: "Intern"
    }, {
      value: 'manager',
      name: "Manager"
    }, {
      value: 'developer',
      name: "Developer"
    }]

    this.user = new User({});
    this.user.experience = [];
  }

  fetchUser() {
    this.userService.getUser(this.userId)
      .subscribe(user => {
        this.user = new User(user);
      }, err => {
        this.utilitiesService.showFlashMessage('Error fetching results.', ['alert', 'alert-danger'], 3500);
      })
  }

  uploadImage(evt) {
    const files = evt.target.files;
    if (files.length > 0) {
      let file = files[0]
      this.formData.append('profile', file, file.name)
    }
  }

  addMoreExperience() {
    this.user.experience.push({
      name: ''
    })
  }

  removeExperience(index) {
    this.user.experience.splice(index, 1);
  }

  createUser(isValid) {
    if (isValid) {
      this.userService.createUser(this.user, this.formData)
        .subscribe(() => {
          this.utilitiesService.showFlashMessage('User created successfully!', ['alert', 'alert-success'], 3500);
          this.router.navigate(['users']);
        }, err => {
          this.utilitiesService.showFlashMessage('Missing Required Field, Please re-check!', ['alert', 'alert-danger'], 3500);
        })
    } else {
      this.utilitiesService.showFlashMessage('Missing Required Field, Please re-check!', ['alert', 'alert-danger'], 3500);
    }
  }

  updateUser(isValid) {
    if (isValid) {
      this.userService.updateUser(this.userId, this.user, this.formData)
        .subscribe(() => {
          this.utilitiesService.showFlashMessage('User updated successfully!', ['alert', 'alert-success'], 3500);
          this.router.navigate(['users']);
        }, err => {
          this.utilitiesService.showFlashMessage(err.error.message, ['alert', 'alert-danger'], 3500);
        })
    } else {
      this.utilitiesService.showFlashMessage('Missing Required Field, Please re-check!', ['alert', 'alert-danger'], 3500);
    }
  }
}
