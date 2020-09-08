import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocalizedPostContentService } from 'app/entities/localized-post-content/localized-post-content.service';
import { ILocalizedPostContent, LocalizedPostContent } from 'app/shared/model/localized-post-content.model';
import { Language } from 'app/shared/model/enumerations/language.model';

describe('Service Tests', () => {
  describe('LocalizedPostContent Service', () => {
    let injector: TestBed;
    let service: LocalizedPostContentService;
    let httpMock: HttpTestingController;
    let elemDefault: ILocalizedPostContent;
    let expectedResult: ILocalizedPostContent | ILocalizedPostContent[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(LocalizedPostContentService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new LocalizedPostContent(0, 'AAAAAAA', 'AAAAAAA', Language.EN);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a LocalizedPostContent', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new LocalizedPostContent()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a LocalizedPostContent', () => {
        const returnedFromService = Object.assign(
          {
            excerpt: 'BBBBBB',
            content: 'BBBBBB',
            language: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of LocalizedPostContent', () => {
        const returnedFromService = Object.assign(
          {
            excerpt: 'BBBBBB',
            content: 'BBBBBB',
            language: 'BBBBBB',
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

      it('should delete a LocalizedPostContent', () => {
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
