import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INinthBattle } from 'app/shared/model/ninth-battle.model';

type EntityResponseType = HttpResponse<INinthBattle>;
type EntityArrayResponseType = HttpResponse<INinthBattle[]>;

@Injectable({ providedIn: 'root' })
export class NinthBattleService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-battles';

  constructor(protected http: HttpClient) {}

  create(ninthBattle: INinthBattle): Observable<EntityResponseType> {
    return this.http.post<INinthBattle>(this.resourceUrl, ninthBattle, { observe: 'response' });
  }

  update(ninthBattle: INinthBattle): Observable<EntityResponseType> {
    return this.http.put<INinthBattle>(this.resourceUrl, ninthBattle, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INinthBattle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INinthBattle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
