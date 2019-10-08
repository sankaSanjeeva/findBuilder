import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../auth.service';
import { state } from '../../../node_modules/@angular/animations';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errMsg: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private snackBar: MatSnackBar,
  ) { 
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/profile']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              if(data.state){
                if(data.nic == '941260403v'){
                  this.router.navigate(['/admin']);
                }else{
                  this.router.navigate([this.returnUrl]);
                }
              }
              else{
                this.snackBar.open(data.msg, 'OK', {
                  duration: 3000
                });
              }
            },
            error => {
                this.error = error;
                this.loading = false;
            }
        );

        
  }
}

/* export class LogInComponent implements OnInit {

    nic: String;
    password: String;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // reset login status
    this.authService.logOut();
  }

  loginUser(){
    const user = {
      nic: this.nic,
      password: this.password

    }

    this.authService.loginUser(user).subscribe(data => {
      console.log(data['msg']);
      if(data["state"]){
        this.authService.storeUserData(data["token"], data["constructor"]);
        this.router.navigate(['profile']);
      }else {
        this.router.navigate(['logIn']);
      }
    });

  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/logIn']);
    console.log('logOut');
  }

} */