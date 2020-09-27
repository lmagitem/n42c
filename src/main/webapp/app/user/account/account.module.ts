import {N42CSharedModule} from "app/shared/shared.module";
import {accountRoute} from "app/user/account/account.route";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AccountComponent} from "app/user/account/account.component";

@NgModule({
    imports: [N42CSharedModule, RouterModule.forChild([accountRoute])],
  declarations: [AccountComponent]
})
export class AccountModule {
}
