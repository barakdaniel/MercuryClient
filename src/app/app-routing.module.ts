import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlatformComponent } from './platform/platform.component';

const routes = [
  {path: '', component: PlatformComponent},
  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
