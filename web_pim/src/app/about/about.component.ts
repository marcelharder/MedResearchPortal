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

   clickBookings(){this.router.navigate(['/about',{ outlets: { rot: ['two']  }}]);}

   clickPayments(){this.router.navigate(['/about',{ outlets: { rot: ['three']  }}]);}




}
