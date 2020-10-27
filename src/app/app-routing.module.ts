import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'language',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'language',
    loadChildren: () => import('./language/language.module').then( m => m.LanguagePageModule)
  },
  {
    path: 'mobile-number',
    loadChildren: () => import('./mobile-number/mobile-number.module').then( m => m.MobileNumberPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'get-food-search',
    loadChildren: () => import('./get-food-search/get-food-search.module').then( m => m.GetFoodSearchPageModule)
  },
  {
    path: 'nearest-donors/:id',
    loadChildren: () => import('./nearest-donors/nearest-donors.module').then( m => m.NearestDonorsPageModule)
  },
  {
    path: 'register-as-volunteer',
    loadChildren: () => import('./register-as-volunteer/register-as-volunteer.module').then( m => m.RegisterAsVolunteerPageModule)
  },
  {
    path: 'register-volunteer',
    loadChildren: () => import('./register-volunteer/register-volunteer.module').then( m => m.RegisterVolunteerPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },   {
    path: 'saved-addresses/:id',
    loadChildren: () => import('./saved-addresses/saved-addresses.module').then( m => m.SavedAddressesPageModule)
  },   {
    path: 'otp-content',
    loadChildren: () => import('./modal/otp/otp-content/otp-content.module').then( m => m.OtpContentPageModule)
  },
  {
    path: 'saved-addresses-edit/:id',
    loadChildren: () => import('./saved-addresses-edit/saved-addresses-edit.module').then( m => m.SavedAddressesEditPageModule)
  },
  {
    path: 'saved-addresses-add',
    loadChildren: () => import('./saved-addresses-add/saved-addresses-add.module').then( m => m.SavedAddressesAddPageModule)
  },
  {
    path: 'filter-content',
    loadChildren: () => import('./modal/otp/filter-content/filter-content.module').then( m => m.FilterContentPageModule)
  },
  {
    path: 'sort-content',
    loadChildren: () => import('./modal/sort-content/sort-content.module').then( m => m.SortContentPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'home-content',
    loadChildren: () => import('./modal/home-content/home-content.module').then( m => m.HomeContentPageModule)
  },
  {
    path: 'donate-food',
    loadChildren: () => import('./donate-food/donate-food.module').then( m => m.DonateFoodPageModule)
  },
  {
    path: 'donate-food-add-location',
    loadChildren: () => import('./donate-food-add-location/donate-food-add-location.module').then( m => m.DonateFoodAddLocationPageModule)
  },
  {
    path: 'current-location-content',
    loadChildren: () => import('./modal/current-location-content/current-location-content.module').then( m => m.CurrentLocationContentPageModule)
  },
  {
    path: 'select-location',
    loadChildren: () => import('./select-location/select-location.module').then( m => m.SelectLocationPageModule)
  },
  {
    path: 'choose-language',
    loadChildren: () => import('./choose-language/choose-language.module').then( m => m.ChooseLanguagePageModule)
  },
  {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module').then( m => m.ActivityPageModule)
  },
  {
    path: 'donate-food-members/:id',
    loadChildren: () => import('./donate-food-members/donate-food-members.module').then( m => m.DonateFoodMembersPageModule)
  },
  {
    path: 'donate-food-review/:id',
    loadChildren: () => import('./donate-food-review/donate-food-review.module').then( m => m.DonateFoodReviewPageModule)
  },
  {
    path: 'donate-food-successful',
    loadChildren: () => import('./donate-food-successful/donate-food-successful.module').then( m => m.DonateFoodSuccessfulPageModule)
  },
  {
    path: 'donate-food-content',
    loadChildren: () => import('./modal/donate-food-content/donate-food-content.module').then( m => m.DonateFoodContentPageModule)
  },
  {
    path: 'feedback-form/:r_id',
    loadChildren: () => import('./feedback-form/feedback-form.module').then( m => m.FeedbackFormPageModule)
  },
  {
    path: 'feedback-content',
    loadChildren: () => import('./modal/feedback-content/feedback-content.module').then( m => m.FeedbackContentPageModule)
  },
  {
    path: 'get-food-nearest-donors/:data/:r_lat/:r_lon/:r_id',
    loadChildren: () => import('./get-food-nearest-donors/get-food-nearest-donors.module').then( m => m.GetFoodNearestDonorsPageModule)
  },
  {
    path: 'get-food-nearest-donors-two/:id/:lat/:lon/:r_id/:mode/:food_type',
    loadChildren: () => import('./get-food-nearest-donors-two/get-food-nearest-donors-two.module').then( m => m.GetFoodNearestDonorsTwoPageModule)
  },
  {
    path: 'get-food-search-with-address',
    loadChildren: () => import('./get-food-search-with-address/get-food-search-with-address.module').then( m => m.GetFoodSearchWithAddressPageModule)
  },
  {
    path: 'location-error-content',
    loadChildren: () => import('./modal/location-error-content/location-error-content.module').then( m => m.LocationErrorContentPageModule)
  },
  {
    path: 'volunteer-list',
    loadChildren: () => import('./volunteer-list/volunteer-list.module').then( m => m.VolunteerListPageModule)
  },
  {
    path: 'volunteer-location',
    loadChildren: () => import('./volunteer-location/volunteer-location.module').then( m => m.VolunteerLocationPageModule)
  },
  {
    path: 'volunteer-food-drop',
    loadChildren: () => import('./volunteer-food-drop/volunteer-food-drop.module').then( m => m.VolunteerFoodDropPageModule)
  },
  {
    path: 'volunteer',
    loadChildren: () => import('./volunteer/volunteer.module').then( m => m.VolunteerPageModule)
  },
  {
    path: 'activity-normal',
    loadChildren: () => import('./activity-normal/activity-normal.module').then( m => m.ActivityNormalPageModule)
  },
  {
    path: 'volunteer-request',
    loadChildren: () => import('./volunteer-request/volunteer-request.module').then( m => m.VolunteerRequestPageModule)
  },

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
