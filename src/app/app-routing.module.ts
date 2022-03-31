import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HorseRacingComponent } from './components/horse-racing/horse-racing.component';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  // { path: 'task/hipodromo', component: HipodromoComponent,
  //   children:
  //     [
  //       { path: 'dropdown-hipodromo', component: DropdownHipodromoComponent }
  //     ]
  // },
  { path: 'app', component: HorseRacingComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
