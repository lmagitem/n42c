import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILocalizedBlogCategory } from 'app/shared/model/localized-blog-category.model';

type EntityResponseType = HttpResponse<ILocalizedBlogCategory>;
type EntityArrayResponseType = HttpResponse<ILocalizedBlogCategory[]>;

@Injectable({ providedIn: 'root' })
export class LocalizedBlogCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/localized-blog-categories';

  constructor(protected http: HttpClient) {}

  create(localizedBlogCategory: ILocalizedBlogCategory): Observable<EntityResponseType> {
    return this.http.post<ILocalizedBlogCategory>(this.resourceUrl, localizedBlogCategory, { observe: 'response' });
  }

  update(localizedBlogCategory: ILocalizedBlogCategory): Observable<EntityResponseType> {
    return this.http.put<ILocalizedBlogCategory>(this.resourceUrl, localizedBlogCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocalizedBlogCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalizedBlogCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
