import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryTimeComponent } from './story-time.component';

const routes: Routes = [
  { path: '', component: StoryTimeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoryTimeComponent
  ]
})
export class StoryTimeModule {}