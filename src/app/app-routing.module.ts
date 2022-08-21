import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WowSearchComponent } from './component/wow-search/wow-search.component';

const routes: Routes = [
  { path: 'search', component: WowSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
