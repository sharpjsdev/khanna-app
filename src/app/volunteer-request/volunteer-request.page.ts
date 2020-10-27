import { Component, OnInit, ViewChild ,ElementRef } from '@angular/core';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { HttpClient } from '@angular/common/http';
import { FetchService } from '../fetch.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

declare var google: any;
declare var $: any;

@Component({
  selector: 'app-volunteer-request',
  templateUrl: './volunteer-request.page.html',
  styleUrls: ['./volunteer-request.page.scss'],
})
export class VolunteerRequestPage implements OnInit {
model:any={};
req_data : any = [];
@ViewChild('map') mapElement: ElementRef;
map: any;
  options : GeolocationOptions;
  constructor(
	private geolocation: Geolocation,
	private nativeGeocoder: NativeGeocoder,
	private http: HttpClient,
	private route: ActivatedRoute,
	private router: Router,
	private fetch: FetchService,
  ) { }

  ngOnInit() {
	var self = this;
	self.options = {
		enableHighAccuracy: false,
    };
	self.geolocation.getCurrentPosition(self.options).then((resp) => {
		let options: NativeGeocoderOptions = {
			useLocale: true,
			maxResults: 5
		};
		this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options).then((result: NativeGeocoderResult[]) => {
			this.model.city = result[0].locality;
		}).catch((error: any) => console.log(error));
		let data = JSON.stringify({'city' : 'ujjain'});
		this.fetch.req_list(data).subscribe(res => {
			console.log(res.data);
			this.req_data = res.data;
			let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
			let mapOptions = {
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			self.map = new google.maps.Map(self.mapElement.nativeElement, mapOptions);
			var infowindow = new google.maps.InfoWindow();
			var marker;
			for(var i = 0; i < this.req_data.length; i++){
				let marker = new google.maps.Marker({
					map: self.map,
					position: new google.maps.LatLng(this.req_data[i].latitude, this.req_data[i].longitude),
				});
				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
					  infowindow.setContent(this.req_data[i].colony_name);
					  infowindow.open(this.map, marker);
					}
				  })(marker, i));
			}
		});
	}); 
  }

}
