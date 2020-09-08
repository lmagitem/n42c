import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthDeploymentMapDetailComponent } from 'app/entities/localized-ninth-deployment-map/localized-ninth-deployment-map-detail.component';
import { LocalizedNinthDeploymentMap } from 'app/shared/model/localized-ninth-deployment-map.model';

describe('Component Tests', () => {
  describe('LocalizedNinthDeploymentMap Management Detail Component', () => {
    let comp: LocalizedNinthDeploymentMapDetailComponent;
    let fixture: ComponentFixture<LocalizedNinthDeploymentMapDetailComponent>;
    const route = ({ data: of({ localizedNinthDeploymentMap: new LocalizedNinthDeploymentMap(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthDeploymentMapDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocalizedNinthDeploymentMapDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalizedNinthDeploymentMapDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load localizedNinthDeploymentMap on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localizedNinthDeploymentMap).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
