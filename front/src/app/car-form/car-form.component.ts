import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Car } from 'src/entities/car';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
})
export class CarFormComponent implements OnInit {
  @Input() buttonText!: string;
  @Input() car?: Car;
  @Output() submit = new EventEmitter<FormData>();
  @ViewChild('imageInput') imageInput!: ElementRef;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.car === undefined) {
      return;
    }
    console.log(this.car);

    const car = this.car;

    this.http
      .get(`${environment.imagesUrl}/${car.image}`, {
        responseType: 'blob',
      })
      .subscribe({
        next: (blob: Blob) => {
          console.log('fetched');
          const container = new DataTransfer();
          container.items.add(
            new File([blob], car.image, { type: 'image/jpeg' }),
          );
          this.imageInput.nativeElement.files = container.files;
          console.log(this.imageInput);
        },
        error(error) {
          console.error(error);
        },
      });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const formData = new FormData();

    if (this.car !== undefined) {
      formData.append('id', `${this.car.id}`);
    }

    ['name', 'modelId', 'color', 'year'].forEach((name) => {
      formData.append(
        name,
        (form.querySelector(`[name="${name}"]`) as HTMLInputElement).value,
      );
    });

    formData.append(
      'image',
      (form.querySelector('[name="image"]') as HTMLInputElement).files![0],
    );

    this.submit.emit(formData);
  }
}
