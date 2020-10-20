import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { BlogPostService } from 'app/entities/blog-post/blog-post.service';
import { IBlogPost, BlogPost } from 'app/shared/model/blog-post.model';

describe('Service Tests', () => {
  describe('BlogPost Service', () => {
    let injector: TestBed;
    let service: BlogPostService;
    let httpMock: HttpTestingController;
    let elemDefault: IBlogPost;
    let expectedResult: IBlogPost | IBlogPost[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(BlogPostService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new BlogPost(0, 'AAAAAAA', currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            published: currentDate.format(DATE_TIME_FORMAT),
            modified: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a BlogPost', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            published: currentDate.format(DATE_TIME_FORMAT),
            modified: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            published: currentDate,
            modified: currentDate,
          },
          returnedFromService
        );

        service.create(new BlogPost()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a BlogPost', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            published: currentDate.format(DATE_TIME_FORMAT),
            modified: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            published: currentDate,
            modified: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of BlogPost', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            published: currentDate.format(DATE_TIME_FORMAT),
            modified: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            published: currentDate,
            modified: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a BlogPost', () => {
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
