import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AuthService } from '@app/core/service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private authService:AuthService = inject(AuthService);

  public name:string ='';

  constructor(){
    this.name = this.authService.currentUser()?.name ||'';
  }

  onLogout(){
    this.authService.logout()
  }
}
