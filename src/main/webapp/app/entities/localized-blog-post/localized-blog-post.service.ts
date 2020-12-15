import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {ILocalizedBlogPost} from 'app/shared/model/localized-blog-post.model';

type EntityResponseType = HttpResponse<ILocalizedBlogPost>;
type EntityArrayResponseType = HttpResponse<ILocalizedBlogPost[]>;

@Injectable({ providedIn: 'root' })
export class LocalizedBlogPostService {
  public resourceUrl = SERVER_API_URL + 'api/localized-blog-posts';

  constructor(protected http: HttpClient) {}

  create(localizedBlogPost: ILocalizedBlogPost): Observable<EntityResponseType> {
    return this.http.post<ILocalizedBlogPost>(this.resourceUrl, localizedBlogPost, { observe: 'response' });
  }

  update(localizedBlogPost: ILocalizedBlogPost): Observable<EntityResponseType> {
    return this.http.put<ILocalizedBlogPost>(this.resourceUrl, localizedBlogPost, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocalizedBlogPost>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalizedBlogPost[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryFor(ids: any[]): Observable<EntityArrayResponseType> {
    return this.http.get<ILocalizedBlogPost[]>(this.resourceUrl + '/for', {
      params: new HttpParams().append('ids', ids.join(', ')),
      observe: 'response',
    });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
