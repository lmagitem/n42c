import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILocalizedNinthObjective } from 'app/shared/model/localized-ninth-objective.model';

type EntityResponseType = HttpResponse<ILocalizedNinthObjective>;
type EntityArrayResponseType = HttpResponse<ILocalizedNinthObjective[]>;

@Injectable({ providedIn: 'root' })
export class LocalizedNinthObjectiveService {
  public resourceUrl = SERVER_API_URL + 'api/localized-ninth-objectives';

  constructor(protected http: HttpClient) {}

  create(localizedNinthObjective: ILocalizedNinthObjective): Observable<EntityResponseType> {
    return this.http.post<ILocalizedNinthObjective>(this.resourceUrl, localizedNinthObjective, { observe: 'response' });
  }

  update(localizedNinthObjective: ILocalizedNinthObjective): Observable<EntityResponseType> {
    return this.http.put<ILocalizedNinthObjective>(this.resourceUrl, localizedNinthObjective, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocalizedNinthObjective>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalizedNinthObjective[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
