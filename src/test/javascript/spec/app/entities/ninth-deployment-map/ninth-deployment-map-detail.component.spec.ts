import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthDeploymentMapDetailComponent } from 'app/entities/ninth-deployment-map/ninth-deployment-map-detail.component';
import { NinthDeploymentMap } from 'app/shared/model/ninth-deployment-map.model';

describe('Component Tests', () => {
  describe('NinthDeploymentMap Management Detail Component', () => {
    let comp: NinthDeploymentMapDetailComponent;
    let fixture: ComponentFixture<NinthDeploymentMapDetailComponent>;
    const route = ({ data: of({ ninthDeploymentMap: new NinthDeploymentMap(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthDeploymentMapDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthDeploymentMapDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthDeploymentMapDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ninthDeploymentMap on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthDeploymentMap).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
