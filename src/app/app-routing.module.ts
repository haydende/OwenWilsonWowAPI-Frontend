import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderedWowSearchComponent } from './component/ordered-wow-search/ordered-wow-search.component';
import { RandomWowSearchComponent } from './component/random-wow-search/random-wow-search.component';

const routes: Routes = [
  { path: 'random', component: RandomWowSearchComponent },
  { path: 'ordered', component: OrderedWowSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
