import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'abc',
    loadChildren: () => import('./features/abc/abc.module').then(m => m.AbcModule)
  },
  {
    path: 'numbers',
    loadChildren: () => import('./features/numbers/numbers.module').then(m => m.NumbersModule)
  },
  {
    path: 'colors',
    loadChildren: () => import('./features/colors/colors.module').then(m => m.ColorsModule)
  },
  {
    path: 'shapes',
    loadChildren: () => import('./features/shapes/shapes.module').then(m => m.ShapesModule)
  },
  {
    path: 'animals',
    loadChildren: () => import('./features/animals/animals.module').then(m => m.AnimalsModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('./features/quiz/quiz.module').then(m => m.QuizModule)
  },
  {
    path: 'abc-tap',
    loadChildren: () => import('./features/abc-tap/abc-tap.module').then(m => m.AbcTapModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
