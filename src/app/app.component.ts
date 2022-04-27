import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { MessageService } from 'primeng-lts/api';


export interface Error {
  main: string;
  userid: string;
  password: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]

})

export class AppComponent implements OnInit {
  @ViewChild('op') op: OverlayPanel;
  @ViewChild('oq') oq: OverlayPanel;
  title = 'project';
  userid = '';
  password = '';
  loginName = '';

  usersDB = [
    { userid: 'abc@media.com', password: 'abc123', username: 'tom' },
    { userid: 'def@media.com', password: 'def123', username: 'dick' }
  ];
  error: Error;
  columnDefs: { field: string; }[];
  rowData: { make: string; model: string; price: number; }[];

  constructor(private route: Router, private messageService: MessageService) { 
    this.columnDefs = [{ field: "make" }, { field: "model" }, { field: "price" }];

    this.rowData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 }
    ];
  }

  ngOnInit(): void {
    this.loginName = localStorage.getItem('loginName') || '';
  }
  openExcelPage(){
    this.route.navigate(['/excel']);
  }
  openHomePage() {
    this.route.navigate(['/home']);
  }

  openAboutPage() {
    this.route.navigate(['/about']);
  }

  openGalleryPage() {
    this.route.navigate(['/gallery']);
  }

  validateUser() {
    this.error = {} as Error;

    if (this.userid === '') {
      this.error.userid = 'Userid is required.';
    }

    if (this.password === '') {
      this.error.password = 'Password is required.';
    }

    let invalid = true;
    for (const data of this.usersDB) {
      if ((this.userid !== '' && data.userid === this.userid) && (this.password !== '' && data.password === this.password)) {
        invalid = false;
      }
    }

    if (this.userid !== '' && this.password !== '') {

      if (invalid) {
        this.error.main = 'Invalid userid or password.';
      }
    }

    if (!(Object.keys(this.error).length)) {
      //  login successfull
      for (const i of this.usersDB) {
        if (i.userid === this.userid) {
          this.loginName = i.username;
          localStorage.setItem('loginName', this.loginName);
          this.op.hide();
         // this.messageService.add({ severity: 'success', summary: 'Logged In', detail: '' });
          this.messageService.add({ key: 'callback', severity: 'success', summary: 'Info', detail: 'Logdffged In' });
          return;
        }
      }
    }
  }

  logout() {
    this.loginName = '';
    localStorage.setItem('loginName', '');
    this.messageService.add({ severity: 'warn', summary: 'Logged Out', detail: '' });
    this.route.navigate(['/home']);
    this.oq.hide();
  }
}
