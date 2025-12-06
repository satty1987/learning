import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NumberTapComponent } from './number-tap.component';

const routes: Routes = [
  { path: '', component: NumberTapComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NumberTapComponent
  ]
})
export class NumberTapModule {}