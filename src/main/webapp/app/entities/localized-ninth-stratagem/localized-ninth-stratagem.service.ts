import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILocalizedNinthStratagem } from 'app/shared/model/localized-ninth-stratagem.model';

type EntityResponseType = HttpResponse<ILocalizedNinthStratagem>;
type EntityArrayResponseType = HttpResponse<ILocalizedNinthStratagem[]>;

@Injectable({ providedIn: 'root' })
export class LocalizedNinthStratagemService {
  public resourceUrl = SERVER_API_URL + 'api/localized-ninth-stratagems';

  constructor(protected http: HttpClient) {}

  create(localizedNinthStratagem: ILocalizedNinthStratagem): Observable<EntityResponseType> {
    return this.http.post<ILocalizedNinthStratagem>(this.resourceUrl, localizedNinthStratagem, { observe: 'response' });
  }

  update(localizedNinthStratagem: ILocalizedNinthStratagem): Observable<EntityResponseType> {
    return this.http.put<ILocalizedNinthStratagem>(this.resourceUrl, localizedNinthStratagem, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocalizedNinthStratagem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalizedNinthStratagem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
