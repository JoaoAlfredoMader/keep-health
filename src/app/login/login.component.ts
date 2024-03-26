import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterLink],
  standalone: true,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel = { email: '', password: '' };

  constructor(private router: Router){};

  onLogin() {
    const hasEmpty = !Object.values(this.loginModel).every(x => x !== null && x !== '');

    if (hasEmpty) {
      return alert('Por favor, preencha todos os campos.');
    }

    const localUsers = localStorage.getItem('keepHealthUsers');

    if (localUsers != null) {
      const users = JSON.parse(localUsers);
      const actualUser = users.find(
        (user: { email: string, password: string }) => user.email === this.loginModel.email &&
        user.password === this.loginModel.password
      );
      if (actualUser != undefined) {
        localStorage.setItem('loggedUser', JSON.stringify(actualUser));
        this.router.navigateByUrl('/home');
      } else {
        alert('Usuário ou senha incorretos. Por favor, verifique.');
      }
    } else {
      alert('Você ainda não possui cadastro. Faça seu cadastro antes de fazer login.');
    }
  }

  onRemember() {
    if (this.loginModel.email == null ||
      (typeof this.loginModel.email === "string" &&
        this.loginModel.email.trim().length === 0)) {
      return alert('Por favor, informe o email do usuário.');
    };

    const localUsers = localStorage.getItem('keepHealthUsers');

    if (localUsers != null) {
      const users = JSON.parse(localUsers);
      const actualUser = users.find(
        (user: { email: string }) => user.email === this.loginModel.email
      );
      if (actualUser != undefined) {
        const index = users.findIndex((item: { email: string }) => item.email === actualUser.email);
        users[index] = Object.assign({}, users[index], { password: 'a1b2c4d4' });
        localStorage.setItem('keepHealthUsers', JSON.stringify(users));
        alert('Uma senha temporária foi enviada para o seu email. Por favor, verifique e tente novamente.');
      } else {
        alert('Usuário não encontrado. Por favor, verifique o email digitado.');
      }
    } else {
      alert('Você ainda não possui cadastro. Faça seu cadastro antes de fazer login.');
    }
  }
}
