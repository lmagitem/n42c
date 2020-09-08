import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INinthObjective } from 'app/shared/model/ninth-objective.model';

type EntityResponseType = HttpResponse<INinthObjective>;
type EntityArrayResponseType = HttpResponse<INinthObjective[]>;

@Injectable({ providedIn: 'root' })
export class NinthObjectiveService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-objectives';

  constructor(protected http: HttpClient) {}

  create(ninthObjective: INinthObjective): Observable<EntityResponseType> {
    return this.http.post<INinthObjective>(this.resourceUrl, ninthObjective, { observe: 'response' });
  }

  update(ninthObjective: INinthObjective): Observable<EntityResponseType> {
    return this.http.put<INinthObjective>(this.resourceUrl, ninthObjective, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INinthObjective>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INinthObjective[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
