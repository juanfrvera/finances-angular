import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignUpPageComponent {
  ui = {
    name: undefined,
    username: undefined,
    password: undefined,
  };
}
