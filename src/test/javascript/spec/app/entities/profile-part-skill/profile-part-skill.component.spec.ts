import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartSkillComponent } from 'app/entities/profile-part-skill/profile-part-skill.component';
import { ProfilePartSkillService } from 'app/entities/profile-part-skill/profile-part-skill.service';
import { ProfilePartSkill } from 'app/shared/model/profile-part-skill.model';

describe('Component Tests', () => {
  describe('ProfilePartSkill Management Component', () => {
    let comp: ProfilePartSkillComponent;
    let fixture: ComponentFixture<ProfilePartSkillComponent>;
    let service: ProfilePartSkillService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartSkillComponent],
      })
        .overrideTemplate(ProfilePartSkillComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfilePartSkillComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfilePartSkillService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProfilePartSkill(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.profilePartSkills && comp.profilePartSkills[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
