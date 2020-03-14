import { Component, OnInit, Input } from '@angular/core';
import { Coach } from '../../_models/coach';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() coach: Coach;

  constructor() { }

  ngOnInit() {

  }




}
