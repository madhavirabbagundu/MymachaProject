import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
// import 'datatables.net';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../services/student.service';
import * as feather from "feather-icons";
import { ActivatedRoute, Data, Router } from '@angular/router';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList: any;
  mode: any;
    result: any;
  items: any;
  searchTerm: string = '';
  selectedRowIndex: number = -1;
  applicantInfo:any;
  applicantId: any;
  selectedRoute: any;
  
  constructor(
    private studentdata:StudentService,
    private route: ActivatedRoute,
    // private messageService: SnackBarService,
    private router: Router,
  ){
    this.mode = this.route.snapshot.paramMap.get('mode');
    console.log(this.mode,"this.mode")
  }
  ngOnInit(): void {
    this.getAllStudents();  
   this.selectedRoute = ""; 
    feather.replace();
  }

  
  getAllStudents(){
    this.studentdata.getAllStudents().subscribe((data)=>{
      console.log(data,"data")
      this.items = data;
      this.studentList = data;
      // console.log(data,"data")

      // $(document).ready(function() {
      //   console.log("DOCUEMNT")
      //   $('#example').DataTable();
      // });
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

  // onStudentDetails(student:any,mode:any){
  //   console.log(student,mode,"studentdata")
  //   this.router.navigate([`/student/edit/form`]);
  // }

  onStudentDelete(index:any){
    const deletedStudentData = this.studentList[index]
    console.log("delete",deletedStudentData)
   
        this.studentdata.softDeleteByStudentId(deletedStudentData).subscribe(response=>{
       alert("Student Data Deleted!!")

            this.getAllStudents();
          // console.log("this is the delete",this.interviewView);

        },
        error=>{
         alert("Student Data is not deleted")
        }
        )
      
    // })
  }
  navigateTo(event: any) {
    this.selectedRoute = event.target.value;
    // console.log(this.selectedRoute,"route")
    if(this.selectedRoute === 'homevisitProfile'){
      sessionStorage.setItem("applicantData",JSON.stringify(this.applicantInfo))
      sessionStorage.setItem("applicationNumber",this.applicantId)
      this.router.navigate([`homevisit/profile`]);
    }
    // this.router.navigate([selectedRoute]);
  }
  // onhomevisitClick(){
  //   console.log(this.selectedRoute,"route")
  //   if(this.selectedRoute === 'homevisitProfile'){
  //     console.log(this.selectedRoute,"route")

  //     // sessionStorage.setItem("applicantData",JSON.stringify(this.applicantInfo))
  //     // sessionStorage.setItem("applicantNumber",JSON.stringify(this.applicantId))
  //   }
  // }
  convertToLocalDateTime(lchgDate: string) {
    const timestamp = new Date(lchgDate);
    const dateObj = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Asia/Kolkata',
    };
    lchgDate = dateObj.toLocaleString('en-IN', options);
    return lchgDate;
  }

  studentDetails(student:any,mode:any){
    console.log(student,"studentdata")
   sessionStorage.setItem('applicationNumber',JSON.stringify(student));

    console.log(mode)
    if(mode === 'edit'){
   
      this.router.navigate([`/student/edit/form`]);
    }
    else if(mode === 'view'){
      this.router.navigate([`/student/profile`]);

      


    }
  }

  clickTableRow(index: number,studentData:any): void {
    console.log(studentData,"row")
    this.selectedRowIndex = index;
    this.applicantId = studentData.studentApplicationNumber;
    console.log(this.applicantId,"id")
    this.applicantInfo = {
      applicantId : studentData.studentApplicationNumber,
      applicantName : studentData.studentName,
    };
    console.log(this.applicantInfo,"info")

  }
  
 
  
}
