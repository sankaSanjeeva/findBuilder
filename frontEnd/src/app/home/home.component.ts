import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: any;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/logIn']);
    console.log('logOut');
  }

}