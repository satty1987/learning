import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicMakerComponent } from './music-maker.component';

const routes: Routes = [
  { path: '', component: MusicMakerComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MusicMakerComponent
  ]
})
export class MusicMakerModule {}