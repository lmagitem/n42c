import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INinthArmyMoment } from 'app/shared/model/ninth-army-moment.model';

type EntityResponseType = HttpResponse<INinthArmyMoment>;
type EntityArrayResponseType = HttpResponse<INinthArmyMoment[]>;

@Injectable({ providedIn: 'root' })
export class NinthArmyMomentService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-army-moments';

  constructor(protected http: HttpClient) {}

  create(ninthArmyMoment: INinthArmyMoment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ninthArmyMoment);
    return this.http
      .post<INinthArmyMoment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ninthArmyMoment: INinthArmyMoment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ninthArmyMoment);
    return this.http
      .put<INinthArmyMoment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INinthArmyMoment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INinthArmyMoment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ninthArmyMoment: INinthArmyMoment): INinthArmyMoment {
    const copy: INinthArmyMoment = Object.assign({}, ninthArmyMoment, {
      sinceInstant:
        ninthArmyMoment.sinceInstant && ninthArmyMoment.sinceInstant.isValid() ? ninthArmyMoment.sinceInstant.toJSON() : undefined,
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
      res.body.forEach((ninthArmyMoment: INinthArmyMoment) => {
        ninthArmyMoment.sinceInstant = ninthArmyMoment.sinceInstant ? moment(ninthArmyMoment.sinceInstant) : undefined;
      });
    }
    return res;
  }
}
