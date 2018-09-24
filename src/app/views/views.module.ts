import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '../core/services/auth/auth.module';
import { SetupComponent } from './setup/setup.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { TaskSummaryComponent } from './task-summary/task-summary.component';
import { FormViewComponent } from './form-view/form-view.component';
import { ComponentsModule } from '../components/components.module';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogComponent } from '../components/dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AuthModule,
    ComponentsModule
  ],
  declarations: [LoginComponent, SetupComponent, VerifyUserComponent, TaskSummaryComponent, FormViewComponent],
  providers: [MatSnackBar, MatDialog],
  entryComponents: [DialogComponent]
})
export class ViewsModule { }
