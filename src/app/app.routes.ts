import { Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { SignUpPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', canMatch: [loggedInGuard()], component: HomeComponent },
  { path: '', component: WelcomePageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'login', component: LoginPageComponent },
];
