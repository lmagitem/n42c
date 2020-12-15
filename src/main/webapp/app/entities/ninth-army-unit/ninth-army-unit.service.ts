import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {INinthArmyUnit} from 'app/shared/model/ninth-army-unit.model';

type EntityResponseType = HttpResponse<INinthArmyUnit>;
type EntityArrayResponseType = HttpResponse<INinthArmyUnit[]>;

@Injectable({ providedIn: 'root' })
export class NinthArmyUnitService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-army-units';

  constructor(protected http: HttpClient) {}

  create(ninthArmyUnit: INinthArmyUnit): Observable<EntityResponseType> {
    return this.http.post<INinthArmyUnit>(this.resourceUrl, ninthArmyUnit, { observe: 'response' });
  }

  update(ninthArmyUnit: INinthArmyUnit): Observable<EntityResponseType> {
    return this.http.put<INinthArmyUnit>(this.resourceUrl, ninthArmyUnit, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INinthArmyUnit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INinthArmyUnit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
