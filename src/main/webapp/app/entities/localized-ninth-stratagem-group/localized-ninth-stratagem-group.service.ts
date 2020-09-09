import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILocalizedNinthStratagemGroup } from 'app/shared/model/localized-ninth-stratagem-group.model';

type EntityResponseType = HttpResponse<ILocalizedNinthStratagemGroup>;
type EntityArrayResponseType = HttpResponse<ILocalizedNinthStratagemGroup[]>;

@Injectable({ providedIn: 'root' })
export class LocalizedNinthStratagemGroupService {
  public resourceUrl = SERVER_API_URL + 'api/localized-ninth-stratagem-groups';

  constructor(protected http: HttpClient) {}

  create(localizedNinthStratagemGroup: ILocalizedNinthStratagemGroup): Observable<EntityResponseType> {
    return this.http.post<ILocalizedNinthStratagemGroup>(this.resourceUrl, localizedNinthStratagemGroup, { observe: 'response' });
  }

  update(localizedNinthStratagemGroup: ILocalizedNinthStratagemGroup): Observable<EntityResponseType> {
    return this.http.put<ILocalizedNinthStratagemGroup>(this.resourceUrl, localizedNinthStratagemGroup, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocalizedNinthStratagemGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalizedNinthStratagemGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
