import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RhymesComponent } from './rhymes.component';

const routes: Routes = [
  { path: '', component: RhymesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    RhymesComponent
  ]
})
export class RhymesModule {}
