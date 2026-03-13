import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextLearningComponent } from './text-learning.component';

const routes: Routes = [
  { path: '', component: TextLearningComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TextLearningComponent
  ]
})
export class TextLearningModule {}