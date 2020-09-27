import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AccountService} from "app/core/auth/account.service";
import {Account} from "app/core/user/account.model";

@Injectable({providedIn: 'root'})
export class StateService {
  constructor(
    private accountService: AccountService) {
  }

  getAccount(): Observable<Account | null> {
    return this.accountService.identity();
  }
}
