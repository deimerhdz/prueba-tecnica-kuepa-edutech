import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
}