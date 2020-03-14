import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { userService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



@Component({
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.scss']
})
export class UserProfileComponent implements OnInit {
user: User;
baseUrl = environment.apiUrl;
@ViewChild('editForm') editForm: NgForm;
@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any) { if (this.editForm.dirty) {$event.returnValue = true; }}

  constructor(private route: ActivatedRoute,
    private router: Router,
    private alertify: AlertifyService,
    private userService: userService,
    private auth: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {this.user = data['user']; });
    }

updatePhoto(photoUrl: string) {  this.user.photoUrl = photoUrl;  }

updateUser() {
this.userService.updateUser(this.auth.decodedToken.nameid, this.user).subscribe(next => {
  this.alertify.message('profile updated');
  this.editForm.reset(this.user);
}, error => {this.alertify.error(error); });

}

deleteProfile() {
  this.alertify.confirm('This will delete your profile', () => {
    this.userService.deleteUser(this.auth.decodedToken.nameid).subscribe(next => {
          localStorage.removeItem('token');
          this.router.navigate(['/home']);
    }, error => {
      localStorage.removeItem('token');
      this.router.navigate(['/home']); });
  });

}


}
