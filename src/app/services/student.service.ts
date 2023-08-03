import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    getaddstudentDetails(data:any){
        const url = `${this.endPoint}/student/create`;
        return this.http.post(url,data)

    }
}