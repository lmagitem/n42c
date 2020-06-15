import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAppUserProfile } from 'app/shared/model/app-user-profile.model';

type EntityResponseType = HttpResponse<IAppUserProfile>;
type EntityArrayResponseType = HttpResponse<IAppUserProfile[]>;

@Injectable({ providedIn: 'root' })
export class AppUserProfileService {
  public resourceUrl = SERVER_API_URL + 'api/app-user-profiles';

  constructor(protected http: HttpClient) {}

  create(appUserProfile: IAppUserProfile): Observable<EntityResponseType> {
    return this.http.post<IAppUserProfile>(this.resourceUrl, appUserProfile, { observe: 'response' });
  }

  update(appUserProfile: IAppUserProfile): Observable<EntityResponseType> {
    return this.http.put<IAppUserProfile>(this.resourceUrl, appUserProfile, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAppUserProfile>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAppUserProfile[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
