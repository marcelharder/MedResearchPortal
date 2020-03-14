import { Component, OnInit } from '@angular/core';
import { Coach } from 'src/app/_models/coach';
import { CoachService } from 'src/app/_services/coach.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { CommunicationsService } from 'src/app/_services/communications.service';
import { Email } from 'src/app/_models/email';
import { Sms } from 'src/app/_models/sms';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
coach: Coach;
email: Email;
sms: Sms;
showEmailForm = false;
showSmsForm = false;
  constructor(
    private coachService: CoachService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private comService: CommunicationsService) { }

  ngOnInit() { this.loadCoach();
    this.email = {  Id: 9999,  From: '',   To: '',  Subject: '',  Body: '',  Surgeon: '',  Surgeon_image: '',  Soort: '',  Hash: '' };
    this.sms = { Id: 999, Body: '', PhoneNumber: ''};
  }

  loadCoach() {
this.coachService.getCoach(+this.route.snapshot.params['id']).subscribe((coach: Coach) => {this.coach = coach;
}, error => {this.alertify.error(error); });

  }

   displayEmail() {this.showEmailForm = true; this.showSmsForm = false;}
   displaySMS() {this.showSmsForm = true; this.showEmailForm = false;}


  showEmail() {if (this.showEmailForm) {return true; } else {return false; }}
  showSMS() {if (this.showSmsForm) {return true; } else {return false; }}

  sendEmail() {

    this.comService.sendEmailByAnyUser(this.email).subscribe(
      next => {this.alertify.succes('Email sent ...');}, 
      error => {this.alertify.error(error);});
  }

  sendSMS() {

    this.comService.sendSmsByAnyUser(this.sms).subscribe(
      next => {this.alertify.succes('SMS sent ...');}, 
      error => {this.alertify.error(error);});
  }

  cancel() {
    this.showEmailForm = false;
    this.showSmsForm = false;
    }

}
