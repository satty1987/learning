import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvenOddComponent } from './even-odd.component';

const routes: Routes = [
  { path: '', component: EvenOddComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    EvenOddComponent
  ]
})
export class EvenOddModule {}
