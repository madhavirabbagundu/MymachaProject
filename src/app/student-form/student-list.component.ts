import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
// import 'datatables.net';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../services/student.service';
import * as feather from "feather-icons";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList: any;
  mode: any;
    result: any;
  constructor(
    private modelDispenser:StudentService,
    private route: ActivatedRoute,
    // private messageService: SnackBarService,
    private router: Router,
  ){
    this.mode = this.route.snapshot.paramMap.get('mode');
  }
  ngOnInit(): void {
    this.getAllStudents();   
    feather.replace();
  }

  
  getAllStudents(){
    this.modelDispenser.getAllStudents().subscribe((data)=>{
      this.studentList = data;
    //   $(document).ready(function() {
    //     console.log("DOCUEMNT")
    //     $('#example').DataTable();
    //   });
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

  onStudentDetails(student:any,mode:any){
    console.log(student,mode,"studentMode")
    sessionStorage.setItem('applicationNumber',student);
    this.router.navigate([`/student/form`]);
  }

  onStudentDelete(index:any){
    const deletedStudentData = this.studentList[index]
    console.log("delete",deletedStudentData)
   
        this.modelDispenser.softDeleteByStudentId(deletedStudentData).subscribe(response=>{
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
  
}
