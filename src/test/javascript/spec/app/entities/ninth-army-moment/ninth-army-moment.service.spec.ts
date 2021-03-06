import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NinthArmyMomentService } from 'app/entities/ninth-army-moment/ninth-army-moment.service';
import { INinthArmyMoment, NinthArmyMoment } from 'app/shared/model/ninth-army-moment.model';

describe('Service Tests', () => {
  describe('NinthArmyMoment Service', () => {
    let injector: TestBed;
    let service: NinthArmyMomentService;
    let httpMock: HttpTestingController;
    let elemDefault: INinthArmyMoment;
    let expectedResult: INinthArmyMoment | INinthArmyMoment[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(NinthArmyMomentService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new NinthArmyMoment(0, false, 0, 0, 0, 0, 0, 0, 0, 0, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a NinthArmyMoment', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new NinthArmyMoment()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a NinthArmyMoment', () => {
        const returnedFromService = Object.assign(
          {
            current: true,
            majorVictories: 1,
            minorVictories: 1,
            draws: 1,
            minorDefeats: 1,
            majorDefeats: 1,
            requisition: 1,
            supplyLimit: 1,
            supplyUsed: 1,
            objectives: 'BBBBBB',
            notes: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of NinthArmyMoment', () => {
        const returnedFromService = Object.assign(
          {
            current: true,
            majorVictories: 1,
            minorVictories: 1,
            draws: 1,
            minorDefeats: 1,
            majorDefeats: 1,
            requisition: 1,
            supplyLimit: 1,
            supplyUsed: 1,
            objectives: 'BBBBBB',
            notes: 'BBBBBB',
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

      it('should delete a NinthArmyMoment', () => {
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
