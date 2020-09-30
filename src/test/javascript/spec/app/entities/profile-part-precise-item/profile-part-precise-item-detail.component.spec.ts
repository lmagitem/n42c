import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartPreciseItemDetailComponent } from 'app/entities/profile-part-precise-item/profile-part-precise-item-detail.component';
import { ProfilePartPreciseItem } from 'app/shared/model/profile-part-precise-item.model';

describe('Component Tests', () => {
  describe('ProfilePartPreciseItem Management Detail Component', () => {
    let comp: ProfilePartPreciseItemDetailComponent;
    let fixture: ComponentFixture<ProfilePartPreciseItemDetailComponent>;
    let dataUtils: JhiDataUtils;
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
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load profilePartPreciseItem on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profilePartPreciseItem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
