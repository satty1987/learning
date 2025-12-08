import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemoryMatchComponent } from './memory-match.component';

const routes: Routes = [
  { path: '', component: MemoryMatchComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MemoryMatchComponent
  ]
})
export class MemoryMatchModule {}