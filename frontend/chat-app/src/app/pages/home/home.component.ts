import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Message } from '@app/core/interfaces/message.interface';
import { MessageService } from '@app/core/service/messages.service';
import { SocketService } from '@app/core/service/socket.service';
import { NavbarComponent } from '@app/shared/components/navbar/navbar.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule,FormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 
  public message:string ='';
  public messages:Message[] =[];
  private messageService:MessageService = inject(MessageService);
  private sockectService:SocketService = inject(SocketService);

  constructor(){
    
  }
  ngOnInit(): void {
    setTimeout (() => { 
      this.sockectService.ioSocket.emit('get-messages', 'hola');
      console.log(this.sockectService.ioSocket);
     
   }, 5000)

   this.sockectService.messages$().subscribe(data=>{
    this.messages = data.messages;
  })
    // this.getAllMeessages();
  }
  getAllMeessages(){
    this.messageService.getAllMessages().subscribe({
      next:(messages)=>{
        this.messages = messages;
      }
    })
  }
  sendMessage(){

    this.sockectService.sendMessage$(this.message)
    this.message='';
  }

  
}
