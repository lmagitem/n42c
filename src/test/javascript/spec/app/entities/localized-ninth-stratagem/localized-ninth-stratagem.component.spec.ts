import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthStratagemComponent } from 'app/entities/localized-ninth-stratagem/localized-ninth-stratagem.component';
import { LocalizedNinthStratagemService } from 'app/entities/localized-ninth-stratagem/localized-ninth-stratagem.service';
import { LocalizedNinthStratagem } from 'app/shared/model/localized-ninth-stratagem.model';

describe('Component Tests', () => {
  describe('LocalizedNinthStratagem Management Component', () => {
    let comp: LocalizedNinthStratagemComponent;
    let fixture: ComponentFixture<LocalizedNinthStratagemComponent>;
    let service: LocalizedNinthStratagemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthStratagemComponent],
      })
        .overrideTemplate(LocalizedNinthStratagemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedNinthStratagemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedNinthStratagemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocalizedNinthStratagem(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.localizedNinthStratagems && comp.localizedNinthStratagems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
