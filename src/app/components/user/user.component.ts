import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/userService/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.userService.getAll().subscribe(response => {
      if(response.success){
        this.users = response.data;
        console.log(this.users);
      }else{

      }
    });
  }

}
