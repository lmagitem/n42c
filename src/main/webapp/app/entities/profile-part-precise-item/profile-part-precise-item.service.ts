import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfilePartPreciseItem } from 'app/shared/model/profile-part-precise-item.model';

type EntityResponseType = HttpResponse<IProfilePartPreciseItem>;
type EntityArrayResponseType = HttpResponse<IProfilePartPreciseItem[]>;

@Injectable({ providedIn: 'root' })
export class ProfilePartPreciseItemService {
  public resourceUrl = SERVER_API_URL + 'api/profile-part-precise-items';

  constructor(protected http: HttpClient) {}

  create(profilePartPreciseItem: IProfilePartPreciseItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(profilePartPreciseItem);
    return this.http
      .post<IProfilePartPreciseItem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(profilePartPreciseItem: IProfilePartPreciseItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(profilePartPreciseItem);
    return this.http
      .put<IProfilePartPreciseItem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProfilePartPreciseItem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProfilePartPreciseItem[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(profilePartPreciseItem: IProfilePartPreciseItem): IProfilePartPreciseItem {
    const copy: IProfilePartPreciseItem = Object.assign({}, profilePartPreciseItem, {
      start: profilePartPreciseItem.start && profilePartPreciseItem.start.isValid() ? profilePartPreciseItem.start.toJSON() : undefined,
      end: profilePartPreciseItem.end && profilePartPreciseItem.end.isValid() ? profilePartPreciseItem.end.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.start = res.body.start ? moment(res.body.start) : undefined;
      res.body.end = res.body.end ? moment(res.body.end) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((profilePartPreciseItem: IProfilePartPreciseItem) => {
        profilePartPreciseItem.start = profilePartPreciseItem.start ? moment(profilePartPreciseItem.start) : undefined;
        profilePartPreciseItem.end = profilePartPreciseItem.end ? moment(profilePartPreciseItem.end) : undefined;
      });
    }
    return res;
  }
}
