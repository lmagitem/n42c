import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INinthArmyUnitMoment } from 'app/shared/model/ninth-army-unit-moment.model';

type EntityResponseType = HttpResponse<INinthArmyUnitMoment>;
type EntityArrayResponseType = HttpResponse<INinthArmyUnitMoment[]>;

@Injectable({ providedIn: 'root' })
export class NinthArmyUnitMomentService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-army-unit-moments';

  constructor(protected http: HttpClient) {}

  create(ninthArmyUnitMoment: INinthArmyUnitMoment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ninthArmyUnitMoment);
    return this.http
      .post<INinthArmyUnitMoment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ninthArmyUnitMoment: INinthArmyUnitMoment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ninthArmyUnitMoment);
    return this.http
      .put<INinthArmyUnitMoment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INinthArmyUnitMoment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INinthArmyUnitMoment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ninthArmyUnitMoment: INinthArmyUnitMoment): INinthArmyUnitMoment {
    const copy: INinthArmyUnitMoment = Object.assign({}, ninthArmyUnitMoment, {
      sinceInstant:
        ninthArmyUnitMoment.sinceInstant && ninthArmyUnitMoment.sinceInstant.isValid()
          ? ninthArmyUnitMoment.sinceInstant.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.sinceInstant = res.body.sinceInstant ? moment(res.body.sinceInstant) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ninthArmyUnitMoment: INinthArmyUnitMoment) => {
        ninthArmyUnitMoment.sinceInstant = ninthArmyUnitMoment.sinceInstant ? moment(ninthArmyUnitMoment.sinceInstant) : undefined;
      });
    }
    return res;
  }
}
