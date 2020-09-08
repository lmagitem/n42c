import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthStratagemDetailComponent } from 'app/entities/ninth-stratagem/ninth-stratagem-detail.component';
import { NinthStratagem } from 'app/shared/model/ninth-stratagem.model';

describe('Component Tests', () => {
  describe('NinthStratagem Management Detail Component', () => {
    let comp: NinthStratagemDetailComponent;
    let fixture: ComponentFixture<NinthStratagemDetailComponent>;
    const route = ({ data: of({ ninthStratagem: new NinthStratagem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthStratagemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthStratagemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthStratagemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ninthStratagem on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthStratagem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
