import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {INinthMission} from 'app/shared/model/ninth-mission.model';

type EntityResponseType = HttpResponse<INinthMission>;
type EntityArrayResponseType = HttpResponse<INinthMission[]>;

@Injectable({providedIn: 'root'})
export class NinthMissionService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-missions';

  constructor(protected http: HttpClient) {
  }

  create(ninthMission: INinthMission): Observable<EntityResponseType> {
    return this.http.post<INinthMission>(this.resourceUrl, ninthMission, {observe: 'response'});
  }

  update(ninthMission: INinthMission): Observable<EntityResponseType> {
    return this.http.put<INinthMission>(this.resourceUrl, ninthMission, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INinthMission>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INinthMission[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }
}
