import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryLearningComponent } from './category-learning.component';

const routes: Routes = [
  { path: '', component: CategoryLearningComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CategoryLearningComponent
  ]
})
export class CategoryLearningModule {}