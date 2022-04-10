import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Model } from 'src/entities/car';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-model-select',
  templateUrl: './model-select.component.html',
  styleUrls: ['./model-select.component.scss'],
})
export class ModelSelectComponent implements OnInit {
  models: Model[] = [];
  @Input() name!: string;
  @Input() value?: number;
  @Output() change = new EventEmitter<Event>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`${environment.apiUrl}/models`).subscribe({
      next: (data) => {
        this.models = data as Model[];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
