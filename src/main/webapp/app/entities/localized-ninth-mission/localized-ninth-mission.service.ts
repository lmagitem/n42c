import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILocalizedNinthMission } from 'app/shared/model/localized-ninth-mission.model';

type EntityResponseType = HttpResponse<ILocalizedNinthMission>;
type EntityArrayResponseType = HttpResponse<ILocalizedNinthMission[]>;

@Injectable({ providedIn: 'root' })
export class LocalizedNinthMissionService {
  public resourceUrl = SERVER_API_URL + 'api/localized-ninth-missions';

  constructor(protected http: HttpClient) {}

  create(localizedNinthMission: ILocalizedNinthMission): Observable<EntityResponseType> {
    return this.http.post<ILocalizedNinthMission>(this.resourceUrl, localizedNinthMission, { observe: 'response' });
  }

  update(localizedNinthMission: ILocalizedNinthMission): Observable<EntityResponseType> {
    return this.http.put<ILocalizedNinthMission>(this.resourceUrl, localizedNinthMission, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocalizedNinthMission>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalizedNinthMission[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
