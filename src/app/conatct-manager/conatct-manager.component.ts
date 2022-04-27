import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyContact } from '../models/myContacts';
import { ContactService } from '../services/contact.service.';
//import {MessageService} from 'primeng-lts/messages'

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactsManagerComponent implements OnInit {
  public contacts: MyContact[] = []
  copy_data: MyContact[] = []
  search: string | null = null;
  loading: boolean = false;
  public errorMessage: string | null = null;
  constructor(public cantService: ContactService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllContacts()
  }
  getAllContacts() {
    this.loading = true;
    this.cantService.getAllContacts().subscribe((data: any) => {
      this.contacts = data;
      this.copy_data = [...this.contacts]
      this.loading = false;
      console.log(this.contacts)

    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    })
  }
  deleteContact(cid: string) {
    if (cid)
      this.cantService.DeleteContact(cid).subscribe(res => {
        this.snackBar.open('Deleted Successfully', 'ok', {
          duration: 2000,
        });
        this.getAllContacts();
      }, (error) => {
        this.errorMessage = error;
      })
  }
  keyup() :void{
    console.log("errer");
    this.contacts = this.copy_data.filter(res => {
      if (res.name.includes(this.search.charAt(0).toUpperCase() + this.search.slice(1)))
        return true
      else if (res.name.includes(this.search.charAt(0).toLocaleLowerCase() + this.search.slice(1)))
        return true
      else if (res.name.includes(this.search)) {
        return res.name.includes(this.search)
      }
    })
  }
}
