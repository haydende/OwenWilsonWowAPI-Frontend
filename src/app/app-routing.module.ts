import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomWowComponent } from './random-wow/random-wow.component';

const routes: Routes = [
  { path: 'random', component: RandomWowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
