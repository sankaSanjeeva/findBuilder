import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Builder } from '../constructor.model';

import { ConstructorService } from "../constructor.service";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  state = false;

  // Responsive Navigation 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructors: Builder[];
  displayedColumns = ['profilePic', 'first', 'distric', 'city', 'actions'];

  constructor(
    private constructorService: ConstructorService,
    private authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.fetchRegisteredConstructors(this.state);
  }

  /* fetchConstructors(){
    this.constructorService
    .getConstructors()
    .subscribe((data: Builder[]) => {
      this.constructors = data;
      console.log('Data requested...');
      console.log(this.constructors);
    });
  } */
  fetchRegisteredConstructors(state){
    this.constructorService
    .getRegisteredConstructors(state)
    .subscribe((data: Builder[]) => {
      this.constructors = data;
      console.log(state +'s data requested...');
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

  editConstructor(id){
    this.router.navigate([`/admin/edit/${id}`])
  }

  deleteConstructor(id){
    this.constructorService.deleteConstructor(id).subscribe(() =>{
      this.router.navigate(['/admin']);
    })
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/logIn']);
    console.log('logOut');
  }
}
