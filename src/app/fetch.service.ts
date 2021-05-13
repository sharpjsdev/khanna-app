import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
 public isLanguageChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }
  
	getLanguage(): Observable<any> { 
		return this.http.get(environment.base_url + 'language');
	}
	getKeyText(id): Observable<any> { 
		return this.http.get(environment.base_url + 'key_text/'+id);
	}
	getAboutUsPageCOntent(id): Observable<any>{
		return this.http.get(environment.base_url + 'get-about-us-content-by-lang/'+id)
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
	help_video(lang_code): Observable<any> { 
		return this.http.get(environment.base_url + 'help_video/'+lang_code);
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
	my_alloted_donation(id): Observable<any> { 
		return this.http.get(environment.base_url + 'my_alloted_donation/'+id);
	}
	my_food_request(id): Observable<any> { 
		return this.http.get(environment.base_url + 'my_food_request/'+id);
	}
	my_alloted_request(id): Observable<any> { 
		return this.http.get(environment.base_url + 'my_alloted_request/'+id);
	}
	receiver_food_details(data): Observable<any> { 
		return this.http.post(environment.base_url + 'receiver_food_details',data);
	}
	accept_food(data): Observable<any> { 
		return this.http.post(environment.base_url + 'accept_food',data);
	}
	accept_food_request(data): Observable<any> {
		return this.http.post(environment.base_url + 'accept_food_request',data);
	}
	cancel_accept_food(data): Observable<any> {
		return this.http.post(environment.base_url + 'cancel_accept_food',data)
	}
	cancel_requested_food(data):Observable<any> {
		return this.http.post(environment.base_url + 'cancel_requested_food',data)
	}
	cancel_alloted_request(data):Observable<any> {
		return this.http.post(environment.base_url + 'cancel_alloted_request',data)
	}
	get_reasons(lang_code):Observable<any> {
		return this.http.get(environment.base_url + 'get_reasons/'+lang_code);
	}
	get_terms_conditions(lang_code):Observable<any> {
		return this.http.get(environment.base_url + 'get_terms_conditions/'+lang_code);
	}
	volunteer_get_terms_conditions(lang_code):Observable<any>{
		return this.http.get(environment.base_url + 'volunteer_get_terms_conditions/'+lang_code);
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
	volunteer_received_cancel_food(data): Observable<any> { 
		return this.http.post(environment.base_url + 'cancel-alloted-food',data);
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
	cancel_all_request(id):Observable<any> {
		return this.http.get(environment.base_url + 'cancel_all_request/'+id);
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
	show_feedback(id): Observable<any> { 
		return this.http.get(environment.base_url + 'show_feedback/'+id);
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
	get_registered_user_data(id): Observable<any> { 
		return this.http.get(environment.base_url + 'get_user_detail/'+id);
	}
	collect_food_noti_to_donor(data): Observable<any> { 
		return this.http.post(environment.base_url + 'collect_food_notification',data);
	}
	get_notification(id): Observable<any> { 
		return this.http.get(environment.base_url + 'get_notification/'+id);
	}
	read_notification(id): Observable<any> { 
		return this.http.get(environment.base_url + 'read_notification/'+id);
	}
	get_available_food(id): Observable<any> {
		return this.http.get(environment.base_url + 'get_available_food/'+id);
	}
	cancel_donation_food(data): Observable<any> { 
		return this.http.post(environment.base_url + 'cancel_donation_food',data);
	}
	cancel_alloted_food(data): Observable<any> {
		return this.http.post(environment.base_url + 'cancel_alloted_food',data);
	}
	change_app_status(data): Observable<any> { 
		return this.http.post(environment.base_url + 'change_app_status',data);
	}
	notify_donar(data): Observable<any> { 
		return this.http.post(environment.base_url + 'notify_donar',data);
	}
	get_waypoints(data): Observable<any> {
		return this.http.post(environment.base_url + 'get_waypoints',data);
	}
	get_volunteer_waypoints(data): Observable<any> {
		return this.http.post(environment.base_url + 'get_volunteer_waypoints',data);
	}
	save_contact_us(data): Observable<any> {
		return this.http.post(environment.base_url + 'save-contact-us',data);
	}
	recomended_distance(data): Observable<any> {
		return this.http.post(environment.base_url + 'recomended_distance',data);
	}
	donate_food_to_volunteer(data): Observable<any> {
		return this.http.post(environment.base_url+'donate_food_to_volunteer',data);
	}
	active_donation(data): Observable<any>{
		return this.http.post(environment.base_url+'active_donation',data);
	}
	add_call_detail(data): Observable<any>{
		return this.http.post(environment.base_url+'add_call_detail',data);
	}
	get_received_food(id):Observable<any>{
		return this.http.get(environment.base_url + 'get_received_food/'+id);
	}
}
