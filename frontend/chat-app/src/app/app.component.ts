import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStatus } from '@core/enums/auth-status.enum';
import { AuthService } from '@core/service/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  public finishedAuthCheck = computed<boolean>(()=>{
    if(this.authService.authStatus() === AuthStatus.CHECKING){
      return false;
    }
    return true;
  })

  public authStatusChangedEffect = effect(()=>{
    switch(this.authService.authStatus()){
      case AuthStatus.CHECKING: 
        return;
      case AuthStatus.AUTHENTICATED: 
        this.router.navigateByUrl('/home') 
        return; 
      case AuthStatus.NOTAUTHENTICATED:
        this.router.navigateByUrl('/auth/login')


    }
    
  })

}
