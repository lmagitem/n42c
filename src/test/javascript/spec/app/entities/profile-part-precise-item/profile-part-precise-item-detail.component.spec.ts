import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartPreciseItemDetailComponent } from 'app/entities/profile-part-precise-item/profile-part-precise-item-detail.component';
import { ProfilePartPreciseItem } from 'app/shared/model/profile-part-precise-item.model';

describe('Component Tests', () => {
  describe('ProfilePartPreciseItem Management Detail Component', () => {
    let comp: ProfilePartPreciseItemDetailComponent;
    let fixture: ComponentFixture<ProfilePartPreciseItemDetailComponent>;
    const route = ({ data: of({ profilePartPreciseItem: new ProfilePartPreciseItem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartPreciseItemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProfilePartPreciseItemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfilePartPreciseItemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load profilePartPreciseItem on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profilePartPreciseItem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
