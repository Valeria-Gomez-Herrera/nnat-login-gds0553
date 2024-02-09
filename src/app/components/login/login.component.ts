import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password:['',[Validators.required]]
  });
  
  constructor(
    private fb:FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private messageService: MessageService){
  }

  get email(){
    return this.loginForm.controls['email']
  }

  get password(){
    return this.loginForm.controls['password']
  }

  login(){
    console.log('Se Obtienen los datos');
    const {email, password} = this.loginForm.value;

    this.authService.getUserByEmail(email as String).subscribe(
      response => {
        if(response.length > 0 && response[0].password === password){
          sessionStorage.setItem('email', email as string);
          this.messageService.add({ severity: 'info', summary: '!WAO¡', detail: 'Ta Bien :D' });
          this.router.navigate(['home']);
        } else{
          this.messageService.add({ severity: 'warn', summary: 'Correo o Contraseña', detail: 'Ta Mal D:' });
        }
      },
      error => {
        this.messageService.add({ severity: 'warn', summary: 'Correo o Contraseña', detail: 'Ta Mal D:' });
      }
    )
  }
}
