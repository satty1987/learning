import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcentrationComponent } from './concentration.component';

const routes: Routes = [
  { path: '', component: ConcentrationComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ConcentrationComponent
  ]
})
export class ConcentrationModule {}