import {AppUser} from 'app/shared/model/app-user.model';

export class Account {
  constructor(
    public id: string,
    public login: string,
    public email: string,
    public activated: boolean,
    public authorities: string[],
    public langKey: string,
    public imageUrl: string,
    public appUser: AppUser
  ) {
  }
}
