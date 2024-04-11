import { HttpClient } from '@angular/common/http';
import {  inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url:string = environment.url;
  private http:HttpClient = inject(HttpClient);
  constructor() {
 
   }
   getAllMessages():Observable<Message[]>{
    return this.http.get<Message[]>(`${this.url}/messages`)
   }

 
}
