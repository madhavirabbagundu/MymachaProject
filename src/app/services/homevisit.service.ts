import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";

@Injectable({
providedIn:"root"

})
export class HomevisitService {
endpoint :any;

constructor(
    private http : HttpClient,

){
    this.endpoint = environment.APIEndPoint;
}

addhomevisitDetails(data:any){
    const url = `${this.endpoint}/homevisit/posthomevisit`;
    return this.http.post(url,data)

}
getHomevisit(){
    const url = `${this.endpoint}/homevisit/gethomevisit`;
    // console.log(url,"url")
    return this.http.get(url);
  }

  softDeleteByapplicationId(data:any):Observable<any>{
    const url = `${this.endpoint}/homevisit/del`
    return this.http.put(url,data);
  }
  getApplicationNumber(applicationNumber:any){
    const url = `${this.endpoint}/homevisit/getting/${applicationNumber}`
    return this.http.get(url); 
}
}