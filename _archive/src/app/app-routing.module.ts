import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Page Components */
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { JoinComponent } from './join/join.component';
import { MerchandiseComponent } from './merchandise/merchandise.component';
import { NewsComponent } from './news/news.component';
import { OutbreakComponent } from './outbreak/outbreak.component';
import { DataTableComponent } from './data-table/data-table.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent},
  { path: 'join', component: JoinComponent},
  { path: 'shopping', component: MerchandiseComponent},
  { path: 'news', component: NewsComponent},
  { path: 'outbreak', component: OutbreakComponent},
  {path: 'test', component: DataTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
