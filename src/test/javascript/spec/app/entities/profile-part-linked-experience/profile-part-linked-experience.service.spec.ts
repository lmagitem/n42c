import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProfilePartLinkedExperienceService } from 'app/entities/profile-part-linked-experience/profile-part-linked-experience.service';
import { IProfilePartLinkedExperience, ProfilePartLinkedExperience } from 'app/shared/model/profile-part-linked-experience.model';

describe('Service Tests', () => {
  describe('ProfilePartLinkedExperience Service', () => {
    let injector: TestBed;
    let service: ProfilePartLinkedExperienceService;
    let httpMock: HttpTestingController;
    let elemDefault: IProfilePartLinkedExperience;
    let expectedResult: IProfilePartLinkedExperience | IProfilePartLinkedExperience[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProfilePartLinkedExperienceService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ProfilePartLinkedExperience(0, 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ProfilePartLinkedExperience', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.create(new ProfilePartLinkedExperience()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ProfilePartLinkedExperience', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            subTitle: 'BBBBBB',
            date: currentDate.format(DATE_TIME_FORMAT),
            content: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ProfilePartLinkedExperience', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            subTitle: 'BBBBBB',
            date: currentDate.format(DATE_TIME_FORMAT),
            content: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ProfilePartLinkedExperience', () => {
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
