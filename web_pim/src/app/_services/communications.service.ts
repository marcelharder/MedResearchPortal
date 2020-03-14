import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from 'src/app/_models/email';
import { environment } from 'src/environments/environment';
import { Sms } from '../_models/sms';

@Injectable({
  providedIn: 'root'
})
export class CommunicationsService {
baseUrl = environment.apiUrl;

constructor(private http: HttpClient) {}

 sendEmail(id: number, email: Email) {  return this.http.post(this.baseUrl + 'email/' + id, email); }

 sendSms(id: number, sms: Sms) {  return this.http.post(this.baseUrl + 'sms/' + id, sms); }

 sendEmailByAnyUser(email: Email) {  return this.http.post(this.baseUrl + 'email', email); }

 sendSmsByAnyUser(sms: Sms) {  return this.http.post(this.baseUrl + 'sms', sms); }
}
