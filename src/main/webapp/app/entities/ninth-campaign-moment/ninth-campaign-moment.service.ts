import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {INinthCampaignMoment} from 'app/shared/model/ninth-campaign-moment.model';
import {DATE_TIME_FORMAT} from 'app/shared/constants/input.constants';

type EntityResponseType = HttpResponse<INinthCampaignMoment>;
type EntityArrayResponseType = HttpResponse<INinthCampaignMoment[]>;

@Injectable({ providedIn: 'root' })
export class NinthCampaignMomentService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-campaign-moments';

  constructor(protected http: HttpClient) {}

  create(ninthCampaignMoment: INinthCampaignMoment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ninthCampaignMoment);
    return this.http
      .post<INinthCampaignMoment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ninthCampaignMoment: INinthCampaignMoment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ninthCampaignMoment);
    return this.http
      .put<INinthCampaignMoment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INinthCampaignMoment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INinthCampaignMoment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ninthCampaignMoment: INinthCampaignMoment): INinthCampaignMoment {
    const copy: INinthCampaignMoment = Object.assign({}, ninthCampaignMoment, {
      sinceInstant:
        ninthCampaignMoment.sinceInstant && ninthCampaignMoment.sinceInstant.isValid()
          ? ninthCampaignMoment.sinceInstant.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.sinceInstant = res.body.sinceInstant ? moment(res.body.sinceInstant, DATE_TIME_FORMAT) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ninthCampaignMoment: INinthCampaignMoment) => {
        ninthCampaignMoment.sinceInstant = ninthCampaignMoment.sinceInstant ? moment(ninthCampaignMoment.sinceInstant) : undefined;
      });
    }
    return res;
  }
}
