import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/entities/car';
import { environment } from 'src/environments/environment';
import { CarRepositoryService } from '../car-repository.service';

type Property = {
  name: string;
  getter: (car: Car) => string;
};

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent implements OnInit {
  static readonly PROPERTIES: Property[] = [
    {
      name: 'Model',
      getter: (car) => car.model.name,
    },
    {
      name: 'Color',
      getter: (car) => car.color,
    },
    {
      name: 'Year',
      getter: (car) => `${car.year}`,
    },
  ];

  readonly PROPERTIES = CarCardComponent.PROPERTIES;

  @Input() car!: Car;

  imageUrl = environment.imagesUrl;

  constructor(
    private carRepo: CarRepositoryService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {}

  handleOpenDeleteModal(content: any) {
    this.modalService.open(content).result.then(() => {
      this.carRepo.delete(this.car.id);
    });
  }

  handleOpenUpdateModal(content: any) {
    this.modalService.open(content);
  }

  handleUpdate(formData: FormData, model: any) {
    this.carRepo.update(formData);
    model.close();
  }
}
