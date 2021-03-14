import { Pipe /*, SecurityContext */ } from '@angular/core';
import { SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafeUrlPipe {
  constructor(protected sanitizer: DomSanitizer) {}

  public transform(
    value: string | null | undefined,
    type: string,
    sanitize = true
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    value = value !== undefined && value !== null ? value : '';
    switch (type) {
      case 'html':
        // value = sanitize ? (this.sanitizer.sanitize(SecurityContext.HTML, value) as string) : value;
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        // value = sanitize ? (this.sanitizer.sanitize(SecurityContext.STYLE, value) as string) : value;
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        // value = sanitize ? (this.sanitizer.sanitize(SecurityContext.SCRIPT, value) as string) : value;
        return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        // value = sanitize ? (this.sanitizer.sanitize(SecurityContext.URL, value) as string) : value;
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        // value = sanitize ? (this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, value) as string) : value;
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Unable to bypass security for invalid type: ${type}`);
    }
  }
}
