import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OutbreakComponent } from './outbreak/outbreak.component';
import { AboutComponent } from './about/about.component';
import { NewsComponent } from './news/news.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'outbreak', component: OutbreakComponent},
  { path: 'about', component: AboutComponent },
  { path: 'news', component: NewsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
