import { Component, OnInit } from '@angular/core';
import { tokenName } from '@angular/compiler';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Trac Personal 4.01';
  CurrentUser = 'to do';
  jwtHelper = new JwtHelperService();
  
  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {  this.auth.decodedToken = this.jwtHelper.decodeToken(token); }
  }

  loggedIn() { }

  logout() { localStorage.removeItem('token'); }
}
