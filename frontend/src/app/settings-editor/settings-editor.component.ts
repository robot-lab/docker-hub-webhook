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
  private key: string;
  constructor(
              private route: ActivatedRoute,
              private setsService: SettingsService) { }

  ngOnInit() {
    this.getSet()
  }
  getSet(): void {
    this.key = this.route.snapshot.queryParamMap.get('key');
    console.log(this.key);
    this.setsService.getSetting(this.key)
      .subscribe(set => this.set = set);
  }

  save(): void {
    this.setsService.updateSetting(this.set, this.key)
      .subscribe(set => this.set = set);
  }
}
