import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthArmyComponent } from 'app/entities/ninth-army/ninth-army.component';
import { NinthArmyService } from 'app/entities/ninth-army/ninth-army.service';
import { NinthArmy } from 'app/shared/model/ninth-army.model';

describe('Component Tests', () => {
  describe('NinthArmy Management Component', () => {
    let comp: NinthArmyComponent;
    let fixture: ComponentFixture<NinthArmyComponent>;
    let service: NinthArmyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthArmyComponent],
      })
        .overrideTemplate(NinthArmyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthArmyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthArmyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthArmy(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthArmies && comp.ninthArmies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
