import { Component ,OnInit} from '@angular/core'
import * as feather from 'feather-icons';
import { HomevisitService } from '../services/homevisit.service';


@Component({
    selector:'app-homevisit-profile',
    templateUrl:'./homevisit-profile.component.html',
    styleUrls:['./homevisit-profile.component.css']

})

export class HomevisitProfileComponent implements OnInit{
    homevisiteProfile: any;
    profile:any;
    studentData: any;
    profileData: any;
    homevisitData: any;
    applicantId: any;
    router: any;

   constructor(
    private homevisitable: HomevisitService,

   )
     {
       this.loadStudentData();
    }
    // homevisiteDatadisplay(){
    //     this.homevisiteProfile = sessionStorage.getItem('applicantData');
    //     this.profile = JSON.parse(this.homevisiteProfile)
    //     console.log((this.profile.applicantId),"details")
        loadStudentData(){
        let applicantionNumber:any =  sessionStorage.getItem('applicationNumber');
            console.log(applicantionNumber,"app")
            this.studentData = sessionStorage.getItem("applicantData");
            this.profile = JSON.parse(this.studentData);
            this.homevisitable.getApplicationNumber(JSON.parse(applicantionNumber)).subscribe(data => {
                console.log(data,"data")
              this.homevisitData = data;
            });

       
    }
    close(){console.log("close")
        this.router.navigate([`student/list`]);
        sessionStorage.removeItem('applicationNumber');
      }
   
    ngOnInit(): void {
        feather.replace();

}
}