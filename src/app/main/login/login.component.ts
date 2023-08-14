import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signInForm: any = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: [''],
    });
  }


  submitForm() {
    if (!this.signInForm.valid) {
      return
    }

    const userData = this.signInForm.getRawValue();
    console.log('formData ', userData);

    let user: any = this.authService.validateUser(userData);

    if (user) {
      this.storageService.setItem('user', user);

      // Redirect to user-details
      this.router.navigate(['/edit']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
