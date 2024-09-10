import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormintelComponent} from "./formintel/formintel.component";
import {IntlComponent} from "./intl/intl.component";

const routes: Routes = [
  {path: 'phone', component: FormintelComponent, title: 'Phone Input'},
  {path: 'intl', component: IntlComponent, title: 'Phone Input'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
