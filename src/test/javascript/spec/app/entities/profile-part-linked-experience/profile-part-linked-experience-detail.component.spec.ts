import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartLinkedExperienceDetailComponent } from 'app/entities/profile-part-linked-experience/profile-part-linked-experience-detail.component';
import { ProfilePartLinkedExperience } from 'app/shared/model/profile-part-linked-experience.model';

describe('Component Tests', () => {
  describe('ProfilePartLinkedExperience Management Detail Component', () => {
    let comp: ProfilePartLinkedExperienceDetailComponent;
    let fixture: ComponentFixture<ProfilePartLinkedExperienceDetailComponent>;
    const route = ({ data: of({ profilePartLinkedExperience: new ProfilePartLinkedExperience(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartLinkedExperienceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProfilePartLinkedExperienceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfilePartLinkedExperienceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load profilePartLinkedExperience on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profilePartLinkedExperience).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
