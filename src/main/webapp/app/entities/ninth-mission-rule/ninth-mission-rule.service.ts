import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INinthMissionRule } from 'app/shared/model/ninth-mission-rule.model';

type EntityResponseType = HttpResponse<INinthMissionRule>;
type EntityArrayResponseType = HttpResponse<INinthMissionRule[]>;

@Injectable({ providedIn: 'root' })
export class NinthMissionRuleService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-mission-rules';

  constructor(protected http: HttpClient) {}

  create(ninthMissionRule: INinthMissionRule): Observable<EntityResponseType> {
    return this.http.post<INinthMissionRule>(this.resourceUrl, ninthMissionRule, { observe: 'response' });
  }

  update(ninthMissionRule: INinthMissionRule): Observable<EntityResponseType> {
    return this.http.put<INinthMissionRule>(this.resourceUrl, ninthMissionRule, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INinthMissionRule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INinthMissionRule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
