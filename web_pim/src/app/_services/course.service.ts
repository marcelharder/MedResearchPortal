import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Course } from '../_models/Course';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
   baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }


addCourse(id: number, course: Course ) {
  
  return this.http.post(this.baseUrl + 'courses/' + id, course); }

getCourses() {
  return this.http.get<Course[]>(this.baseUrl + 'courses');
}


}
