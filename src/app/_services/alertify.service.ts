import { Injectable } from '@angular/core';
// Next line gave error not finding a declaration file, couldn't install alertifyjs
// So needed to create a declaration file typings.d.ts
// By including the library this way, we got no intellisense sort of warning to see if there is misstyping, double check!
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() {}

  // Generate a method to notify awareness of the package alertify...
  // Confirm is going to display a confirmation message using alertifyjs
  confirm(message: string, okCallBack: () => any) {
    alertify.confirm(message, (e: any) => {
      if (e) {
        okCallBack();
      } else {}
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }

}
