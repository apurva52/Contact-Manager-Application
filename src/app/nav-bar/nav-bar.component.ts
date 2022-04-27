import { Component, OnInit, ViewChild,AfterViewInit, Renderer2, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng-lts/api';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { MyContact,credentials } from '../models/myContacts';
import { MessageService } from 'primeng-lts/api';
export interface Error {
  main: string;
  userid: string;
  password: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
})
export class NavBarComponent implements OnInit,AfterViewInit {
  items: MenuItem[];
  @ViewChild('op') op: OverlayPanel;
  @ViewChild('oq') oq: OverlayPanel;
  error: Error;
  userid :string= '';
  positionLeft = '1204.84px !important'; 
positionTop = '20px';
marginStyle = { 'left': this.positionLeft , 'margin-top': this.positionTop };
  loginName :string= '';
  password :string = '';
  panel:boolean = false;
  constructor(private router:Router,private messageService: MessageService,private renderer: Renderer2) {
    this.items = [
      {label: 'Sign Up', icon: 'pi pi-refresh', command: () => {
         // this.update();
      }},
    ]
    //this.abc();
   }

  ngOnInit(): void {
    this.loginName = localStorage.getItem('loginName') || '';
   
  }
  
ngAfterViewInit(): void {
  this.renderer.setStyle(this.op, "color", "blue !important");
  //this.op.nativeElement.setAttribute('highlight', '');
  console.log(this.op)
}

  validateUser()
  {
   // this.messageService.add({ severity: 'success', summary: 'Logged In', detail: '' });
    this.error = {} as Error;

    if (this.userid === '') {
      this.error.userid = 'Userid is required.';
    }

    if (this.password === '') {
      this.error.password = 'Password is required.';
    }

    let invalid = true;
  
      if ((this.userid !== '' && credentials.loginid === this.userid) && (this.password !== '' && credentials.password === this.password)) {
        invalid = false;
      }
    

    if (this.userid !== '' && this.password !== '') {

      if (invalid) {
        this.error.main = 'Invalid userid or password.';
      }
    }

    if (!(Object.keys(this.error).length)) {
      //  login successfull
   
        if (credentials.loginid === this.userid) {
          this.loginName = credentials.loginid;
          localStorage.setItem('loginName', this.loginName);
          this.op.hide();
         // this.messageService.add({ severity: 'success', summary: 'Logged In', detail: '' });
          this.messageService.add({ key: 'callback',life: 1500,severity: 'success', summary: 'Info', detail: 'Logged In' });
          this.router.navigate([`/contacts/admin`]).then()
          return;
        }
      
    }

  }
  logoutuser(){
    this.oq.hide();
    this.loginName = '';
    localStorage.setItem('loginName', '');
    this.router.navigate([`/contacts`]).then()
    this.messageService.add({ key: 'callback',life: 1500,severity: 'success', summary: 'Info', detail: 'Logged Out' });
  }
  show() {
    console.log("dffd")
   this.panel = true;
  }

}
