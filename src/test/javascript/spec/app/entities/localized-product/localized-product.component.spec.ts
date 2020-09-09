import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { LocalizedProductComponent } from 'app/entities/localized-product/localized-product.component';
import { LocalizedProductService } from 'app/entities/localized-product/localized-product.service';
import { LocalizedProduct } from 'app/shared/model/localized-product.model';

describe('Component Tests', () => {
  describe('LocalizedProduct Management Component', () => {
    let comp: LocalizedProductComponent;
    let fixture: ComponentFixture<LocalizedProductComponent>;
    let service: LocalizedProductService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedProductComponent],
      })
        .overrideTemplate(LocalizedProductComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedProductComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedProductService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocalizedProduct(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.localizedProducts && comp.localizedProducts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
