import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './login/login.component';

import { PlatformComponent } from './platform/platform.component';
import { ResearchCreateComponent } from './platform/research-create/research-create.component';
import { RegisterComponent } from './register/register.component';

const routes = [
  { path: '', component: PlatformComponent },//, canActivate: [AuthGuard]},
  { path: 'createresearch', component: ResearchCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
