import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthArmyMomentComponent } from 'app/entities/ninth-army-moment/ninth-army-moment.component';
import { NinthArmyMomentService } from 'app/entities/ninth-army-moment/ninth-army-moment.service';
import { NinthArmyMoment } from 'app/shared/model/ninth-army-moment.model';

describe('Component Tests', () => {
  describe('NinthArmyMoment Management Component', () => {
    let comp: NinthArmyMomentComponent;
    let fixture: ComponentFixture<NinthArmyMomentComponent>;
    let service: NinthArmyMomentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthArmyMomentComponent],
      })
        .overrideTemplate(NinthArmyMomentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthArmyMomentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthArmyMomentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthArmyMoment(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthArmyMoments && comp.ninthArmyMoments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
