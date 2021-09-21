import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { userService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/_models/Course';
import { CourseService } from 'src/app/_services/course.service';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Invoice } from 'src/app/_models/Invoice';

@Component({
  templateUrl: './edit_user_details.Component.html',
  styleUrls: ['./edit_user_details.component.scss']
})
export class EditUserDetailsComponent implements OnInit {
  user: User;
  selected_course: Course;
  course_1: Course;
  course_2: Course;

  all_courses: Array<Course> = [];
  selectable_courses: Array<Course> = [];
  enrolled_courses: Array<Course> = [];

  invoices: Array<Invoice> = [];

  constructor(
    private userService: userService,
    private alertify: AlertifyService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
   
    
    this.course_1 = {
      level: 12,
      description: 'Non duality, introduction and nothingness',
      diploma: '',
      courseDate: new Date(2019, 5, 15),
      endDate: new Date(2019, 5, 25),
      price: 12,
      userId: 0
    };
    this.course_2 = {
      level: 2,
      description: 'Slow thinking with Wolter Keers',
      diploma: '',
      courseDate: new Date(2019, 5, 15),
      endDate: new Date(2019, 5, 25),
      price: 12,
      userId: 0
    };
    this.all_courses = [this.course_1, this.course_2];

    
  }

  addCourse() {
    // attach the current user to the course that has just been selected

    


    this.courseService.addCourse(this.user.id, this.selected_course).subscribe(
      next => {
        this.alertify.succes('Course added ...');
        //this.router.navigate(['/user/' + this.user.id]);
      },
      error => {
        this.alertify.error(error);
      }
    );
    this.router.navigate(['/home']);
  }

  areThereMoreCourses() {
    if (
      Object.keys(this.enrolled_courses).length <
      Object.keys(this.all_courses).length
    ) {
      return true;
    }
    return false;
  }
}
