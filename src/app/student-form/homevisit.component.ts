import {Component,OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector:'app-homevisit',
    templateUrl:'./homevisit.component.html',
    styleUrls:['./homevisit.component.css']
})

export class HomevisitComponent implements OnInit{

   homevisitData! : FormGroup;

   constructor(
    private route:ActivatedRoute,
    private router: Router,

   )
   {
    
   }




    ngOnInit(): void {
        throw new Error('Method not implemented.')
    }
    
}