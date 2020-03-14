import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { environment } from 'src/environments/environment';
import { Invoice } from '../_models/Invoice';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

baseUrl = environment.apiUrl;
constructor(private http: HttpClient, private alertify: AlertifyService, private auth: AuthService) { }

getInvoices() {
  return this.http.get<Invoice[]>(this.baseUrl + 'invoice');
}

}
