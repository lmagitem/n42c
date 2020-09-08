import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INinthStratagem } from 'app/shared/model/ninth-stratagem.model';

type EntityResponseType = HttpResponse<INinthStratagem>;
type EntityArrayResponseType = HttpResponse<INinthStratagem[]>;

@Injectable({ providedIn: 'root' })
export class NinthStratagemService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-stratagems';

  constructor(protected http: HttpClient) {}

  create(ninthStratagem: INinthStratagem): Observable<EntityResponseType> {
    return this.http.post<INinthStratagem>(this.resourceUrl, ninthStratagem, { observe: 'response' });
  }

  update(ninthStratagem: INinthStratagem): Observable<EntityResponseType> {
    return this.http.put<INinthStratagem>(this.resourceUrl, ninthStratagem, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INinthStratagem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INinthStratagem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
