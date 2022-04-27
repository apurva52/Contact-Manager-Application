import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyContact } from '../models/myContacts';
import { catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { MyGroup } from '../models/myGroup';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private baseUrl: string = 'http://localhost:4000'
    constructor(private http: HttpClient, private snackBar: MatSnackBar) {

    }
    //Get All Contacts Data
    public getAllContacts() {
        let dataUrl: string = `${this.baseUrl}/contacts`
        return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError))
    }
    //get Single Contacts
    public getContact(contactId: string): Observable<MyContact> {
        let dataUrl: string = `${this.baseUrl}/contacts/${contactId}`
        return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError))
    }
    //Create Contact
    public CreateContact(contact: MyContact): Observable<MyContact> {
        let dataUrl: string = `${this.baseUrl}/contacts`;
        return this.http.post<MyContact>(dataUrl, contact).pipe(catchError(this.handleError))
    }
    //Update Contact
    public UpdateContact(contact: MyContact, contactId: string): Observable<MyContact> {
        let dataUrl: string = `${this.baseUrl}/contacts/${contactId}`
        return this.http.put<MyContact>(dataUrl, contact).pipe(catchError(this.handleError))
    }

    //Delete Contact
    public DeleteContact(contactId: string): Observable<MyContact> {
        let dataUrl: string = `${this.baseUrl}/contacts/${contactId}`
        return this.http.delete<MyContact>(dataUrl).pipe(catchError(this.handleError))
    }

    //Get All Groups Data
    public getAllGroups() {
        let dataUrl: string = `${this.baseUrl}/groups`
        return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError))
    }

    //get Group
    public getGroup(conatct: MyContact): Observable<MyGroup> {
        let dataUrl: string = `${this.baseUrl}/groups/${conatct.groupId}`
        return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError))
    }
    public handleError(error: HttpErrorResponse) {
        let errorMessage: string = ''
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error:${error.message}`
        }
        else {
            errorMessage = `Status: ${error.status} \n Message:${error.message}`;
        }
        return throwError(errorMessage)
    }
    // validate input feilds
    ValidateFields(conatct: MyContact) {
        if (!conatct.name  || !conatct.company || !conatct.mobile  || !conatct.photo  || !conatct.title || !conatct.groupId ) {
            this.snackBar.open('Please Fill All The Details', 'ok', {
                duration: 2000,
            });
            return false
        }
        else {
            return true
        }
    }



}
