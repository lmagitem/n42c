import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartDetailComponent } from 'app/entities/profile-part/profile-part-detail.component';
import { ProfilePart } from 'app/shared/model/profile-part.model';

describe('Component Tests', () => {
  describe('ProfilePart Management Detail Component', () => {
    let comp: ProfilePartDetailComponent;
    let fixture: ComponentFixture<ProfilePartDetailComponent>;
    const route = ({ data: of({ profilePart: new ProfilePart(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProfilePartDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfilePartDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load profilePart on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profilePart).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
