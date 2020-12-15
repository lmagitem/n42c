import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IProfilePartSkill} from 'app/shared/model/profile-part-skill.model';

type EntityResponseType = HttpResponse<IProfilePartSkill>;
type EntityArrayResponseType = HttpResponse<IProfilePartSkill[]>;

@Injectable({ providedIn: 'root' })
export class ProfilePartSkillService {
  public resourceUrl = SERVER_API_URL + 'api/profile-part-skills';

  constructor(protected http: HttpClient) {}

  create(profilePartSkill: IProfilePartSkill): Observable<EntityResponseType> {
    return this.http.post<IProfilePartSkill>(this.resourceUrl, profilePartSkill, { observe: 'response' });
  }

  update(profilePartSkill: IProfilePartSkill): Observable<EntityResponseType> {
    return this.http.put<IProfilePartSkill>(this.resourceUrl, profilePartSkill, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfilePartSkill>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfilePartSkill[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
