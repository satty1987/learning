import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PunjabiAlphabetComponent } from './punjabi-alphabet.component';

const routes: Routes = [
  { path: '', component: PunjabiAlphabetComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PunjabiAlphabetComponent
  ]
})
export class PunjabiAlphabetModule {}