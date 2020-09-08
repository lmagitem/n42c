import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthMissionDetailComponent } from 'app/entities/ninth-mission/ninth-mission-detail.component';
import { NinthMission } from 'app/shared/model/ninth-mission.model';

describe('Component Tests', () => {
  describe('NinthMission Management Detail Component', () => {
    let comp: NinthMissionDetailComponent;
    let fixture: ComponentFixture<NinthMissionDetailComponent>;
    const route = ({ data: of({ ninthMission: new NinthMission(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthMissionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthMissionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthMissionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ninthMission on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthMission).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
