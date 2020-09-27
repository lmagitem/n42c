import {IProfilePart} from 'app/shared/model/profile-part.model';
import {IAppUser} from 'app/shared/model/app-user.model';
import {Language} from 'app/shared/model/enumerations/language.model';

export interface IAppUserProfile {
  id?: number;
  name?: string;
  title?: string;
  summary?: string;
  headerBackgroundURI?: string;
  language?: Language;
  profileParts?: IProfilePart[];
  user?: IAppUser;
}

export class AppUserProfile implements IAppUserProfile {
  constructor(
    public id?: number,
    public name?: string,
    public title?: string,
    public summary?: string,
    public headerBackgroundURI?: string,
    public language?: Language,
    public profileParts?: IProfilePart[],
    public user?: IAppUser
  ) {}
}
