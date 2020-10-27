import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }
  
	getLanguage(): Observable<any> { 
		return this.http.get(environment.base_url + 'language');
	}
	getKeyText(id): Observable<any> { 
		return this.http.get(environment.base_url + 'key_text/'+id);
	}
	createUser(data): Observable<any> { 
		return this.http.post(environment.base_url + 'create_user',data);
	}
	resendOTP(data): Observable<any> { 
		return this.http.post(environment.base_url + 'resend_otp',data);
	}
	registerUser(data): Observable<any> { 
		return this.http.post(environment.base_url + 'register_user',data);
	}
	profile(data): Observable<any> { 
		return this.http.post(environment.base_url + 'user_profile',data);
	}
	help_video(): Observable<any> { 
		return this.http.get(environment.base_url + 'help_video');
	}
	add_location(data): Observable<any> { 
		return this.http.post(environment.base_url + 'add_location',data);
	}
	get_user_locations(id): Observable<any> { 
		return this.http.get(environment.base_url + 'show_location/'+id);
	}
	get_lat_lon(id): Observable<any> { 
		return this.http.get(environment.base_url + 'get_location/'+id);
	}
	updateLocation(data): Observable<any> { 
		return this.http.post(environment.base_url + 'edit_location',data);
	}
	remove_location(id): Observable<any> { 
		return this.http.get(environment.base_url + 'remove_location/'+id);
	}
	getUserLocationForDonation(id): Observable<any> { 
		return this.http.get(environment.base_url + 'get_user_loaction/'+id);
	}
	donate_food_location(data): Observable<any> { 
		return this.http.post(environment.base_url + 'donate_food',data);
	}
	donate_food_details(data): Observable<any> { 
		return this.http.post(environment.base_url + 'donate_food_details',data);
	}
	reviewFood(id): Observable<any> { 
		return this.http.get(environment.base_url + 'review_food/'+id);
	}
	update_food_details(data): Observable<any> { 
		return this.http.post(environment.base_url + 'update_food_details',data);
	}
	pending_donation(id): Observable<any> { 
		return this.http.get(environment.base_url + 'pending_donation/'+id);
	}
	receiver_food_details(data): Observable<any> { 
		return this.http.post(environment.base_url + 'receiver_food_details',data);
	}
	receiver_details(id): Observable<any> { 
		return this.http.get(environment.base_url + 'receiver_data/'+id);
	}
	nearest_donors(data): Observable<any> { 
		return this.http.post(environment.base_url + 'nearest_donors',data);
	}
	distanceAndTime(slat, slon, dlat, dlon, mode): Observable<any> { 
	let headers = new HttpHeaders();
		  headers.set('Authorization', 'Basic'); 
		 headers.set('Content-Type', 'application/json'); 
		 headers.set('Accept', 'application/json'); 
		 headers.set('Access-Control-Allow-Origin', '*'); 
		 headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');  
		return this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?key=AIzaSyDFf3YK0MWDI1dYyVcJONOwdaaXW_eO3aU&origins='+slat+','+slon+'&destinations='+dlat+','+dlon+'&mode='+mode+'&language=en-EN&sensor=false', {
      headers: headers
    });
	}
	showTimeAndDistance(data): Observable<any> { 
		return this.http.post(environment.base_url + 'show_time_distance',data);
	}
	get_donor_food_detail(id): Observable<any> { 
		return this.http.get(environment.base_url + 'donar_food_detail/'+id);
	}
	pickup_food(data): Observable<any> { 
		return this.http.post(environment.base_url + 'food_pickup',data);
	}
	feedback(data): Observable<any> { 
		return this.http.post(environment.base_url + 'feedback',data);
	}
	register_volunteer(data): Observable<any> { 
		return this.http.post(environment.base_url + 'register-volunteer',data);
	}
	volunteer_request(data): Observable<any> { 
		return this.http.post(environment.base_url + 'request-food',data);
	}
	get_request(id): Observable<any> { 
		return this.http.get(environment.base_url + 'get_request/'+id);
	}
	volunteer_receive_requested_food(data): Observable<any> { 
		return this.http.post(environment.base_url + 'receive-food',data);
	}
	volunteer_cancel_requested_food(data): Observable<any> { 
		return this.http.post(environment.base_url + 'cancel-receive-food',data);
	}
	req_list(data): Observable<any> { 
		return this.http.post(environment.base_url + 'food-request',data);
	}
	v_edit(id): Observable<any> { 
		return this.http.get(environment.base_url + 'volunteer_edit/'+id);
	}
	v_check(id): Observable<any> { 
		return this.http.get(environment.base_url + 'volunteer_check/'+id);
	}
	update_volunteer(data): Observable<any> { 
		return this.http.post(environment.base_url + 'update_volunteer',data);
	}
	get_user_city(id): Observable<any> { 
		return this.http.get(environment.base_url + 'user_city/'+id);
	}
	get_top_donors(city): Observable<any> { 
		return this.http.get(environment.base_url + 'top_donors/'+city);
	}
	show_feedback(): Observable<any> { 
		return this.http.get(environment.base_url + 'show_feedback');
	}
	weekly_donation_graph(id): Observable<any> { 
		return this.http.get(environment.base_url + 'donation_graph_weekly/'+id);
	}
	monthly_donation_graph(id): Observable<any> { 
		return this.http.get(environment.base_url + 'donation_graph_monthly/'+id);
	}
	blessings_this_week(id): Observable<any> { 
		return this.http.get(environment.base_url + 'blessing_this_week/'+id);
	}
	blessings_this_month(id): Observable<any> { 
		return this.http.get(environment.base_url + 'blessing_this_month/'+id);
	}
	total_blessings(id): Observable<any> { 
		return this.http.get(environment.base_url + 'total_blessings/'+id);
	}
	food_quality_weekly(id): Observable<any> { 
		return this.http.get(environment.base_url + 'weekly_food_quality/'+id);
	}
	weekly_packaging(id): Observable<any> { 
		return this.http.get(environment.base_url + 'weekly_packaging/'+id);
	}
	weekly_behaviour(id): Observable<any> { 
		return this.http.get(environment.base_url + 'weekly_behaviour/'+id);
	}
	monthly_food_quality(id): Observable<any> { 
		return this.http.get(environment.base_url + 'monthly_food_quality/'+id);
	}
	monthly_packaging(id): Observable<any> { 
		return this.http.get(environment.base_url + 'monthly_packaging/'+id);
	}
	monthly_behaviour(id): Observable<any> { 
		return this.http.get(environment.base_url + 'monthly_behaviour/'+id);
	}
	weekly_volunteer_req(id): Observable<any> { 
		return this.http.get(environment.base_url + 'weekly_volunteer_req/'+id);
	}
	monthly_volunteer_req(id): Observable<any> { 
		return this.http.get(environment.base_url + 'monthly_volunteer_req/'+id);
	}
	volunteer_blessings_this_week(id): Observable<any> { 
		return this.http.get(environment.base_url + 'volunteer_blessing_this_week/'+id);
	}
	volunteer_blessings_this_month(id): Observable<any> { 
		return this.http.get(environment.base_url + 'volunteer_blessing_this_month/'+id);
	}
	volunteer_total_blessings(id): Observable<any> { 
		return this.http.get(environment.base_url + 'volunteer_total_blessings/'+id);
	}
	volunteer_city(id): Observable<any> { 
		return this.http.get(environment.base_url + 'volunteer_city/'+id);
	}
	top_volunteers(id): Observable<any> { 
		return this.http.get(environment.base_url + 'top_volunteers/'+id);
	}
	twilio_token(): Observable<any> { 
		return this.http.get(environment.base_url + 'twilio_token_generate');
	}
}
