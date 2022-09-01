import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomWowSearchComponent } from './component/random-wow-search/random-wow-search.component';

const routes: Routes = [
  { path: 'random', component: RandomWowSearchComponent },
  { path: 'ordered', component: RandomWowSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
