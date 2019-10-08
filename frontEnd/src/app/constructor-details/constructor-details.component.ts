import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstructorService } from '../constructor.service';
import { AuthService } from '../auth.service';
import { Builder } from '../../../node_modules/protractor';


@Component({
  selector: 'app-constructor-details',
  templateUrl: './constructor-details.component.html',
  styleUrls: ['./constructor-details.component.css']
})
export class ConstructorDetailsComponent implements OnInit {

  builder= {};
  bdate;

  //date = new Date();

  constructor(
    private constructorService: ConstructorService,
    public authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
) {
  }

  getConstructorDetails(id){
    this.constructorService.getConstructorsByID(id)
      .subscribe(data => {
        this.builder = data;
        console.log(data);
        this.bdate= data['birthday'];
        console.log('birthdate ' +this.bdate);
      });
  }

  ngOnInit() {
    this.getConstructorDetails(this.activatedRoute.snapshot.params['id']);
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/logIn']);
    console.log('logOut');
  }


}
