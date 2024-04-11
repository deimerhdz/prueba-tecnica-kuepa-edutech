import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '@app/core/interfaces/message.interface';
import { MessageService } from '@app/core/service/messages.service';
import { SocketService } from '@app/core/service/socket.service';
import { NavbarComponent } from '@app/shared/components/navbar/navbar.component';
import {  SocketIoModule } from 'ngx-socket-io';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,SocketIoModule, CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private sockectService:SocketService = inject(SocketService);
  public message:string ='';
  public messages:Message[] =[];
  private messageService:MessageService = inject(MessageService);

  constructor(){
   
  }
  ngOnInit(): void {
    this.sockectService.messages$().subscribe(data=>{
      this.messages = data.messages;

    })
    this.getAllMeessages();
   
   
  }
  getAllMeessages(){
    this.messageService.getAllMessages().subscribe({
      next:(messages)=>{
        this.messages = messages;
        console.log(this.messages);
      }
    })
  }
  sendMessage(){
    this.sockectService.sendMessage$(this.message)
    this.message='';
  }

  
}
