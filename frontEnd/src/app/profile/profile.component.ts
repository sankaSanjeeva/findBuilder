import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { ConstructorService } from '../constructor.service'
import { MatSnackBar } from '@angular/material';
import { decode } from '../../../node_modules/@angular/router/src/url_tree';

import { User } from '../_models/user'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:Object;
  currentUser: User;
  userFromApi: User;


  details = {};
  nic = null;
  selectedFile = null;
  progress = null;
  uploadBtnClose = false;
  imgUrl = '../../../../backEnd/uploads/profilePic/' + this.nic;

  constructor(
    public authService: AuthService,
    private router: Router,
    private constructorService: ConstructorService,
    private snackBar: MatSnackBar,
  ) {
    this.currentUser = authService.currentUserValue;
  }

  ngOnInit() {
    this.constructorService.getConstructorsByID(this.currentUser.id).subscribe(data => {
      this.details = data;
      this.nic = data['nic'];
    })
  }

  editProfile(){
    this.router.navigate([`/profile/edit/${this.currentUser.id}`]);
  }

  onFileSelected(event) {
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile != null) {
      const formData = new FormData();
      formData.append('nic', this.nic);
      formData.append('file', this.selectedFile);
      this.constructorService.upload(formData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(this.progress);
        } else if (event.type === HttpEventType.Response) {
          if (event.status === 200) {
            this.snackBar.open('Upload Successfully', 'OK', {
              duration: 3000
            });
          }
        }
      });
    }
    this.uploadBtnClose = true;
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['logIn']);
  }

}
