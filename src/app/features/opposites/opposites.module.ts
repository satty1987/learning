import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OppositesComponent } from './opposites.component';

const routes: Routes = [
  { path: '', component: OppositesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    OppositesComponent
  ]
})
export class OppositesModule {}
