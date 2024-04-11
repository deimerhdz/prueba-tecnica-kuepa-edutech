import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
 
  private router:Router = inject(Router);
  constructor(private sockectService:SocketService){
    this.sockectService.messages$().subscribe(data=>{
      this.messages = data.messages;
    })
  }
  ngOnInit(): void {
   
    this.sockectService.allMessage$();
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
