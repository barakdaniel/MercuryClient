import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isAuth = authService.isLoggedIn();
  }

  ngOnInit(): void { }

  onLogoClick() {
    this.router.navigate([''])
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
