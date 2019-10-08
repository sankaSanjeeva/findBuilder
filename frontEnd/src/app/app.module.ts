import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule} from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MatSortModule, MatExpansionModule, MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatRadioModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatListModule, MatSidenavModule, MatTabsModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatDividerModule } from '@angular/material';
import { MatFileUploadModule } from 'angular-material-fileupload';

// Components
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CategoryComponent } from './category/category.component';
import { LogInComponent } from './log-in/log-in.component';
import { ConstructorDetailsComponent } from './constructor-details/constructor-details.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { EditComponent } from './edit/edit.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';


// services
import {ConstructorService} from './constructor.service';
import {AuthService} from './auth.service';

// guard

const routes: Routes = [
  {path:'home', component: HomeComponent},   //{path:'home', component: HomeComponent, pathMatch: 'full' , canActivate: [AuthGuard]},
  {path:'about', component: AboutComponent},
  {path:'category', component: CategoryComponent},
  {path:'register', component: RegisterComponent},
  {path:'logIn', component: LogInComponent},
  {path:'profile', component: ProfileComponent},
  {path:'admin', component: AdminComponent},
  {path:'category/details/:id', component: ConstructorDetailsComponent},
  {path:'admin/edit/:id', component: EditComponent},
  {path:'profile/edit/:id', component: ProfileEditComponent},
  {path:'**',redirectTo:'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    AboutComponent,
    CategoryComponent,
    LogInComponent,
    ConstructorDetailsComponent,
    ProfileComponent,
    AdminComponent,
    EditComponent,
    ProfileEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlashMessagesModule.forRoot(),
    MatSnackBarModule,
    MatSortModule,
    MatExpansionModule,
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatFileUploadModule,    
  ],
  providers: [AuthService, ConstructorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
