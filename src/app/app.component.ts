import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from './fetch.service';
import { StorageService } from './storage.service';
import { AlertController } from '@ionic/angular';
declare var FCMPlugin: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
model:any={};
user_id:any;
isLanguageChanged: boolean;

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
	  private router: Router,
    private fetch: FetchService,
    private storage : StorageService,
    private alertController : AlertController
    
  ) {
    this.model.fromNotification = false;
     document.addEventListener('deviceready',() => {
      FCMPlugin.getToken((token: any) => {
			
        localStorage.setItem('device_token', JSON.stringify(token));
        
        });
       
       FCMPlugin.onNotification((data: any) => {
        //alert(JSON.stringify(data.message));
        
       
        
        this.model.fromNotification = true;
  
        if (data.wasTapped) 
          {
            // Notification was received on device tray and tapped by the user.
             
             
           this.router.navigate(['/notification']);

          } else {
            // alert(JSON.stringify(data.));
            this.showAlert(data.body);
            console.log("Received in foreground");
          }
        },(success:any)=>{
          if(!this.model.fromNotification){
                  if(JSON.parse(localStorage.getItem('user_registerd')) != null){
                    this.fetch.isLanguageChanged.next(JSON.parse(localStorage.getItem('lang')));
                    this.router.navigate(['/home']);
                    //this.navCtrl.navigateBack(['/home']);
                  }else if(JSON.parse(localStorage.getItem('user_id')) != null && localStorage.getItem('isotpverified') == '1'){
                    this.fetch.isLanguageChanged.next(JSON.parse(localStorage.getItem('lang')));
                    this.router.navigate(['/register-as-volunteer']);
                    //this.navCtrl.navigateBack(['/register-as-volunteer']);
                  }else if(localStorage.getItem('isotpverified') == '0'){
                    this.router.navigate(['/otp']);
                  }else{
                    this.router.navigate(['/language']);
                  }
              }
        },(error:any)=>{
         
        });

      
      });
    
      if(!this.model.fromNotification){
        if(JSON.parse(localStorage.getItem('user_registerd')) != null){
          this.fetch.isLanguageChanged.next(JSON.parse(localStorage.getItem('lang')));
          this.router.navigate(['/home']);
          //this.navCtrl.navigateBack(['/home']);
        }else if(JSON.parse(localStorage.getItem('user_id')) != null && localStorage.getItem('isotpverified') == '1'){
          this.fetch.isLanguageChanged.next(JSON.parse(localStorage.getItem('lang')));
          this.router.navigate(['/register-as-volunteer']);
          //this.navCtrl.navigateBack(['/register-as-volunteer']);
        }else if(localStorage.getItem('isotpverified') == '0'){
          this.router.navigate(['/otp']);
        }else{
          this.router.navigate(['/language']);
        }
    }
       
        
      
  
	this.fetch.isLanguageChanged.subscribe( value => {
	    this.isLanguageChanged = value;
	    //console.log(this.isLanguageChanged);
		//var lang_code = value;
		var lang_code = JSON.parse(localStorage.getItem('lang'));
		this.fetch.getKeyText(lang_code).subscribe(rs => {
      this.storage.setScope(rs);
      let res = this.storage.getScope();
      
			let item1 = res.find(i => i.key_text === 'REGISTER_AS_VOLUNTEER');
				this.model.key_text1 = item1[lang_code];
			let item2 = res.find(i => i.key_text === 'SIDEBAR_QUOTE1');
				this.model.key_text2 = item2[lang_code];
			let item3 = res.find(i => i.key_text === 'PROFILE');
				this.model.key_text3 = item3[lang_code];
			let item4 = res.find(i => i.key_text === 'SIDEBAR_QUOTE2');
				this.model.key_text4 = item4[lang_code];
			let item5 = res.find(i => i.key_text === 'SAVED_ADDRESSES');
				this.model.key_text5 = item5[lang_code];
			let item6 = res.find(i => i.key_text === 'YOUR_PREVIOUSLY_SAVED_ADDRESSES');
				this.model.key_text6 = item6[lang_code];
			let item7 = res.find(i => i.key_text === 'CHOOSE_LANGUAGE');
				this.model.key_text7 = item7[lang_code];
			let item8 = res.find(i => i.key_text === 'SIDEBAR_QUOTE3');
				this.model.key_text8 = item8[lang_code];
			let item9 = res.find(i => i.key_text === 'HELP');
				this.model.key_text9 = item9[lang_code];
			let item10 = res.find(i => i.key_text === 'SIDEBAR_QUOTE4');
				this.model.key_text10 = item10[lang_code];
			let item11 = res.find(i => i.key_text === 'ABOUT_US');
				this.model.key_text11 = item11[lang_code];
			let item12 = res.find(i => i.key_text === 'SIDEBAR_QUOTE5');
        this.model.key_text12 = item12[lang_code];
      let item13 = res.find(i=> i.key_text === 'SHOW_IN_BETWEEN');
         this.model.key_text13 = item13[lang_code];  
			
	    });
	});
  
  
  
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
	  this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
     
    });
  }
//   ngAfterViewInit(){
//     document.addEventListener('deviceready', () => {
//     alert(this.model.fromNotification);
//     if(!this.model.fromNotification){
//       if(JSON.parse(localStorage.getItem('user_registerd')) != null){
//         this.fetch.isLanguageChanged.next(JSON.parse(localStorage.getItem('lang')));
//         this.router.navigate(['/home']);
//         //this.navCtrl.navigateBack(['/home']);
//       }else if(JSON.parse(localStorage.getItem('user_id')) != null && localStorage.getItem('isotpverified') == '1'){
//         this.fetch.isLanguageChanged.next(JSON.parse(localStorage.getItem('lang')));
//         this.router.navigate(['/register-as-volunteer']);
//         //this.navCtrl.navigateBack(['/register-as-volunteer']);
//       }else if(localStorage.getItem('isotpverified') == '0'){
//         this.router.navigate(['/otp']);
//       }else{
//         this.router.navigate(['/language']);
//       }
//   }
// });
//   }
  ngOnInit() {
    
    var self = this;
    var lang_code = JSON.parse(localStorage.getItem('lang'));
    console.log(lang_code);
      const path = window.location.pathname.split('folder/')[1];
    this.user_id = JSON.parse(localStorage.getItem('user_registerd'));
    this.fetch.v_check(this.user_id).subscribe(res => {
      if(res.success == true){
        if(res.status == 1){
          localStorage.setItem('volunteer_approve','1');
        }
        else{
          localStorage.setItem('volunteer_approve','0');
        }
      }else{
        localStorage.setItem('volunteer_approve','0');
      }
    });
	//console.log("app.component"); 

 
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    

	
  }
  async showAlert(msg){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class custom_alert_1',
      header: 'Alert',
      message: msg,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });
  
    await alert.present();
  }
  save_address(){
	  var id = JSON.parse(localStorage.getItem('user_registerd'));
	  this.router.navigate(['/saved-addresses',id]);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/language']);
  }
  side_bar_route(route){
	this.router.navigate(['/'+route]);  
  }
}
