import { Injectable } from '@angular/core';
import { find } from "lodash";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public USERS: any = [
    {
      employeeId: "D657",
      email: "mahale.yogesh4@gmail.com",
      firstName: 'Yogesh',
      lastName: 'Mahale',
      role: 'ADMIN'
    },
    {
      employeeId: "D150",
      email: "mahale.ananta@gmail.com",
      firstName: 'Ananta',
      lastName: 'Mahale',
      role: 'DEVELOPER'
    },
    {
      employeeId: "D180",
      email: "helper@gmail.com",
      firstName: 'Helper',
      lastName: 'User',
      role: 'HELPER'
    },
    {
      employeeId: "D170",
      email: "manager@gmail.com",
      firstName: 'Manager',
      lastName: 'User',
      role: 'MANAGER'
    }
  ];
  constructor() { }

  validateUser(userData: any) {
    let user: any = find(this.USERS, {email: userData.email});
    console.log("--> Logged In User ", user);
    if (user) {
      return user;
    } else {
      return false;
    }
  }

}
