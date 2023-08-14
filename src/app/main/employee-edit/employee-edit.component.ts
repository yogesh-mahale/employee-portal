import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { find } from "lodash";
import { count } from 'rxjs';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  public employeeForm: any = new FormGroup({
    employeeId: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    department: new FormControl(),
    doj: new FormControl(),
    country: new FormControl(),
    state: new FormControl(),
    city: new FormControl(),
  });

  public user: any;
  public countries: any = [
    'India',
    'United States',
  ];

  public states: any = [];
  public cities: any = [];
  public departments: any = [
    "Admin",
    "Developer",
    "Manager",
    "Helper"
  ];

  public countryList: any = [
    {
      country: 'India',
      countryCode: 'IN',
      states: [
        {
          stateName: 'Maharashtra',
          cities: [
            {
              cityName: 'Pune'
            },
            {
              cityName: 'Nashik'
            }
          ] 
        },
        {
          stateName: 'Gujrat',
          cities: [
            {
              cityName: 'Surat'
            },
            {
              cityName: 'Ahmadabad'
            }
          ] 
        }
      ]
    },
    {
      country: 'United States',
      countryCode: 'US',
      states: [
        {
          stateName: 'California',
          cities: [
            {
              cityName: 'Sacramento'
            },
            {
              cityName: 'Los Angeles'
            }
          ] 
        },
        {
          stateName: 'Texas',
          cities: [
            {
              cityName: 'Austin'
            },
            {
              cityName: 'Houston'
            }
          ] 
        }
      ]
    }
  ];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService
  ) { 
    
  }

  getUser() {
    this.user = this.storageService.getItem('user');
  }

  ngOnInit() {
    this.getUser();

    this.employeeForm = this.formBuilder.group({
      employeeId: [this.user?.employeeId, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName],
      email: [''],
      department: [this.user.role],
      doj: [''],
      country: [''],
      state: [''],
      city: [''],
    });

   this.setDefault();
  }

  setDefault() {
    this.employeeForm.get('country').setValue('India');
    this.employeeForm.get('department').setValue('Admin');
  }

  hasCreateAccess() {
    if (this.user.role === 'ADMIN') {
      return true;
    } else {
      return false;
    }
  }

  onChangeCountry() {
    let selectedCountry: string = this.employeeForm.get('country').value;
    
    if (selectedCountry) {
      let country = find(this.countryList, {country: selectedCountry});
      this.states = country?.states?.map((item: any) => {
        return item.stateName;
      });
    }
  }
  
  onChangeState() {
    let selectedCountry: string = this.employeeForm.get('country').value;
    let selectedState: string = this.employeeForm.get('state').value;

    let country = find(this.countryList, {country: selectedCountry});
    let countryStates = find(country?.states, {stateName: selectedState});

    this.cities =  countryStates?.cities?.map((item: any) => {
      return item.cityName;
    });
  }
}
