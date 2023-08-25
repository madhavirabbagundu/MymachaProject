import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/app/environments/environment';
// import { environment } from '../environtments/environment';

@Injectable({
    providedIn:'root'

})
export class StudentService {
    endPoint :any;
    constructor(
        private http : HttpClient,
    ){
       this.endPoint = environment.APIEndPoint;
    }
    addstudentDetails(data:any){
        const url = `${this.endPoint}/student/create`;
        return this.http.post(url,data)

    }
    getAllStudents(){
        const url = `${this.endPoint}/student/get`;
        return this.http.get(url);
      }
      getStudentById(studentApplicationNumber:any){
        const url = `${this.endPoint}/student/get/${studentApplicationNumber}`;
        console.log(url)
        return this.http.get(url);
      }
      softDeleteByStudentId(data:any):Observable<any>{
        const url = `${this.endPoint}/student/del`;
        return this.http.put(url,data)
      }
}