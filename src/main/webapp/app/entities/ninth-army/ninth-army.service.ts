import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {INinthArmy} from 'app/shared/model/ninth-army.model';

type EntityResponseType = HttpResponse<INinthArmy>;
type EntityArrayResponseType = HttpResponse<INinthArmy[]>;

@Injectable({providedIn: 'root'})
export class NinthArmyService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-armies';

  constructor(protected http: HttpClient) {
  }

  create(ninthArmy: INinthArmy): Observable<EntityResponseType> {
    return this.http.post<INinthArmy>(this.resourceUrl, ninthArmy, {observe: 'response'});
  }

  update(ninthArmy: INinthArmy): Observable<EntityResponseType> {
    return this.http.put<INinthArmy>(this.resourceUrl, ninthArmy, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INinthArmy>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INinthArmy[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }
}
