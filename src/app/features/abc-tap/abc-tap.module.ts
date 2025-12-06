import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbcTapComponent } from './abc-tap.component';

const routes: Routes = [
  { path: '', component: AbcTapComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AbcTapComponent
  ]
})
export class AbcTapModule {}