import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import {MemberInfo} from '../models/memberInfo';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members:Array<MemberInfo>= [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.appService.getMembers().subscribe(members => (this.members = members));
  }

  goToAddMemberForm() {
    //check for login
    if(localStorage.getItem("userInfo") ==undefined)
    {
      this.router.navigate(['/login']);
    }  
    this.router.navigateByUrl('/memberInfo');
  }

  logout() {
    localStorage.removeItem("userInfo");
    this.router.navigate(['/login']);
  }
  editMemberByID(id: number) {
    this.router.navigateByUrl(`/memberInfo/${id}`);
  }

  deleteMemberById(id: number) {    
    this.appService.CurrentMembers = this.appService.CurrentMembers.filter(x=>x.memberId!=id);
    console.log(id,this.appService.CurrentMembers);
    this.members=this.appService.CurrentMembers;
  }
}
