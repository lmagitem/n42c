import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocalizedBlogCategoryService } from 'app/entities/localized-blog-category/localized-blog-category.service';
import { ILocalizedBlogCategory, LocalizedBlogCategory } from 'app/shared/model/localized-blog-category.model';
import { Language } from 'app/shared/model/enumerations/language.model';

describe('Service Tests', () => {
  describe('LocalizedBlogCategory Service', () => {
    let injector: TestBed;
    let service: LocalizedBlogCategoryService;
    let httpMock: HttpTestingController;
    let elemDefault: ILocalizedBlogCategory;
    let expectedResult: ILocalizedBlogCategory | ILocalizedBlogCategory[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(LocalizedBlogCategoryService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new LocalizedBlogCategory(0, 'AAAAAAA', Language.EN);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a LocalizedBlogCategory', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new LocalizedBlogCategory()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a LocalizedBlogCategory', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
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

      it('should return a list of LocalizedBlogCategory', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
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

      it('should delete a LocalizedBlogCategory', () => {
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
