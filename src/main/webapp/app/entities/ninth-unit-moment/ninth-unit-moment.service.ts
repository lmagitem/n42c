import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {INinthUnitMoment} from 'app/shared/model/ninth-unit-moment.model';

type EntityResponseType = HttpResponse<INinthUnitMoment>;
type EntityArrayResponseType = HttpResponse<INinthUnitMoment[]>;

@Injectable({ providedIn: 'root' })
export class NinthUnitMomentService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-unit-moments';

  constructor(protected http: HttpClient) {}

  create(ninthUnitMoment: INinthUnitMoment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ninthUnitMoment);
    return this.http
      .post<INinthUnitMoment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ninthUnitMoment: INinthUnitMoment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ninthUnitMoment);
    return this.http
      .put<INinthUnitMoment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INinthUnitMoment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INinthUnitMoment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ninthUnitMoment: INinthUnitMoment): INinthUnitMoment {
    const copy: INinthUnitMoment = Object.assign({}, ninthUnitMoment, {
      sinceInstant:
        ninthUnitMoment.sinceInstant && ninthUnitMoment.sinceInstant.isValid() ? ninthUnitMoment.sinceInstant.toJSON() : undefined,
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
      res.body.forEach((ninthUnitMoment: INinthUnitMoment) => {
        ninthUnitMoment.sinceInstant = ninthUnitMoment.sinceInstant ? moment(ninthUnitMoment.sinceInstant) : undefined;
      });
    }
    return res;
  }
}
