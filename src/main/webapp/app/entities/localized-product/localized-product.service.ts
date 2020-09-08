import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILocalizedProduct } from 'app/shared/model/localized-product.model';

type EntityResponseType = HttpResponse<ILocalizedProduct>;
type EntityArrayResponseType = HttpResponse<ILocalizedProduct[]>;

@Injectable({ providedIn: 'root' })
export class LocalizedProductService {
  public resourceUrl = SERVER_API_URL + 'api/localized-products';

  constructor(protected http: HttpClient) {}

  create(localizedProduct: ILocalizedProduct): Observable<EntityResponseType> {
    return this.http.post<ILocalizedProduct>(this.resourceUrl, localizedProduct, { observe: 'response' });
  }

  update(localizedProduct: ILocalizedProduct): Observable<EntityResponseType> {
    return this.http.put<ILocalizedProduct>(this.resourceUrl, localizedProduct, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocalizedProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalizedProduct[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
