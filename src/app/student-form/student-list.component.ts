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
  constructor(
    private studentModel:StudentService,
    private route: ActivatedRoute,
    // private messageService: SnackBarService,
    private router: Router,
  ){
    this.mode = this.route.snapshot.paramMap.get('mode');
    console.log(this.mode,"this.mode")
  }
  ngOnInit(): void {
    this.getAllStudents();   
    feather.replace();
  }

  
  getAllStudents(){
    this.studentModel.getAllStudents().subscribe((data)=>{
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

  onStudentDetails(student:any,mode:any){
    console.log(student,mode,"studentdata")
    sessionStorage.setItem('applicationNumber',student);
    this.router.navigate([`/student/edit/form`]);
  }

  onStudentDelete(index:any){
    const deletedStudentData = this.studentList[index]
    console.log("delete",deletedStudentData)
   
        this.studentModel.softDeleteByStudentId(deletedStudentData).subscribe(response=>{
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
  // search(){
  //   console.log();

  //   if (!this.searchTerm) {
  //     this.studentList = []; // Clear results when search term is empty
  //     return;
  //   }
  
  //   // Example: Filtering based on an array of items
  //   this.studentList = this.items.filter((item: { name: string; }) =>
  //     item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  
  // }
  
}
