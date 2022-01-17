import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute, private userService: UserService, private router: Router) { 
    // capturar info mediante otra forma al activate route
    // console.log(history.state.user.name)
    this.activateRoute.params.subscribe((params:Params) => {
      console.log(params)
    })    
    this.activateRoute.queryParams.subscribe((params:Params) => {
      console.log(params)
    })
  }

  ngOnInit(): void {
  }

}
