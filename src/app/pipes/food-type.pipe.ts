import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foodType'
})
export class FoodTypePipe implements PipeTransform {

  transform(value: any, arg): unknown {
	  var address_type = "";
    if(value == 1){
		address_type = "Veg";
	}else if(value == 2){
		 address_type = "Non Veg";
	}else{
		address_type = "Both";
	}
	return address_type;
  }

}
