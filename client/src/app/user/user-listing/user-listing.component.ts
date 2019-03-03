import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from "../../../environments/environment";
import { UtilitiesService } from "../../services/utilities.service";
import { User } from '../user'
import { UserService } from "../user.service";


@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css'],
  providers: [UserService, UtilitiesService]
})
export class UserListingComponent implements OnInit {
  users: User[];
  API_IMAGE_URl = environment['API_IMAGE_URl'];
  count = 0;
  value: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private utilitiesService: UtilitiesService) {
  }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.userService.getAllUser()
      .subscribe(userList => {
        this.users = userList;
        this.count = userList.length;
      }, err => {
        this.utilitiesService.showFlashMessage('Error fetching results.', ['alert', 'alert-danger'], 3500);
      })
  }

  goToUserCreate(action, userId) {
    if (action === 'edit') {
      this.router.navigate(['users/create', { userId: userId, action: 'edit' }]);
    } else {
      this.router.navigate(['users/create']);
    }
  }

  searchUser(){
    this.userService.search(this.value)
      .subscribe(userList => {
        this.users = userList;
        this.count = userList.length;
      }, err => {
        this.utilitiesService.showFlashMessage('Error fetching results.', ['alert', 'alert-danger'], 3500);
      })
  }

}
