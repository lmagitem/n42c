import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedProductDetailComponent } from 'app/entities/localized-product/localized-product-detail.component';
import { LocalizedProduct } from 'app/shared/model/localized-product.model';

describe('Component Tests', () => {
  describe('LocalizedProduct Management Detail Component', () => {
    let comp: LocalizedProductDetailComponent;
    let fixture: ComponentFixture<LocalizedProductDetailComponent>;
    const route = ({ data: of({ localizedProduct: new LocalizedProduct(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedProductDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocalizedProductDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalizedProductDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load localizedProduct on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localizedProduct).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
