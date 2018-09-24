import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SetupComponent } from './views/setup/setup.component';
import { VerifyUserComponent } from './views/verify-user/verify-user.component';
import { VerifyUserGuard } from './core/guards/verify-user.guard';
import { TaskSummaryComponent } from './views/task-summary/task-summary.component';
import { CurrentUserGuard } from './core/guards/current-user.guard';
import { FormViewComponent } from './views/form-view/form-view.component';
import { FormByUserResolver } from './core/resolvers/form-by-user.resolver';
import { UserResolver } from './core/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'verify-user',
    component: VerifyUserComponent,
    canActivate: [VerifyUserGuard]
  },
  {
    path: 'task-summary/:userId',
    component: TaskSummaryComponent,
    canActivate: [CurrentUserGuard],
    resolve: [UserResolver]
  },
  {
    path: 'form/:userId/:formCode',
    component: FormViewComponent,
    canActivate: [CurrentUserGuard],
    resolve: [FormByUserResolver, UserResolver]
  },
  {
    path: 'setup',
    component: SetupComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
