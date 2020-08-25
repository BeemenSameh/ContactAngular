import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { LoginService } from '../pages/authentication/login/login.service';

const routes = [
    {
        path        : 'contacts',
        loadChildren: './contacts/contacts.module#ContactsModule'
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    providers: [LoginService],
})
export class AppsModule
{
}
