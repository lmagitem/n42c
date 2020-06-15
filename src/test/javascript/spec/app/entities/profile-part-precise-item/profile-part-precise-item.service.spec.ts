import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProfilePartPreciseItemService } from 'app/entities/profile-part-precise-item/profile-part-precise-item.service';
import { IProfilePartPreciseItem, ProfilePartPreciseItem } from 'app/shared/model/profile-part-precise-item.model';

describe('Service Tests', () => {
  describe('ProfilePartPreciseItem Service', () => {
    let injector: TestBed;
    let service: ProfilePartPreciseItemService;
    let httpMock: HttpTestingController;
    let elemDefault: IProfilePartPreciseItem;
    let expectedResult: IProfilePartPreciseItem | IProfilePartPreciseItem[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProfilePartPreciseItemService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ProfilePartPreciseItem(0, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate, 'AAAAAAA', 0, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            start: currentDate.format(DATE_TIME_FORMAT),
            end: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ProfilePartPreciseItem', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            start: currentDate.format(DATE_TIME_FORMAT),
            end: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            start: currentDate,
            end: currentDate,
          },
          returnedFromService
        );

        service.create(new ProfilePartPreciseItem()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ProfilePartPreciseItem', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            subTitle: 'BBBBBB',
            start: currentDate.format(DATE_TIME_FORMAT),
            end: currentDate.format(DATE_TIME_FORMAT),
            locationName: 'BBBBBB',
            locationLat: 1,
            locationLong: 1,
            content: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            start: currentDate,
            end: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ProfilePartPreciseItem', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            subTitle: 'BBBBBB',
            start: currentDate.format(DATE_TIME_FORMAT),
            end: currentDate.format(DATE_TIME_FORMAT),
            locationName: 'BBBBBB',
            locationLat: 1,
            locationLong: 1,
            content: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            start: currentDate,
            end: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ProfilePartPreciseItem', () => {
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
