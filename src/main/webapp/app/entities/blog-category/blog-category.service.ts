import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBlogCategory } from 'app/shared/model/blog-category.model';

type EntityResponseType = HttpResponse<IBlogCategory>;
type EntityArrayResponseType = HttpResponse<IBlogCategory[]>;

@Injectable({ providedIn: 'root' })
export class BlogCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/blog-categories';

  constructor(protected http: HttpClient) {}

  create(blogCategory: IBlogCategory): Observable<EntityResponseType> {
    return this.http.post<IBlogCategory>(this.resourceUrl, blogCategory, { observe: 'response' });
  }

  update(blogCategory: IBlogCategory): Observable<EntityResponseType> {
    return this.http.put<IBlogCategory>(this.resourceUrl, blogCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBlogCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBlogCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
