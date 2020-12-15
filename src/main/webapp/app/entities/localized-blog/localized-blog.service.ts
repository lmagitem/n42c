import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {ILocalizedBlog} from 'app/shared/model/localized-blog.model';

type EntityResponseType = HttpResponse<ILocalizedBlog>;
type EntityArrayResponseType = HttpResponse<ILocalizedBlog[]>;

@Injectable({providedIn: 'root'})
export class LocalizedBlogService {
  public resourceUrl = SERVER_API_URL + 'api/localized-blogs';

  constructor(protected http: HttpClient) {
  }

  create(localizedBlog: ILocalizedBlog): Observable<EntityResponseType> {
    return this.http.post<ILocalizedBlog>(this.resourceUrl, localizedBlog, {observe: 'response'});
  }

  update(localizedBlog: ILocalizedBlog): Observable<EntityResponseType> {
    return this.http.put<ILocalizedBlog>(this.resourceUrl, localizedBlog, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocalizedBlog>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalizedBlog[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  queryFor(ids: any[]): Observable<EntityArrayResponseType> {
    return this.http.get<ILocalizedBlog[]>(this.resourceUrl + '/for', {
      params: new HttpParams().append('ids', ids.join(', ')),
      observe: 'response',
    });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }
}
