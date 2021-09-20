import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {  }


   clickUsers(){this.router.navigate(['/about',{ outlets: { rot: ['one']  }}]);}

  // clickUsers(){this.router.navigate([{ outlets: { rot: [ '/main/one' ] }}]);}
  //clickUsers(){  this.router.navigate([{ outlets: {rot: '/one'}}]);}


   // clickUsers(){this.router.navigate([{ outlets: { about: [ '/main/one' ] }}]);}

  clickBookings(){this.router.navigate(['/about',{ outlets: { rot: ['two']  }}]);}

  clickPayments(){this.router.navigate(['/about',{ outlets: { rot: ['three']  }}]);}




}
