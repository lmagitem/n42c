import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILocalizedPostContent } from 'app/shared/model/localized-post-content.model';

type EntityResponseType = HttpResponse<ILocalizedPostContent>;
type EntityArrayResponseType = HttpResponse<ILocalizedPostContent[]>;

@Injectable({ providedIn: 'root' })
export class LocalizedPostContentService {
  public resourceUrl = SERVER_API_URL + 'api/localized-post-contents';

  constructor(protected http: HttpClient) {}

  create(localizedPostContent: ILocalizedPostContent): Observable<EntityResponseType> {
    return this.http.post<ILocalizedPostContent>(this.resourceUrl, localizedPostContent, { observe: 'response' });
  }

  update(localizedPostContent: ILocalizedPostContent): Observable<EntityResponseType> {
    return this.http.put<ILocalizedPostContent>(this.resourceUrl, localizedPostContent, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocalizedPostContent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalizedPostContent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryFor(ids: any[]): Observable<EntityArrayResponseType> {
    return this.http.get<ILocalizedPostContent[]>(this.resourceUrl + '/for', {
      params: new HttpParams().append('ids', ids.join(', ')),
      observe: 'response',
    });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
