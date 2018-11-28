import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SettingsService} from "../settings.service";
import {Setting} from "../setting";

@Component({
  selector: 'app-settings-editor',
  templateUrl: './settings-editor.component.html',
  styleUrls: ['./settings-editor.component.css']
})
export class SettingsEditorComponent implements OnInit {
  @Input() set: Setting;
  constructor(
              private route: ActivatedRoute,
              private setsService: SettingsService) { }

  ngOnInit() {
    this.getSet()
  }
  getSet(): void {
    const key = this.route.snapshot.queryParamMap.get('key');
    console.log(key);
    this.setsService.getSetting(key)
      .subscribe(set => this.set = set);
  }

  save(): void {
    this.setsService.updateSetting(this.set)
      .subscribe(set => this.set = set);
  }
}
