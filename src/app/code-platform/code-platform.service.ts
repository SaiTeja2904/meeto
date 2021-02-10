import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CodePlatformService {
  constructor(private httpClient: HttpClient) {}

  execute(code) {
    if (code?.includes('require')) {
      return of({ response: 'Error: Cannot execute require' });
    }
    if (code?.includes('import')) {
      return of({ response: 'Error: Cannot execute import' });
    }
    return this.httpClient
      .post('https://meeto-code-share-api.herokuapp.com/compilers/javascript', {
        code,
      })
      .pipe(tap(console.log));
  }
}
