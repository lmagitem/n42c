import {Route} from '@angular/router';

import {StateComponent} from './state.component';

export const stateRoute: Route = {
  path: '',
  component: StateComponent,
  data: {
    pageTitle: 'state.title',
  },
};
