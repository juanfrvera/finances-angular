import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  ui: {
    username?: string;
    password?: string;
    loading?: boolean;
    errorMessage?: string;
  } = {};

  constructor(private authService: AuthService, private router: Router) {}

  async loginClick() {
    if (!this.ui.username || !this.ui.password) return;

    try {
      await this.authService.login({
        username: this.ui.username,
        password: this.ui.password,
      });

      // At this point we are logged in correctly, go to logged user's home
      this.router.navigate(['/']);
    } catch (error) {
      this.ui.errorMessage = 'Invalid username or password';
    }
  }
}
