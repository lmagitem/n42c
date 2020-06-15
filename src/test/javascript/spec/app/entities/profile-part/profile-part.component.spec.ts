import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartComponent } from 'app/entities/profile-part/profile-part.component';
import { ProfilePartService } from 'app/entities/profile-part/profile-part.service';
import { ProfilePart } from 'app/shared/model/profile-part.model';

describe('Component Tests', () => {
  describe('ProfilePart Management Component', () => {
    let comp: ProfilePartComponent;
    let fixture: ComponentFixture<ProfilePartComponent>;
    let service: ProfilePartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartComponent],
      })
        .overrideTemplate(ProfilePartComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfilePartComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfilePartService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProfilePart(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.profileParts && comp.profileParts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
