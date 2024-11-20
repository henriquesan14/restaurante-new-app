import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { LocalstorageService } from '../../../shared/services/localstorage.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FormUtils } from '../../../shared/utils/form.utils';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private localStorageService: LocalstorageService, private router: Router,
    private spinner: NgxSpinnerService, private notificationService: NotificationService){
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.spinner.show();
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.localStorageService.setAuthStorage(res);
          // this.notificationService.startConnection(res.user.id.toString());
          this.router.navigate(['/app']);
        },
        error: () => {
          this.spinner.hide();
        },
        complete: () => {
          this.spinner.hide();
        }
      })
    }else{
      FormUtils.markFormGroupTouched(this.loginForm);
    }
  }

  isInvalidAndTouched(fieldName: string){
    return FormUtils.isInvalidAndTouched(this.loginForm, fieldName);
  }

  getError(field: string, validation: string){
    return this.loginForm.get(field)?.hasError(validation);
  }
}
