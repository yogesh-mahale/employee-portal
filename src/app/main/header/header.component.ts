import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { find } from "lodash";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: any;
  public isAuthenticated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService
  ) { 
    
  }
 
  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = this.storageService.getItem('user');

    if (this.user?.email) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  signout() {
    this.storageService.removeAll();
    this.router.navigate(['/']);
  }

}
