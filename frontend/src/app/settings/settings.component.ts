import { Component, OnInit } from '@angular/core';
import {Setting} from "../setting";
import {MatDialog} from "@angular/material";
import {SettingsService} from "../settings.service";
import {SettingCreatorDialog} from "../setting-creator-dialog/setting-creator-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'type', 'url', 'actions'];
  sets: Setting[];

  constructor(
    private router: Router,
    private checkService: SettingsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getChecks();
  }

  getChecks(): void {
    this.checkService.getSettings()
      .subscribe(sets => {
        this.sets = sets;
      });
  }
  goEdit(set_key:string) {
    this.router.navigate(['/editsetting'], { queryParams: {key:set_key}});
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SettingCreatorDialog);
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.checkService.createSetting(result)
            .subscribe(set => this.sets.push(set));
        }
      }
    );
  }

  deleteSet(key: string): void {
    this.checkService.deleteSetting(key)
      .subscribe(_ => this.sets = this.sets.filter(set => set.key != key));
  }

}
