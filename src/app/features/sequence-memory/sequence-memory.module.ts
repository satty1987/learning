import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SequenceMemoryComponent } from './sequence-memory.component';

const routes: Routes = [
  { path: '', component: SequenceMemoryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SequenceMemoryComponent
  ]
})
export class SequenceMemoryModule {}