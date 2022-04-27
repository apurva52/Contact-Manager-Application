import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from '../models/myContacts';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service.';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  public loading :boolean = false;
  public contactId:string | null = null;
  public contact:MyContact = {} as MyContact;
  public errorMessage:string|null = null;
  public group:MyGroup[]=[] as MyGroup[]
  constructor(private constservice:ContactService,private router:Router,private activatedRoute:ActivatedRoute, private snackBar: MatSnackBar){

  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(res => {
      console.log(res);
      this.contactId = res.get('contactId')
    })
    if(this.contactId){
      this.constservice.getContact(this.contactId).subscribe((data:MyContact)=>{
        this.contact = data;
      },(error)=>{
        this.errorMessage = error;
        this.loading = false;
      })
    this.constservice.getAllGroups().subscribe((data:any)=>{
this.group = data;
    },(error)=>{
      this.errorMessage = error;
      this.loading = false;
    })
  }
  }


  UpdateContact(){
    if(!this.constservice.ValidateFields(this.contact))
    return ;
    this.constservice.UpdateContact(this.contact,this.contactId).subscribe((data)=>{
      this.snackBar.open('Updated Successfully', 'ok', {
        duration: 2000,
      });
this.router.navigate(['/contacts/admin']).then();
    },(error)=>{
      this.errorMessage = error;
      this.router.navigate([`/contacts/edit/${this.contactId}`]).then()
    })
  }
}
