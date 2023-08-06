import { NgModule } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';
// import { MatDialogModule } from "@angular/material/dialog";
// import { MatButtonModule } from "@angular/material/button";

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StudentNewComponent,
    StudentListComponent

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
        }
      ]
    )
  ],
  providers: [StudentService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
