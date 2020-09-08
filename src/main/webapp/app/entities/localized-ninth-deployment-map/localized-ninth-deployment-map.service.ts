import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILocalizedNinthDeploymentMap } from 'app/shared/model/localized-ninth-deployment-map.model';

type EntityResponseType = HttpResponse<ILocalizedNinthDeploymentMap>;
type EntityArrayResponseType = HttpResponse<ILocalizedNinthDeploymentMap[]>;

@Injectable({ providedIn: 'root' })
export class LocalizedNinthDeploymentMapService {
  public resourceUrl = SERVER_API_URL + 'api/localized-ninth-deployment-maps';

  constructor(protected http: HttpClient) {}

  create(localizedNinthDeploymentMap: ILocalizedNinthDeploymentMap): Observable<EntityResponseType> {
    return this.http.post<ILocalizedNinthDeploymentMap>(this.resourceUrl, localizedNinthDeploymentMap, { observe: 'response' });
  }

  update(localizedNinthDeploymentMap: ILocalizedNinthDeploymentMap): Observable<EntityResponseType> {
    return this.http.put<ILocalizedNinthDeploymentMap>(this.resourceUrl, localizedNinthDeploymentMap, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocalizedNinthDeploymentMap>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocalizedNinthDeploymentMap[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
