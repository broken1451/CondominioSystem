import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  logout(){
    this.authService.logout()
  }

}
