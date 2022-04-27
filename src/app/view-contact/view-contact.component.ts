import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyContact } from '../models/myContacts';
import { MyGroup } from '../models/myGroup';
import 'moment-timezone';
import * as moment from 'moment';
import { ContactService } from '../services/contact.service.';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewComponent implements OnInit {
  public contactId:string | null = null;
  public contact : MyContact = {} as MyContact
  public errorMessage:string|null = null;
  public group :MyGroup = {} as MyGroup
  loading: boolean = false;
  constructor(private activatedRoute:ActivatedRoute,private conctservice:ContactService) 
  { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(res => {
      console.log(res);
      this.contactId = res.get('contactId')
    })
    if(this.contactId){
      this.loading = true;
    this.conctservice.getContact(this.contactId).subscribe((res:MyContact) => {
      this.contact = res;
      this.contact.createdTime = moment(this.contact.createdTime).format("MM/DD/YY HH:mm:ss");
      this.loading = false;
      this.conctservice.getGroup(res).subscribe((data:MyGroup) => {
        this.group = data;
        console.log(this.group)
      })
    },(error)=>{
      this.errorMessage = error;
      this.loading = false;
    })
  }
 
  }
  public isNotEmpty(){
    return Object.keys(this.contact).length >0 && Object.keys(this.group).length >0  
  }

}
