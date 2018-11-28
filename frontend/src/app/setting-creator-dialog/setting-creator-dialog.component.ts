import {Component, Input, OnInit} from '@angular/core';
import {Setting} from "../setting";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-setting-creator-dialog',
  templateUrl: './setting-creator-dialog.component.html',
  styleUrls: ['./setting-creator-dialog.component.css']
})
export class SettingCreatorDialog implements OnInit {
  @Input() data: Setting = new Setting();
  constructor(public dialogRef: MatDialogRef<SettingCreatorDialog>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
