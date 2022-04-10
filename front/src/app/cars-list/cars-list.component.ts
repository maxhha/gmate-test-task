import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/entities/car';
import { CarRepositoryService } from '../car-repository.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss'],
})
export class CarsListComponent implements OnInit {
  cars: Car[] = [];

  constructor(
    private carRepo: CarRepositoryService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.carRepo.list().subscribe({
      next: (cars) => {
        this.cars = cars;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.carRepo.query();
  }

  handleSearch(event: Event): void {
    this.carRepo.query((event.target as HTMLInputElement).value);
  }

  handleAdd(formData: FormData, modal: any): void {
    this.carRepo.add(formData);
    modal.close();
  }

  handleOpenAddModal(content: any) {
    this.modalService.open(content).result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {
        console.log(reason);
      },
    );
  }
}
