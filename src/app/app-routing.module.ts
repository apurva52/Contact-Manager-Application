import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './login.guard';
import { ContactsManagerComponent } from './conatct-manager/contact-manager.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ViewComponent } from './view-contact/view-contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageComponent } from './main-page/main-page.component';
// import { SaveFormsGuard } from './save-forms-guard';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'contacts' },
  { path: 'contacts/admin', component: ContactsManagerComponent,canActivate: [LoginGuard] },
  { path: 'contacts/add', component: AddContactComponent,canActivate: [LoginGuard]},
  { path: 'contacts', component: MainPageComponent },
  { path: 'contacts/edit/:contactId', component: EditContactComponent,canActivate: [LoginGuard] },
  { path: 'contacts/view/:contactId', component: ViewComponent,canActivate: [LoginGuard] },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
