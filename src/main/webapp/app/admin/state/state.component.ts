import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {StateService} from './state.service';
import {Observable} from "rxjs";
import {Account} from "app/core/user/account.model";

@Component({
  selector: 'jhi-state',
  templateUrl: './state.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateComponent implements OnInit {

  constructor(private stateService: StateService) {
  }

  ngOnInit(): void {
  }

  getAccount(): Observable<Account | null> {
    return this.stateService.getAccount();
  }
}
