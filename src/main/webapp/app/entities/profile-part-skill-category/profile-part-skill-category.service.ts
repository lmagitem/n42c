import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfilePartSkillCategory } from 'app/shared/model/profile-part-skill-category.model';

type EntityResponseType = HttpResponse<IProfilePartSkillCategory>;
type EntityArrayResponseType = HttpResponse<IProfilePartSkillCategory[]>;

@Injectable({ providedIn: 'root' })
export class ProfilePartSkillCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/profile-part-skill-categories';

  constructor(protected http: HttpClient) {}

  create(profilePartSkillCategory: IProfilePartSkillCategory): Observable<EntityResponseType> {
    return this.http.post<IProfilePartSkillCategory>(this.resourceUrl, profilePartSkillCategory, { observe: 'response' });
  }

  update(profilePartSkillCategory: IProfilePartSkillCategory): Observable<EntityResponseType> {
    return this.http.put<IProfilePartSkillCategory>(this.resourceUrl, profilePartSkillCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfilePartSkillCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfilePartSkillCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
