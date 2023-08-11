import { Component , OnInit } from '@angular/core';
import { HomevisitService } from '../services/homevisit.service';
import * as feather from 'feather-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector:'app-homevisit-list',
    templateUrl:'./homevisit-list.component.html',
    styleUrls:['./homevisit-list.component.css']
})

export class HomevisitListComponent implements OnInit{
homevisitList!: any;
    mode: any;


constructor(
    private homevisitable: HomevisitService,
    private route: ActivatedRoute,
    private router: Router,

){
    this.mode = this.route.snapshot.paramMap.get('mode');
    console.log(this.mode,"this.mode")
}


    ngOnInit(): void {
   this.getHomevisit();
   feather.replace();

    }
    getHomevisit(){
        this.homevisitable.getHomevisit().subscribe((details)=>{
          console.log(details,"details")
            this.homevisitList = details;
        },
        (error) => {
            if (error !== undefined && error.status === 404) {
              alert("Fetching data issue");
            } else if (error !== undefined && error.status === 400) {
              const meesgae: any = JSON.stringify(error.error);
              alert(meesgae.replaceAll('{', '').replaceAll('}', '').replaceAll('"', '').replaceAll(',', '\n'));
            } else {
              alert("Server did not respond")
            }}); 
        
    }
    onHomevistDelete(index:any){
        const deletedStudentData = this.homevisitList[index]
        console.log("delete",deletedStudentData)
       
            this.homevisitable.softDeleteByapplicationId(deletedStudentData).subscribe(response=>{
           alert("Student Data Deleted!!")
    
                this.getHomevisit();
              // console.log("this is the delete",this.interviewView);
    
            },
            error=>{
             alert("homevisit Data is not deleted")
            }
            )
          
        // })
      }
      onHomevisitDetails(homevisit:any,mode:any){
        console.log(homevisit,mode,"edit")
        sessionStorage.setItem("homevisitData",homevisit);
        this.router.navigate([`homevisit/edit/form`])

      }

}