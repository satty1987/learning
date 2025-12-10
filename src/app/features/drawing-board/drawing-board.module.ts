import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawingBoardComponent } from './drawing-board.component';
const routes: Routes = [
  { path: '', component: DrawingBoardComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    DrawingBoardComponent
  ]
})
export class DrawingBoardModule {}