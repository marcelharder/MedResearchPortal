import { AuthService } from '../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};
  login_failed = false;
  adminLogged: boolean;
  normalLogged: boolean;
  specialLogged: boolean;
  constructor(public auth: AuthService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.model).subscribe( next => {
        this.alertify.succes('Logged in successfully');
        this.login_failed = false;
        this.adminLogged = false;
        this.normalLogged = false;
        this.specialLogged = false;
        switch (this.auth.decodedToken.role) {
        case 'admin':
        this.adminLogged = true;
        break;
        case 'normal':
        this.normalLogged = true;
        break;
        case 'special':
        this.specialLogged = true;
        break;}






        // go to the list of procedures
      },
      error => {
        // say log in failed, offer to register
        this.alertify.error(error);
        this.login_failed = true;
      }, () => {
        this.router.navigate(['/home']);
      }

    );
  }
  loggedIn() { return this.auth.loggedIn(); }

  logOut() {
    this.alertify.message('Logged out');
    localStorage.removeItem('token');
  }

showRegister() {
  this.router.navigate(['/register']);
}


}
