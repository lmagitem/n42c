import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartLinkedExperienceComponent } from 'app/entities/profile-part-linked-experience/profile-part-linked-experience.component';
import { ProfilePartLinkedExperienceService } from 'app/entities/profile-part-linked-experience/profile-part-linked-experience.service';
import { ProfilePartLinkedExperience } from 'app/shared/model/profile-part-linked-experience.model';

describe('Component Tests', () => {
  describe('ProfilePartLinkedExperience Management Component', () => {
    let comp: ProfilePartLinkedExperienceComponent;
    let fixture: ComponentFixture<ProfilePartLinkedExperienceComponent>;
    let service: ProfilePartLinkedExperienceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartLinkedExperienceComponent],
      })
        .overrideTemplate(ProfilePartLinkedExperienceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfilePartLinkedExperienceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfilePartLinkedExperienceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProfilePartLinkedExperience(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.profilePartLinkedExperiences && comp.profilePartLinkedExperiences[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
