import {Route} from '@angular/router';
import {AccountComponent} from "app/user/account/account.component";

export const accountRoute: Route = {
  path: '',
  component: AccountComponent,
  data: {
    pageTitle: 'account.title',
  },
};
