import { Component, OnInit, Input } from '@angular/core';
import { Coach } from '../../_models/coach';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';
import { CoachService } from 'src/app/_services/coach.service';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  coaches: Coach[];
  constructor(private authService: AuthService,
    private coachService: CoachService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadCoaches();
  }

  loadCoaches() {
this.coachService.getAllCoaches().subscribe((coaches: Coach[]) => {
  this.coaches = coaches;
}, error => {
  this.alertify.error(error);
});
}

}

