import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foodType'
})
export class FoodTypePipe implements PipeTransform {

  transform(value: any, arg): unknown {
	var lang_code = JSON.parse(localStorage.getItem('lang'));
	console.log(lang_code);
	  var address_type = "";
	if(lang_code == 'en'){
		if(value == 1){
			address_type = "Veg";
		}else if(value == 2){
			address_type = "Non Veg";
		}else{
			address_type = "Both";
		}
	}else if(lang_code == 'hi'){
		if(value == 1){
			address_type = "शाकाहारी";
		}else if(value == 2){
			address_type = "मासाहारी";
		}else{
			address_type = "दोनों";
		}
	}else if(lang_code == 'te'){
		if(value == 1){
			address_type = "వెజ్";
		}else if(value == 2){
			address_type = "నాన్ వెజ్";
		}else{
			address_type = "రెండు";
		}
	}
    
	return address_type;
  }

}
