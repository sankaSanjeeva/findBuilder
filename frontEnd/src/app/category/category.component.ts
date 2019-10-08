import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Builder } from '../constructor.model';
import { ConstructorService } from "../constructor.service";
import { AuthService } from '../auth.service';
import { ThrowStmt } from '../../../node_modules/@angular/compiler';
import { state } from '../../../node_modules/@angular/animations';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  state = true;

  // Responsive Navigation 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructors: Builder[];
  displayedColumns = ['profilePic', 'first', 'distric', 'city'];

  constructor(
    private constructorService: ConstructorService,
    public authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver ) { }

  ngOnInit() {
    this.fetchConstructors(this.state);
  }

  fetchConstructors(state){
    this.constructorService
    .getRegisteredConstructors(state)
    .subscribe((data: Builder[]) => {
      this.constructors = data;
      console.log('Data requested...');
      console.log(this.constructors);
    });
  }

  fetchConstructorsBycType(type){
    this.constructorService
    .getConstructorsBycType(type)
    .subscribe((data: Builder[]) => {
      this.constructors = data;
      console.log(type +'s data requested...');
      console.log(this.constructors);
    });
  }

  fetchConstructorsByDistric(distric){
    this.constructorService
    .getConstructorsByDistric(distric)
    .subscribe((data: Builder[]) => {
      this.constructors = data;
      console.log('Data requested...');
      console.log(this.constructors);
    });
  }

  fetchConstructorsByGender(gender){
    this.constructorService
    .getConstructorsByGender(gender)
    .subscribe((data: Builder[]) => {
      this.constructors = data;
      console.log('Data requested...');
      console.log(this.constructors);
    });
  }

  searchConstructorByName(name){
    this.constructorService
    .searchConstructorByName(name)
    .subscribe((data: Builder[]) => {
      this.constructors = data;
      console.log('Data searched by fName');
      console.log(this.constructors);
    });
  }

  searchConstructorByCity(city){
    this.constructorService
    .searchConstructorByCity (city)
    .subscribe((data: Builder[]) => {
      this.constructors = data;
      console.log('Data searched by fName');
      console.log(this.constructors);
    });
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/logIn']);
    console.log('logOut');
  }

}
