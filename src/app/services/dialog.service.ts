import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private matDialog = inject(MatDialog)

  openModal(component: ComponentType<unknown>): void {
    const dialogRef = this.matDialog.open(component);
  }
}
