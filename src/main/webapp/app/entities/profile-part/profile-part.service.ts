import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfilePart } from 'app/shared/model/profile-part.model';

type EntityResponseType = HttpResponse<IProfilePart>;
type EntityArrayResponseType = HttpResponse<IProfilePart[]>;

@Injectable({ providedIn: 'root' })
export class ProfilePartService {
  public resourceUrl = SERVER_API_URL + 'api/profile-parts';

  constructor(protected http: HttpClient) {}

  create(profilePart: IProfilePart): Observable<EntityResponseType> {
    return this.http.post<IProfilePart>(this.resourceUrl, profilePart, { observe: 'response' });
  }

  update(profilePart: IProfilePart): Observable<EntityResponseType> {
    return this.http.put<IProfilePart>(this.resourceUrl, profilePart, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfilePart>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfilePart[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
