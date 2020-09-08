import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INinthCampaign } from 'app/shared/model/ninth-campaign.model';

type EntityResponseType = HttpResponse<INinthCampaign>;
type EntityArrayResponseType = HttpResponse<INinthCampaign[]>;

@Injectable({ providedIn: 'root' })
export class NinthCampaignService {
  public resourceUrl = SERVER_API_URL + 'api/ninth-campaigns';

  constructor(protected http: HttpClient) {}

  create(ninthCampaign: INinthCampaign): Observable<EntityResponseType> {
    return this.http.post<INinthCampaign>(this.resourceUrl, ninthCampaign, { observe: 'response' });
  }

  update(ninthCampaign: INinthCampaign): Observable<EntityResponseType> {
    return this.http.put<INinthCampaign>(this.resourceUrl, ninthCampaign, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INinthCampaign>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INinthCampaign[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
