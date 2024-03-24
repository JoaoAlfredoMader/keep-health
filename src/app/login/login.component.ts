import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Make it standalone
  imports: [FormsModule] // Imports FormsModule here
})
export class LoginComponent implements OnInit {
  private email = ''
  private password = ''

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    this.email = (document.getElementById('email') as HTMLInputElement).value; // Access using template reference variable
    this.password = (document.getElementById('password') as HTMLInputElement).value;

    const users = this.authService.getUsers();
    if (users) {
      if (users.hasOwnProperty(this.email)) {
        const storedPassword = users[this.email];
        if (storedPassword === this.password) {
          alert('Login realizado com sucesso!');
          this.router.navigate(['/home']);
        } else {
          alert('Senha incorreta. Tente novamente.');
        }
      } else {
        alert('Email não encontrado. Verifique se o email digitado está correto.');
      }
    } else {
      console.error('Error: Users object is undefined in AuthService.getUsers()');
      // Handle the case where users is undefined (e.g., display an error message)
    }
  }

  isValidEmail(email: string): boolean {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }



  onForgotPassword() {
    this.authService.setUserPassword(this.email, 'a1b2c4d4');
    alert('Sua senha foi alterada para a senha padrão. Por favor, utilize-a para prosseguir.');
  }

  onSignUp() {
    this.router.navigate(['/cadastro']);
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: { [key: string]: string } = {};

  constructor() {
    this.addTestUsers();
  }

  private addTestUsers() {
    this.setUserPassword('usuario1@example.com', 'senha1');
    this.setUserPassword('usuario2@example.com', 'senha2');
    // Adicione mais usuários de teste conforme necessário
  }

  getUsers(): { [key: string]: string } {
    console.log(this.users)
    return this.users;
  }

  setUserPassword(email: string, password: string) {
    if (!this.users[email]) {
      this.users[email] = password;
    }
  }
}



