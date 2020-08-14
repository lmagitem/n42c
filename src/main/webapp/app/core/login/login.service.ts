import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { AuthServerProvider } from 'app/core/auth/auth-session.service';
import { Logout } from './logout.model';
import { InfoResponse, ProfileInfo } from 'app/layouts/profiles/profile-info.model';
import { map, shareReplay, filter, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'app/layouts/profiles/profile.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private location: Location, private authServerProvider: AuthServerProvider) {}

  login(): void {
    location.href = `${location.origin}${this.location.prepareExternalUrl('oauth2/authorization/oidc')}`;
  }

  logout(): void {
    this.authServerProvider.logout().subscribe((logout: Logout) => {
      window.location.href = `${logout.logoutUrl}?client_id=${logout.clientId}&logout_uri=${location.origin}`;
    });
  }
}
