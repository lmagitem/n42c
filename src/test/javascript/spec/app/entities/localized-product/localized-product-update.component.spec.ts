import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedProductUpdateComponent } from 'app/entities/localized-product/localized-product-update.component';
import { LocalizedProductService } from 'app/entities/localized-product/localized-product.service';
import { LocalizedProduct } from 'app/shared/model/localized-product.model';

describe('Component Tests', () => {
  describe('LocalizedProduct Management Update Component', () => {
    let comp: LocalizedProductUpdateComponent;
    let fixture: ComponentFixture<LocalizedProductUpdateComponent>;
    let service: LocalizedProductService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedProductUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LocalizedProductUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedProductUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedProductService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocalizedProduct(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocalizedProduct();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
