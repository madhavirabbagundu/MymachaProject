import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import * as feather from "feather-icons";

@Component({
    selector:'app-student-new',
    templateUrl:'./student-new.component.html',
    styleUrls:['./student-new.component.css']
})

export class StudentNewComponent implements OnInit {
   machaStudent! : FormGroup;
    // modelDispenser: any;
    messageService: any;
    constructor(
        private modelDispenser : StudentService,

    ){
        
    }
    ngOnInit(): void {
      this.createStudent();
      feather.replace();


    }
    createStudent():void{
        this.machaStudent = new FormGroup({
            studentApplicationNumber : new FormControl(null,[]),
            studentName : new FormControl(null,[]),
            studentGender : new FormControl(null,[]),
            studentDateOfBirth:new FormControl(null,[]),
            studentAadhaarNumber:new FormControl(null,[]),
            studentPhoneNumber:new FormControl(null,[]),
            studentEmailAddress:new FormControl(null,[])

        })
    }
    saveMachaStudent():void{
    //     let machaStudent = JSON.stringify({

        
    //     // console.log(this.machaStudent.value)
    //     studentApplicationNumber:this.machaStudent.get("studentApplicationNumber")?.value,
    //     studentName:this.machaStudent.get("studentName")?.value,
    //     studentGender:this.machaStudent.get("studentGender")?.value,
    //     studentDateOfBirth:this.machaStudent.get("studentDateOfBirth")?.value,
    //     studentAadhaarNumber:this.machaStudent.get("studentAadhaarNumber")?.value,
    //     studentEmailAddress:this.machaStudent.get("studentEmailAddress")?.value,
    //     studentPhoneNumber:this.machaStudent.get("studentPhoneNumber")?.value

        
    // })
        console.log(this.machaStudent,"machastudent");
        this.modelDispenser.addstudentDetails(this.machaStudent.value).subscribe(machaStudent =>{
            console.log(machaStudent)
            this.createStudent();
            alert("data is submitted")
        },
        error => {
           alert("Server is not working") 
        })
    }
}