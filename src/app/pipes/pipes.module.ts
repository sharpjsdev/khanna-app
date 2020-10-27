import { NgModule } from '@angular/core';
import { SafePipe } from '../pipes/safe.pipe';
import { AddressTypePipe } from '../pipes/address-type.pipe';
import { FoodTypePipe } from '../pipes/food-type.pipe';

@NgModule({
declarations: [SafePipe,AddressTypePipe,FoodTypePipe],
imports: [],
exports: [SafePipe,AddressTypePipe,FoodTypePipe],
})

export class PipesModule {}