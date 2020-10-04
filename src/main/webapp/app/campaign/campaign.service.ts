import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NinthCampaignMomentService } from 'app/entities/ninth-campaign-moment/ninth-campaign-moment.service';
import { NinthCampaignService } from 'app/entities/ninth-campaign/ninth-campaign.service';
import { INinthCampaignMoment, NinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';
import { INinthCampaign, NinthCampaign } from 'app/shared/model/ninth-campaign.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CampaignService {
  private selectedCampaign = new BehaviorSubject<INinthCampaign>(new NinthCampaign());
  private selectedCampaignId = new BehaviorSubject<number>(-1);
  private selectedCampaignMoment = new BehaviorSubject<INinthCampaignMoment>(new NinthCampaignMoment());
  private selectedCampaignMomentId = new BehaviorSubject<number>(-1);
  private selectedCampaignMomentsIds = new BehaviorSubject<number[]>([]);
  private currentlyEditingCampaign = new BehaviorSubject<boolean>(false);
  private currentlyEditingCampaignMoment = new BehaviorSubject<boolean>(false);
  public selectedCampaign$: Observable<INinthCampaign> = this.selectedCampaign.asObservable();
  public selectedCampaignId$: Observable<number> = this.selectedCampaignId.asObservable();
  public selectedCampaignMoment$: Observable<INinthCampaignMoment> = this.selectedCampaignMoment.asObservable();
  public selectedCampaignMomentId$: Observable<number> = this.selectedCampaignMomentId.asObservable();
  public selectedCampaignMomentsIds$: Observable<number[]> = this.selectedCampaignMomentsIds.asObservable();
  public currentlyEditingCampaign$: Observable<boolean> = this.currentlyEditingCampaign.asObservable();
  public currentlyEditingCampaignMoment$: Observable<boolean> = this.currentlyEditingCampaignMoment.asObservable();

  constructor(private campaignService: NinthCampaignService, private campaignMomentService: NinthCampaignMomentService) {}

  updateSelectedCampaignId(id: number): void {
    if (id && id !== -1) {
      this.campaignService
        .find(id)
        .pipe(first())
        .subscribe((ninthCampaign: HttpResponse<NinthCampaign>) => {
          if (ninthCampaign.body) {
            this.selectedCampaignId.next(id);
            this.selectedCampaign.next(ninthCampaign.body);
            this.updateSelectedCampaignMomentsIds();
          } else {
            this.selectedCampaignId.next(-1);
            this.selectedCampaign.next(new NinthCampaign());
            this.updateSelectedCampaignMomentsIds();
          }
        });
    } else {
      this.selectedCampaignId.next(-1);
      this.selectedCampaign.next(new NinthCampaign());
      this.updateSelectedCampaignMomentsIds();
    }
  }

  updateSelectedCampaignMomentId(id: number): void {
    /* eslint-disable no-console */
    console.log('je reçois ' + id);
    if (id && id !== -1) {
      this.campaignMomentService
        .find(id)
        .pipe(first())
        .subscribe((ninthCampaignMoment: HttpResponse<NinthCampaignMoment>) => {
          if (ninthCampaignMoment.body) {
            this.selectedCampaignMomentId.next(id);
            this.selectedCampaignMoment.next(ninthCampaignMoment.body);
          } else {
            this.selectedCampaignMomentId.next(-1);
            this.selectedCampaignMoment.next(new NinthCampaignMoment());
          }
        });
    } else {
      this.selectedCampaignMomentId.next(-1);
      this.selectedCampaignMoment.next(new NinthCampaignMoment());
    }
  }

  updateSelectedCampaignMomentsIds(): void {
    const id = this.selectedCampaignId.value;
    if (id !== -1) {
      this.campaignService
        .queryMomentsIds(id)
        .pipe(first())
        .subscribe((res: HttpResponse<number[]>) => {
          const ids = res.body || [];
          this.selectedCampaignMomentsIds.next(ids);
        });
    } else {
      this.selectedCampaignMomentsIds.next([]);
    }
  }

  selectNewestCampaignMomentFromIds(): void {
    const ids = this.selectedCampaignMomentsIds.value;
    if (ids.length > 0) {
      this.updateSelectedCampaignMomentId(ids[ids.length - 1]);
    } else {
      this.updateSelectedCampaignMomentId(-1);
    }
  }

  addNewCampaignMoment(): void {
    this.updateSelectedCampaignMomentId(-1);
    this.setCampaignMomentEditingStatus(true);
  }

  setCampaignEditingStatus(status: boolean): void {
    this.currentlyEditingCampaign.next(status);
  }

  setCampaignMomentEditingStatus(status: boolean): void {
    this.currentlyEditingCampaignMoment.next(status);
  }

  selectPreviousCampaignMoment(): void {
    const ids = this.selectedCampaignMomentsIds.value;
    let newIndex = ids.findIndex(id => this.selectedCampaignMomentId.value === id) - 1;
    newIndex = newIndex < 0 ? 0 : newIndex;
    this.selectedCampaignMomentId.next(ids[newIndex]);
  }

  selectNextCampaignMoment(): void {
    const ids = this.selectedCampaignMomentsIds.value;
    let newIndex = ids.findIndex(id => this.selectedCampaignMomentId.value === id) + 1;
    newIndex = newIndex >= ids.length ? ids.length - 1 : newIndex;
    this.selectedCampaignMomentId.next(ids[newIndex]);
  }
}
