import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthStratagemDetailComponent } from 'app/entities/localized-ninth-stratagem/localized-ninth-stratagem-detail.component';
import { LocalizedNinthStratagem } from 'app/shared/model/localized-ninth-stratagem.model';

describe('Component Tests', () => {
  describe('LocalizedNinthStratagem Management Detail Component', () => {
    let comp: LocalizedNinthStratagemDetailComponent;
    let fixture: ComponentFixture<LocalizedNinthStratagemDetailComponent>;
    const route = ({ data: of({ localizedNinthStratagem: new LocalizedNinthStratagem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthStratagemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocalizedNinthStratagemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalizedNinthStratagemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load localizedNinthStratagem on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localizedNinthStratagem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
