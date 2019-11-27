import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  items: Observable<any[]>;

  constructor(public authenticationService: AuthenticationService){
    this.items = this.authenticationService.userInfo
  }

  ngOnInit() {
    
  }

  setdata(){
    console.log('setdata')
    this.authenticationService.Save();
  }
}
