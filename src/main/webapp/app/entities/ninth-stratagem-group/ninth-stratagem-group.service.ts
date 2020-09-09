import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';

type EntityResponseType = HttpResponse<INinthStratagemGroup>;
type EntityArrayResponseType = HttpResponse<INinthStratagemGroup[]>;

@Injectable({ providedIn: 'root' })
export class NinthStratagemGroupService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-stratagem-groups';

  constructor(protected http: HttpClient) {}

  create(ninthStratagemGroup: INinthStratagemGroup): Observable<EntityResponseType> {
    return this.http.post<INinthStratagemGroup>(this.resourceUrl, ninthStratagemGroup, { observe: 'response' });
  }

  update(ninthStratagemGroup: INinthStratagemGroup): Observable<EntityResponseType> {
    return this.http.put<INinthStratagemGroup>(this.resourceUrl, ninthStratagemGroup, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INinthStratagemGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INinthStratagemGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
