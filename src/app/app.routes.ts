import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SignUpPageComponent } from './signup-page/signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', canMatch: [loggedInGuard()], component: HomeComponent },
  { path: '', component: WelcomePageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'login', component: LoginPageComponent },
];
