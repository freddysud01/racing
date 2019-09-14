import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { MemberInfo as Member } from '../models/memberInfo';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  memberId: number;
  teams = ["Ferrari", "Lamborghini", "Bentley"];

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router,
    private routeParams: ActivatedRoute) { }

  ngOnInit() {
    //check for login
    if(localStorage.getItem("userInfo") ==undefined)
    {
      this.router.navigate(['/login']);
    }   
    
    
    this.memberForm = this.fb.group({
      first: new FormControl('', Validators.required),
      last: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      racingTeam: new FormControl('', Validators.required),
      isActive: new FormControl('', Validators.required)
    });


    this.routeParams.params.subscribe(p => {
      this.memberId = p["memberId"];      
      if (this.memberId != undefined) {      
      this.memberModel= this.appService.CurrentMembers.filter(f=>f.memberId==this.memberId )[0];        
      
         this.memberForm.setValue({
          first: this.memberModel.first,
          last:this.memberModel.last ,
          jobTitle: this.memberModel.jobTitle,
          racingTeam:this.memberModel.racingTeam ,
          isActive:this.memberModel.isActive
        });
      
    }     
    })
 
  }

  ngOnChanges() { }

  // TODO: Add member to members
  onSubmit(form: Member) {
    
    if(this.memberModel==undefined)
    {
      let id: number = 0;
      this.memberModel = form;
      if (this.appService.CurrentMembers.length > 0) {
        id = this.appService.CurrentMembers[this.appService.CurrentMembers.length - 1].memberId + 1;
      }
      this.memberModel.memberId = id;
      this.appService.CurrentMembers.push(this.memberModel);
    }
    else
    {
let indexToUpdate: number =  this.appService.CurrentMembers.findIndex(a=>a.memberId==this.memberId)
console.log(form);
this.appService.CurrentMembers[indexToUpdate]=form;
this.appService.CurrentMembers[indexToUpdate].memberId=this.memberId;
    }
    
    
    
    console.log(this.memberModel);
    this.router.navigateByUrl('/members');

  }
}
