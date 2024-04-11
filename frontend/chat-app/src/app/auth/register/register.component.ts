import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@app/core/service/auth.service';
import { ValidatorService } from '@app/core/service/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private router:Router = inject(Router);
  private authService:AuthService = inject(AuthService);
  private validatorService:ValidatorService = inject(ValidatorService);
  private fb:FormBuilder = inject(FormBuilder);
  public form:FormGroup = this.fb.group({
    name:['',Validators.required],
    username:['',Validators.required],
    password:['',Validators.required],
    repassword:['',Validators.required],
    role:['',Validators.required]
  })
  register(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    
    this.authService.register(this.form.value).subscribe({
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
