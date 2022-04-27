import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterOutlet } from '@angular/router';
import { MyContact } from '../models/myContacts';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service.';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading: boolean = false;
  public contact: MyContact = {} as MyContact;
  public errorMessage: string | null = null;
  group: MyGroup[] = [];
  constructor(private constservice: ContactService, private router: Router, private snackBar: MatSnackBar) {
    this.contact.groupId = '';
  }
  ngOnInit(): void {
    this.constservice.getAllGroups().subscribe((data: any) => {
      this.group = data;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    })

  }
  addSubmit() {
    // this.contact.createdTime = moment(1650109864075).format("MM/DD/YY HH:mm:ss");
    // console.log(this.contact)
    // return
    if (!this.constservice.ValidateFields(this.contact))
      return;
    this.contact.createdTime = new Date().getTime();
    this.constservice.CreateContact(this.contact).subscribe((data) => {
      this.snackBar.open('Successfully Created', 'ok', {
        duration: 2000,
      });
      this.router.navigate(['/contacts/admin']).then();
    }, (error) => {
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then()
    })
  }
}
