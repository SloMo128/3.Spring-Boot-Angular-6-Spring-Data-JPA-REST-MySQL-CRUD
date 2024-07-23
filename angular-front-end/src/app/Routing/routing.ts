import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from '../Page/List/list.customer';
import { PageNotFoundComponent } from '../Page/Page-not-found/page.not.found.component';
import { EditComponent } from '../Page/Edit/edit.customer';
import { AddComponent } from '../Page/Add/add.customer';
import { SearchComponent } from '../Page/Search/search.component';


const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'add', component: AddComponent},
  { path: 'edit', component: EditComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
