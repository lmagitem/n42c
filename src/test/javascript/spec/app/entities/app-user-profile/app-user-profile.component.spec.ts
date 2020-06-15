import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { AppUserProfileComponent } from 'app/entities/app-user-profile/app-user-profile.component';
import { AppUserProfileService } from 'app/entities/app-user-profile/app-user-profile.service';
import { AppUserProfile } from 'app/shared/model/app-user-profile.model';

describe('Component Tests', () => {
  describe('AppUserProfile Management Component', () => {
    let comp: AppUserProfileComponent;
    let fixture: ComponentFixture<AppUserProfileComponent>;
    let service: AppUserProfileService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [AppUserProfileComponent],
      })
        .overrideTemplate(AppUserProfileComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AppUserProfileComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppUserProfileService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AppUserProfile(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.appUserProfiles && comp.appUserProfiles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
