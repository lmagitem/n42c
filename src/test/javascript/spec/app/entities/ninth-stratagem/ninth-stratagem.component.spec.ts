import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthStratagemComponent } from 'app/entities/ninth-stratagem/ninth-stratagem.component';
import { NinthStratagemService } from 'app/entities/ninth-stratagem/ninth-stratagem.service';
import { NinthStratagem } from 'app/shared/model/ninth-stratagem.model';

describe('Component Tests', () => {
  describe('NinthStratagem Management Component', () => {
    let comp: NinthStratagemComponent;
    let fixture: ComponentFixture<NinthStratagemComponent>;
    let service: NinthStratagemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthStratagemComponent],
      })
        .overrideTemplate(NinthStratagemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthStratagemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthStratagemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthStratagem(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthStratagems && comp.ninthStratagems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
