import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public invalidMessage!: string;
  constructor(private _formBuilder: FormBuilder, private _router: Router) {}
  ngOnInit(): void {
    this.initForm();
  }
  onSubmit() {
    if (
      this.loginForm.value.username === 'fingent' &&
      this.loginForm.value.password === 'fingent'
    ) {
      this.invalidMessage = '';
      this._router.navigate(['/dashboard']);
      return;
    }
    this.invalidMessage = 'Invalid credentials';
  }

  private initForm(): void {
    this.loginForm = this._formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
