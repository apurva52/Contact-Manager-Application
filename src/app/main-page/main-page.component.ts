import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { MyContact } from '../models/myContacts';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service.';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public loading :boolean = false;
  public contact:MyContact = {} as MyContact;
  public errorMessage:string|null = null;
  group:MyGroup[] = [];
  constructor(private constservice:ContactService,private router:Router, private snackBar: MatSnackBar){
this.contact.groupId = '';
  }
  ngOnInit(): void {
    this.constservice.getAllGroups().subscribe((data:any)=>{
this.group = data;
    },(error)=>{
      this.errorMessage = error;
      this.loading = false;
    })
    
  }
  addSubmit(){
    if(!this.constservice.ValidateFields(this.contact))
    return ;
    this.constservice.CreateContact(this.contact).subscribe((data)=>{
      this.snackBar.open('Successfully Created', 'ok', {
        duration: 2000,
      });
this.router.navigate(['/contacts/admin']).then();
    },(error)=>{
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then()
    })
  }
}
