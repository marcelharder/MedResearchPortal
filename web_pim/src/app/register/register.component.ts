import { AuthService } from '../_services/auth.service';
import { Component, OnInit} from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
model: any = {};


constructor(private auth: AuthService, private alertify: AlertifyService, private router: Router) { }

ngOnInit() {
  }

register() {
  this.auth.register(this.model).subscribe(() => {
    this.alertify.succes('You are registered ...');
  }, error => {
    this.alertify.error(error);
  }, () => {
    this.router.navigate(['/home']);
  } );
}

cancel() { this.router.navigate(['/home']); }




}
