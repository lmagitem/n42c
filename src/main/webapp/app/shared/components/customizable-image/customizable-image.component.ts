import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'jhi-customizable-image',
  styleUrls: ['./customizable-image.component.scss'],
  template: `<img
    [src]="!!imageUrl && imageUrl !== '' ? imageUrl : genericImage"
    (error)="useGenericImage($event.target)"
    (load)="imageLoaded($event.target)"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizableImageComponent implements OnInit {
  @Input() imageUrl = '';
  @Input() genericImage = '../../../../content/images/jhipster_family_member_2_head-512.png';
  @Output() imageUrlLoaded = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  useGenericImage(target: any): void {
    if (target instanceof HTMLImageElement) {
      target.src = this.genericImage;
    }
    this.imageUrlLoaded.emit(target.src);
  }

  imageLoaded(target: any): void {
    this.imageUrlLoaded.emit(target.src);
  }
}
