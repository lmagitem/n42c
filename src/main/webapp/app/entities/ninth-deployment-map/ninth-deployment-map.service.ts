import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INinthDeploymentMap } from 'app/shared/model/ninth-deployment-map.model';

type EntityResponseType = HttpResponse<INinthDeploymentMap>;
type EntityArrayResponseType = HttpResponse<INinthDeploymentMap[]>;

@Injectable({ providedIn: 'root' })
export class NinthDeploymentMapService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-deployment-maps';

  constructor(protected http: HttpClient) {}

  create(ninthDeploymentMap: INinthDeploymentMap): Observable<EntityResponseType> {
    return this.http.post<INinthDeploymentMap>(this.resourceUrl, ninthDeploymentMap, { observe: 'response' });
  }

  update(ninthDeploymentMap: INinthDeploymentMap): Observable<EntityResponseType> {
    return this.http.put<INinthDeploymentMap>(this.resourceUrl, ninthDeploymentMap, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INinthDeploymentMap>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INinthDeploymentMap[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
