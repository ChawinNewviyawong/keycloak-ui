import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class ModalAlertData extends BSModalContext {

  public header:string;
  public message:string;
  constructor() {
    super();
  }
}

/**
* A Sample of how simple it is to create a new window, with its own injects.
*/
@Component({
  selector: 'modal-alert',
  styleUrls: ['modal.styles.css'],
  templateUrl: 'modal-alert.template.html',
})
export class ModalAlert implements ModalComponent<ModalAlertData> {
  public context: ModalAlertData;
  constructor(
    public dialog: DialogRef<ModalAlertData>,
    private _router: Router,) {
      this.context = dialog.context;
    }

    close() {
      this.dialog.close();
    }
  }


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { DialogRef, ModalComponent } from 'angular2-modal';
// import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

// export class ModalAlertData extends BSModalContext {

//   public header:string;
//   public message:string;
//   constructor() {
//     super();
//   }
// }

// /**
// * A Sample of how simple it is to create a new window, with its own injects.
// */
// @Component({
//   selector: 'modal-alert',
//   // styleUrls: ['modal.styles.css'],
//   templateUrl: 'modal-alert.template.html',
// })
// export class ModalAlert implements ModalComponent<ModalAlertData> {
//   public context: ModalAlertData;
//   constructor(
//     public dialog: DialogRef<ModalAlertData>,
//     private _router: Router,) {
//       this.context = dialog.context;
//     }

//     close() {
//       this.dialog.close();
//       // this._router.navigateByUrl("/dashboard");
//     }
//   }
