import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Common/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate(['/']);
    //   return false;
    // } else {
    //   return true;
    // }

    
    if (this.authService.isLoggedIn()) {
      const role=this.authService.getUserRole()
        if (role) {
          switch (role) {
            case 'Admin':
              this.router.navigate(['/admin/dashboard']);
              break;
            case 'Manager':
              this.router.navigate(['/manager/dashboard']);
              break;
            case 'Driver':
              this.router.navigate(['/driver/dashboard']);
              break;
            case 'Customer':
              this.router.navigate(['/customer']);
              break;
            default:
              // this.router.navigate(['/auth/login']);
              break;
            }
            return false;
        } else {
          // this.router.navigate(['/auth/login']);
          return true;
        }
      }
      return true;
  }
}
