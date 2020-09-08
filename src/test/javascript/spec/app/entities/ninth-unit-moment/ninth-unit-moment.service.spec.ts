import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { NinthUnitMomentService } from 'app/entities/ninth-unit-moment/ninth-unit-moment.service';
import { INinthUnitMoment, NinthUnitMoment } from 'app/shared/model/ninth-unit-moment.model';

describe('Service Tests', () => {
  describe('NinthUnitMoment Service', () => {
    let injector: TestBed;
    let service: NinthUnitMomentService;
    let httpMock: HttpTestingController;
    let elemDefault: INinthUnitMoment;
    let expectedResult: INinthUnitMoment | INinthUnitMoment[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(NinthUnitMomentService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new NinthUnitMoment(0, false, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            sinceInstant: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a NinthUnitMoment', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            sinceInstant: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sinceInstant: currentDate,
          },
          returnedFromService
        );

        service.create(new NinthUnitMoment()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a NinthUnitMoment', () => {
        const returnedFromService = Object.assign(
          {
            current: true,
            sinceInstant: currentDate.format(DATE_TIME_FORMAT),
            pictureUrl: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sinceInstant: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of NinthUnitMoment', () => {
        const returnedFromService = Object.assign(
          {
            current: true,
            sinceInstant: currentDate.format(DATE_TIME_FORMAT),
            pictureUrl: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sinceInstant: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a NinthUnitMoment', () => {
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
