import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionComponent } from './addition.component';

const routes: Routes = [
  { path: '', component: AdditionComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AdditionComponent
  ]
})
export class AdditionModule {}
