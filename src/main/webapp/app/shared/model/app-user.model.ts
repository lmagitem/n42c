import {IUser} from 'app/core/user/user.model';
import {IBlog} from 'app/shared/model/blog.model';
import {IAppUserProfile} from 'app/shared/model/app-user-profile.model';
import {IPlayer} from 'app/shared/model/player.model';
import {IProduct} from 'app/shared/model/product.model';
import {IBlogPost} from 'app/shared/model/blog-post.model';
import {AppUserRights} from 'app/shared/model/enumerations/app-user-rights.model';

export interface IAppUser {
  id?: number;
  userName?: string;
  displayedName?: string;
  admin?: boolean;
  shopRights?: AppUserRights;
  blogRights?: AppUserRights;
  profileRights?: AppUserRights;
  scriptoriumRights?: AppUserRights;
  user?: IUser;
  blogs?: IBlog[];
  profiles?: IAppUserProfile[];
  givenFriendships?: IAppUser[];
  askedFriendRequests?: IAppUser[];
  player?: IPlayer;
  receivedFriendships?: IAppUser[];
  pendingFriendRequests?: IAppUser[];
  products?: IProduct[];
  posts?: IBlogPost[];
}

export class AppUser implements IAppUser {
  constructor(
    public id?: number,
    public userName?: string,
    public displayedName?: string,
    public admin?: boolean,
    public shopRights?: AppUserRights,
    public blogRights?: AppUserRights,
    public profileRights?: AppUserRights,
    public scriptoriumRights?: AppUserRights,
    public user?: IUser,
    public blogs?: IBlog[],
    public profiles?: IAppUserProfile[],
    public givenFriendships?: IAppUser[],
    public askedFriendRequests?: IAppUser[],
    public player?: IPlayer,
    public receivedFriendships?: IAppUser[],
    public pendingFriendRequests?: IAppUser[],
    public products?: IProduct[],
    public posts?: IBlogPost[]
  ) {
    this.admin = this.admin || false;
  }
}
