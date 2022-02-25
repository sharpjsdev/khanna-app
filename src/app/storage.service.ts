import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public scope: Array<any>;
  constructor() { }

  public getScope(): Array<any>  {
    //console.log('yes',JSON.parse(localStorage.getItem('scope')));
    if(localStorage.getItem('scope')){
      return JSON.parse(localStorage.getItem('scope'));
    }else{
      return this.scope;
    }
    
    
  }

  public setScope(scope: any): void {
      this.scope = scope;
      localStorage.setItem('scope',JSON.stringify(scope));
  }
}
