import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorService {
    

    public isValidField(field:string,form:FormGroup){
        return form.controls[field].errors && form.controls[field].touched;
    }

    public getFieldError(field:string,form:FormGroup){
        if(!form.controls[field]) return null;
        const errors = form.controls[field].errors || {}
        for(const key of Object.keys(errors)){
            switch(key){
                case 'required':
                    return 'Este campo es requerido.';
                case 'minlength':
                    return `Minimo ${errors['minlength'].requiredLength} caracteres.`;
            }
        }
        return null;
    }

    isFieldOneEqualFieldTwo(field1:string,field2:string){
        return (formGroup:FormGroup): ValidationErrors | null =>{
          const fieldValue1 = formGroup.get(field1)?.value;
          const fieldValue2 = formGroup.get(field2)?.value;
          
          if(fieldValue1 !== fieldValue2){
            formGroup.get(field2)?.setErrors({notEqual:true})
            return { notEqual:true}
           }
           formGroup.get(field2)?.setErrors(null);       
           return null;
        }
      }
}