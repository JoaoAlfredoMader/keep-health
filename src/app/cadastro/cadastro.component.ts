import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  imports: [FormsModule, RouterLink],
  standalone: true,
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastroModel = {
    nome: '',
    email: '',
    dataNascimento: '',
    password: ''
  }

  confirmPassword = ''

  constructor(private router: Router){};

  onSignUp() {
    const hasEmpty = !Object.values(this.cadastroModel).every(x => x !== null && x !== '');

    if (hasEmpty) {
      return alert('Por favor, preencha todos os campos.');
    } else if (this.cadastroModel.password != this.confirmPassword) {
      return alert('As senhas não coincidem. Por favor, verifique.');
    }

    const localUser = localStorage.getItem('keepHealthUsers');

    if (localUser != null) {
      const users = JSON.parse(localUser);
      console.log(users)
      users.push(this.cadastroModel);
      localStorage.setItem('keepHealthUsers', JSON.stringify(users));
    } else {
      const users = [];
      users.push(this.cadastroModel);
      localStorage.setItem('keepHealthUsers', JSON.stringify(users));
    }

    alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
    this.router.navigateByUrl('/login');
  }

  isValidEmail() {
    const email = this.cadastroModel.email;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    return emailRegex.test(email);
  }
}
