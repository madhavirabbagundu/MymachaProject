import {Component,OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { HomevisitService } from '../services/homevisit.service';
import * as feather from 'feather-icons';


@Component({
    selector:'app-homevisit',
    templateUrl:'./homevisit.component.html',
    styleUrls:['./homevisit.component.css']
})

export class HomevisitComponent implements OnInit{

   homevisitData! : FormGroup;
    mode: any;

   constructor(
    private route:ActivatedRoute,
    private homevisitable : HomevisitService,
    private router: Router,

   )
   {
    this.mode = this.route.snapshot.paramMap.get('mode');
    console.log(this.mode,"this.mode")
    if (this.mode === 'edit') {
        let applicantionDetails:any =  sessionStorage.getItem('homevisitData');
        this.homevisitable.getApplicationNumber(JSON.parse(applicantionDetails)).subscribe(data => {
          this.homevisitValues(data);

        });
      }
   }

   createhomevistit():void{
    this.homevisitData = new FormGroup({
        id:new FormControl(null),
        applicationNumber:new FormControl(null),
        applicantName : new FormControl(null),
        applicantFathersName : new FormControl(null),
        applicantMothersName : new FormControl(null),
        gender:new FormControl(null),
        nationality:new FormControl(null),
        village: new FormControl(null)
    })
   }


    ngOnInit(): void {
      this.createhomevistit();
      feather.replace();
    }
    homevisitValues(homevisit:any){
        console.log(homevisit,"homevisit")

        this.homevisitData.patchValue(homevisit);
    }
    saveHomevisit():void{
        console.log(this.homevisitData.value,"homevisitData")
        this.homevisitable.addhomevisitDetails(this.homevisitData.value).subscribe(homevisitData => {
            console.log(homevisitData,"data")
            this.createhomevistit();
            alert("homevisit data submitted")
            this.router.navigate([`homevisit/list`]);

        },
        error => {
            alert("server is not working")
        }
        )
    }
   
    
}