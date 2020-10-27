import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressType'
})
export class AddressTypePipe implements PipeTransform {

  transform(value: any, arg): unknown {
	  var address_type = "";
    if(value == 1){
		address_type = "Home";
	}else if(value == 2){
		 address_type = "Work";
	}else{
		address_type = "Other";
	}
	return address_type;
  }

}
