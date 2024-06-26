import { Component,OnInit } from '@angular/core';
import { Owner } from 'src/app/_interfaces/owner.model';
import { OwnerRepositoryService } from 'src/app/shared/services/owner-repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit{
owners: Owner[];
errorMessage: string = '';

constructor(private repository: OwnerRepositoryService,private errorHandler:ErrorHandlerService,private router:Router){}

ngOnInit():void{
this.getAllOwners();
}

private getAllOwners = () =>{
const apiAddress: string = 'api/owner';
this.repository.getOwners(apiAddress).subscribe({
next: (own: Owner[]) => this.owners = own,
error:(err :HttpErrorResponse) =>{
this.errorHandler.handleError(err);
this.errorMessage = this.errorHandler.errorMessage;
}
})
}

public getOwnerDetails = () => {
const detailsUrl: string = '/owner/details/${id}';
this.router.navigate([detailsUrl]);
}

public redirectToUpdatePage = (id) => { 
  const updateUrl: string = `/owner/update/${id}`; 
  this.router.navigate([updateUrl]); 
}

public redirectToDeletePage = (id) => { 
  const deleteUrl: string = `/owner/delete/${id}`; 
  this.router.navigate([deleteUrl]); 
}

}
