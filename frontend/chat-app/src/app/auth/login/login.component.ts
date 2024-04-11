import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from '@app/core/service/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router:Router = inject(Router);
  private authService:AuthService = inject(AuthService);
  private validatorService:ValidatorService = inject(ValidatorService);
  private fb:FormBuilder = inject(FormBuilder);
  public form:FormGroup = this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })
  login(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.authService.login(this.form.value).subscribe({
      next:(response)=>{
        if(response){
          this.router.navigateByUrl('/home')
        }
      },
      error:(message)=>{
        Swal.fire('Error',message,'error')
      }
    })

  }
  
  getFieldError(field:string){
    return this.validatorService.getFieldError(field,this.form)
  }

  isValidField(field:string){
    return this.validatorService.isValidField(field,this.form);
  }
}
