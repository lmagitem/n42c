import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NinthDeploymentMapService } from 'app/entities/ninth-deployment-map/ninth-deployment-map.service';
import { INinthDeploymentMap, NinthDeploymentMap } from 'app/shared/model/ninth-deployment-map.model';

describe('Service Tests', () => {
  describe('NinthDeploymentMap Service', () => {
    let injector: TestBed;
    let service: NinthDeploymentMapService;
    let httpMock: HttpTestingController;
    let elemDefault: INinthDeploymentMap;
    let expectedResult: INinthDeploymentMap | INinthDeploymentMap[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(NinthDeploymentMapService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new NinthDeploymentMap(0, 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a NinthDeploymentMap', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new NinthDeploymentMap()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a NinthDeploymentMap', () => {
        const returnedFromService = Object.assign(
          {
            url: 'BBBBBB',
            shareable: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of NinthDeploymentMap', () => {
        const returnedFromService = Object.assign(
          {
            url: 'BBBBBB',
            shareable: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a NinthDeploymentMap', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
