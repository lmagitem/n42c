import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { ShopComponent } from 'app/entities/shop/shop.component';
import { ShopService } from 'app/entities/shop/shop.service';
import { Shop } from 'app/shared/model/shop.model';

describe('Component Tests', () => {
  describe('Shop Management Component', () => {
    let comp: ShopComponent;
    let fixture: ComponentFixture<ShopComponent>;
    let service: ShopService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ShopComponent],
      })
        .overrideTemplate(ShopComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShopComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShopService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Shop(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.shops && comp.shops[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
