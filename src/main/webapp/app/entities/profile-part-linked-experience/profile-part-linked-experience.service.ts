import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfilePartLinkedExperience } from 'app/shared/model/profile-part-linked-experience.model';

type EntityResponseType = HttpResponse<IProfilePartLinkedExperience>;
type EntityArrayResponseType = HttpResponse<IProfilePartLinkedExperience[]>;

@Injectable({ providedIn: 'root' })
export class ProfilePartLinkedExperienceService {
  public resourceUrl = SERVER_API_URL + 'api/profile-part-linked-experiences';

  constructor(protected http: HttpClient) {}

  create(profilePartLinkedExperience: IProfilePartLinkedExperience): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(profilePartLinkedExperience);
    return this.http
      .post<IProfilePartLinkedExperience>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(profilePartLinkedExperience: IProfilePartLinkedExperience): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(profilePartLinkedExperience);
    return this.http
      .put<IProfilePartLinkedExperience>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProfilePartLinkedExperience>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProfilePartLinkedExperience[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(profilePartLinkedExperience: IProfilePartLinkedExperience): IProfilePartLinkedExperience {
    const copy: IProfilePartLinkedExperience = Object.assign({}, profilePartLinkedExperience, {
      date:
        profilePartLinkedExperience.date && profilePartLinkedExperience.date.isValid()
          ? profilePartLinkedExperience.date.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((profilePartLinkedExperience: IProfilePartLinkedExperience) => {
        profilePartLinkedExperience.date = profilePartLinkedExperience.date ? moment(profilePartLinkedExperience.date) : undefined;
      });
    }
    return res;
  }
}
