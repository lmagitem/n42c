import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {INinthUnit} from 'app/shared/model/ninth-unit.model';

type EntityResponseType = HttpResponse<INinthUnit>;
type EntityArrayResponseType = HttpResponse<INinthUnit[]>;

@Injectable({providedIn: 'root'})
export class NinthUnitService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-units';

  constructor(protected http: HttpClient) {
  }

  create(ninthUnit: INinthUnit): Observable<EntityResponseType> {
    return this.http.post<INinthUnit>(this.resourceUrl, ninthUnit, {observe: 'response'});
  }

  update(ninthUnit: INinthUnit): Observable<EntityResponseType> {
    return this.http.put<INinthUnit>(this.resourceUrl, ninthUnit, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INinthUnit>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INinthUnit[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }
}
