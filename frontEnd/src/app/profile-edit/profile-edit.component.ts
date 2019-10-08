import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { ConstructorService } from '../constructor.service'

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  id: String;
  builder: any = {};
  updateForm: FormGroup;
  districs: String[] = ['Ampara', 'Anuradapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Killinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'];
  cTypes: String[] = ['Architect', 'Carpenter', 'Consultant', 'Civil Engineer', 'Electrician', 'Gardner', 'Helper', 'Meson', 'Landscaper', 'Painter', 'Plumber', 'Surveyor', 'Steel Worker', 'Transporter', 'Valuer'];

  constructor(
    private constructorService: ConstructorService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm(){
    this.updateForm = this.fb.group({
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      line3: ['', Validators.required],
      city: ['', Validators.required],
      distric: ['', Validators.required],
      email: '',
      phone: ['', Validators.required],
      cType: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.constructorService.getConstructorsByID(this.id).subscribe(res => {
        this.builder = res;
        this.updateForm.get('line1').setValue(this.builder.line1);
        this.updateForm.get('line2').setValue(this.builder.line2);
        this.updateForm.get('line3').setValue(this.builder.line3);
        this.updateForm.get('city').setValue(this.builder.city);
        this.updateForm.get('distric').setValue(this.builder.distric);
        this.updateForm.get('email').setValue(this.builder.email);
        this.updateForm.get('phone').setValue(this.builder.phone);
        this.updateForm.get('cType').setValue(this.builder.cType);
      });
    });
  }

  updateConstructor(line1, line2, line3, city, distric, email, phone, cType){
    this.constructorService.updateConstructor(this.id, this.builder.fName, this.builder.mName, this.builder.lName, line1, line2, line3, city, distric, this.builder.birthday, this.builder.gender, this.builder.nic, email, phone, cType).subscribe(() =>{
      this.snackBar.open('Update Successfully', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/profile']);
    });
  }

}
