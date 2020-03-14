import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/User';


@Component({
  selector: 'app-user-card',
  templateUrl: './userCard.component.html',
  styleUrls: ['./userCard.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {

  }

  sendEmail() {

  }


}
