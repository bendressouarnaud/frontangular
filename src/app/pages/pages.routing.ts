import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { PricingComponent } from './pricing/pricing.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { GetmailComponent } from './getmail/getmail.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

export const PagesRoutes: Routes = [

    {
        path: '',
        children: [ {
            path: 'login',
            component: LoginComponent
        }, {
            path: 'lock',
            component: LockComponent
        }, {
            path: 'register',
            component: RegisterComponent
        }, {
            path: 'pricing',
            component: PricingComponent
        }, {
            path: 'pwdchange',
            component: PasswordchangeComponent
        }, {
            path: 'email',
            component: GetmailComponent
        }
        , {
            path: 'rstpwd',
            component: ResetpasswordComponent
        }
    ]
    }
];
