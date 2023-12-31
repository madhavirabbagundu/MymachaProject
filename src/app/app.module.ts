import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentNewComponent } from './student-form/student-new.component';
import { StudentListComponent } from './student-form/student-list.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StudentService } from './services/student.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomevisitComponent } from './student-form/homevisit.component';
import { HomevisitListComponent } from './student-form/homevisit-list.component';
import { SearchPipe } from './search.pipe';
import { StudentProfileComponent } from './student-form/student-profile.component'
import { HomevisitProfileComponent } from "./student-form/homevisit-profile.component"
// import { MatDialogModule } from "@angular/material/dialog";
// import { MatButtonModule } from "@angular/material/button";
// import { HomevisitListComponent } from './student-form/homevisit-list.component'
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StudentNewComponent,
    StudentListComponent,
    HomevisitComponent,
    HomevisitListComponent,
    // FormsModule,
    SearchPipe,
    StudentProfileComponent,
    HomevisitProfileComponent

  ],
  imports: [
    BrowserModule,
    // NgbModule,
    AppRoutingModule,
    // MatDialogModule,
    // MatButtonModule,
    DatePipe,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          path:"student/:mode/form",
          component:StudentNewComponent,
          pathMatch:"full"
        },
        {
          path:"student/list",
          component:StudentListComponent,
          pathMatch:"full"
        },
        {
          path:"homevisit/:mode/form",
          component:HomevisitComponent,
          pathMatch:"full"
        },
        {
        path:"homevisit/list",
        component:HomevisitListComponent,
        pathMatch:"full"
        },
        {
        path:"student/profile",
        component:StudentProfileComponent,
        pathMatch:"full"
        },
        {
          path:"homevisit/profile",
          component:HomevisitProfileComponent,
          pathMatch:"full"
        }
      ]
    )
  ],
  providers: [StudentService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
