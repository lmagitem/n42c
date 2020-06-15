import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { AppUserProfileDetailComponent } from 'app/entities/app-user-profile/app-user-profile-detail.component';
import { AppUserProfile } from 'app/shared/model/app-user-profile.model';

describe('Component Tests', () => {
  describe('AppUserProfile Management Detail Component', () => {
    let comp: AppUserProfileDetailComponent;
    let fixture: ComponentFixture<AppUserProfileDetailComponent>;
    const route = ({ data: of({ appUserProfile: new AppUserProfile(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [AppUserProfileDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AppUserProfileDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AppUserProfileDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load appUserProfile on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.appUserProfile).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
