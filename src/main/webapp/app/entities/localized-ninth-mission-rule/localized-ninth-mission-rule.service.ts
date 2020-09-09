import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILocalizedNinthMissionRule } from 'app/shared/model/localized-ninth-mission-rule.model';

type EntityResponseType = HttpResponse<ILocalizedNinthMissionRule>;
type EntityArrayResponseType = HttpResponse<ILocalizedNinthMissionRule[]>;

@Injectable({ providedIn: 'root' })
export class LocalizedNinthMissionRuleService {
  public resourceUrl = SERVER_API_URL + 'api/localized-ninth-mission-rules';

  constructor(protected http: HttpClient) {}

  create(localizedNinthMissionRule: ILocalizedNinthMissionRule): Observable<EntityResponseType> {
    return this.http.post<ILocalizedNinthMissionRule>(this.resourceUrl, localizedNinthMissionRule, { observe: 'response' });
  }

  update(localizedNinthMissionRule: ILocalizedNinthMissionRule): Observable<EntityResponseType> {
    return this.http.put<ILocalizedNinthMissionRule>(this.resourceUrl, localizedNinthMissionRule, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocalizedNinthMissionRule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalizedNinthMissionRule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
