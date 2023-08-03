import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentNewComponent } from './student-form/student-new.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StudentService } from './services/student.service';
import { ReactiveFormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StudentNewComponent,


  ],
  imports: [
    BrowserModule,
    // NgbModule,
    AppRoutingModule,
    DatePipe,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          path:"student/form",
          component:StudentNewComponent,
          pathMatch:"full"
        }
      ]
    )
  ],
  providers: [StudentService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
