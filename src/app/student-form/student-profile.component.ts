import { Component ,OnInit} from '@angular/core'
import { StudentService } from '../services/student.service';
import * as feather from 'feather-icons';


@Component({
    selector:'app-student-profile',
    templateUrl:'./student-profile.component.html',
    styleUrls:['./student-profile.component.css']

})

export class StudentProfileComponent implements OnInit{
    studentDetailsProfile: any;
    profile:any;
    studentData: any;
    profileData: any;

   constructor(
    private studentdata: StudentService,

   )
     {
       this.studentDatadisplay();

    }
    studentDatadisplay(){
        this.studentDetailsProfile = sessionStorage.getItem('applicationNumber');
        this.profile = JSON.parse(this.studentDetailsProfile)
        console.log((this.profile),"details")
       
    }
   
    ngOnInit(): void {
        feather.replace();

}
}