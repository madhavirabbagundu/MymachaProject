import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import * as feather from "feather-icons";
import { DatePipe } from '@angular/common';

@Component({
    selector:'app-student-new',
    templateUrl:'./student-new.component.html',
    styleUrls:['./student-new.component.css']
})

export class StudentNewComponent implements OnInit {
   machaStudent! : FormGroup;
    // modelDispenser: any;
    messageService: any;
    mode: any;

    constructor(
        private modelDispenser : StudentService,
        private route: ActivatedRoute,
        private router: Router,
        public datepipe: DatePipe,
    
    ){
        this.mode = this.route.snapshot.paramMap.get('mode');
        // console.log(this.mode,"this.mode")
        if (this.mode === 'edit') {
            let applicantionNumber:any =  sessionStorage.getItem('applicationNumber');
            this.modelDispenser.getStudentById(JSON.parse(applicantionNumber)).subscribe(data => {
              this.loadFormValues(data);
            });
          }
    }
    ngOnInit(): void {
      this.createStudent();
      feather.replace();


    }
    createStudent():void{
        this.machaStudent = new FormGroup({
          studentGeneratedId:new FormControl(null),
            studentApplicationNumber : new FormControl(null,[Validators.required]),
            studentName : new FormControl(null,[Validators.required]),
            studentGender : new FormControl(null,[Validators.required]),
            studentDateOfBirth:new FormControl(null,[Validators.required]),
            studentAadhaarNumber:new FormControl(null,[Validators.required]),
            studentPhoneNumber:new FormControl(null),
            studentEmailAddress:new FormControl(null)

        })
    }
    loadFormValues(student:any){
        console.log(student,"Data");
        const dob = new Date(student.studentDateOfBirth!.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
        console.log(dob);
        student.studentDateOfBirth = this.datepipe.transform(dob, 'yyyy-MM-dd');
        console.log(student);
        this.machaStudent.patchValue(student);
      }
      validateNumber(event:any, type?:any): boolean {
        var inputData;
        if(!type) {
          inputData = event.key;
        } else  {
          let clipboardData = event.clipboardData;
          inputData = clipboardData.getData('text');
        }
        if(isNaN(inputData)) {
          return false;
        } else  {
          return true;
        } 
      }
      
    saveMachaStudent():void{
      
        console.log(this.machaStudent,"machastudent");
        this.modelDispenser.addstudentDetails(this.machaStudent.value).subscribe(machaStudent =>{
            console.log(machaStudent,"macha")
            this.createStudent();
            alert("Student Data is submitted")
            this.router.navigate([`student/list`]);

        },
        error => {
           alert("Server is not working") 
        })
    }
}