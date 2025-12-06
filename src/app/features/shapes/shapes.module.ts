import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShapesComponent } from './shapes.component';

const routes: Routes = [
  { 
    path: '', 
    component: ShapesComponent 
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ShapesComponent
  ]
})
export class ShapesModule {}