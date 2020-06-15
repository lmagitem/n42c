import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { N42CTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { ProfilePartSimpleItemDeleteDialogComponent } from 'app/entities/profile-part-simple-item/profile-part-simple-item-delete-dialog.component';
import { ProfilePartSimpleItemService } from 'app/entities/profile-part-simple-item/profile-part-simple-item.service';

describe('Component Tests', () => {
  describe('ProfilePartSimpleItem Management Delete Component', () => {
    let comp: ProfilePartSimpleItemDeleteDialogComponent;
    let fixture: ComponentFixture<ProfilePartSimpleItemDeleteDialogComponent>;
    let service: ProfilePartSimpleItemService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartSimpleItemDeleteDialogComponent],
      })
        .overrideTemplate(ProfilePartSimpleItemDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfilePartSimpleItemDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfilePartSimpleItemService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
