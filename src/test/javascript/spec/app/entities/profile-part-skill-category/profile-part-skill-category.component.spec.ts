import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartSkillCategoryComponent } from 'app/entities/profile-part-skill-category/profile-part-skill-category.component';
import { ProfilePartSkillCategoryService } from 'app/entities/profile-part-skill-category/profile-part-skill-category.service';
import { ProfilePartSkillCategory } from 'app/shared/model/profile-part-skill-category.model';

describe('Component Tests', () => {
  describe('ProfilePartSkillCategory Management Component', () => {
    let comp: ProfilePartSkillCategoryComponent;
    let fixture: ComponentFixture<ProfilePartSkillCategoryComponent>;
    let service: ProfilePartSkillCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartSkillCategoryComponent],
      })
        .overrideTemplate(ProfilePartSkillCategoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfilePartSkillCategoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfilePartSkillCategoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProfilePartSkillCategory(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.profilePartSkillCategories && comp.profilePartSkillCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
