import { IUser } from 'app/core/user/user.model';
import { IBlogPost } from 'app/shared/model/blog-post.model';
import { IAppUserProfile } from 'app/shared/model/app-user-profile.model';
import { AppUserRights } from 'app/shared/model/enumerations/app-user-rights.model';

export interface IAppUser {
  id?: number;
  userName?: string;
  displayedName?: string;
  email?: string;
  admin?: boolean;
  rights?: AppUserRights;
  user?: IUser;
  blogPosts?: IBlogPost[];
  appUserProfiles?: IAppUserProfile[];
}

export class AppUser implements IAppUser {
  constructor(
    public id?: number,
    public userName?: string,
    public displayedName?: string,
    public email?: string,
    public admin?: boolean,
    public rights?: AppUserRights,
    public user?: IUser,
    public blogPosts?: IBlogPost[],
    public appUserProfiles?: IAppUserProfile[]
  ) {
    this.admin = this.admin || false;
  }
}
