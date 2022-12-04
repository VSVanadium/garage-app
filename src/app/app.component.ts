import { Component, ViewEncapsulation } from '@angular/core';
import { PostService } from './services/post.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    vehicles: any;
    levels: any;
    searchText: string = '';

    vehiclesCopy: any;

    itemCount: number;
    pageSize: number;
    pageIndex: number;
    itemsOnPage: number;

    categoryFilter: Array<number>;
    typeFilter: Array<number>;

    filteredVehicles: any;
    temp1: any;
    temp2: any;

    constructor(private service: PostService) {
        this.service.getPosts().subscribe((response) => {
            this.vehicles = response;
            this.vehiclesCopy = this.vehicles.slice(0 * this.pageSize, 0 * this.pageSize + this.pageSize);
            this.itemCount = this.vehicles?.length;
            this.itemsOnPage = this.vehiclesCopy?.length;
        });
        this.service.getLevels().subscribe((response) => {
            this.levels = response;
        });

        this.itemCount = this.vehicles?.length;
        this.pageSize = 5;
        this.pageIndex = 0;
        this.itemsOnPage = 0;

        this.categoryFilter = [];
        this.typeFilter = [];

        this.temp1 = [];
        this.temp2 = [];
    }

    onSelectLevel(selectedLevel: number) {
        if (!this.categoryFilter.includes(selectedLevel)) this.categoryFilter.push(selectedLevel);

        this.temp1 = [];
        for (let entry of this.categoryFilter) {
            this.temp1 = this.temp1.concat(this.vehicles.filter((p: { floor: number }) => p.floor === entry));
        }

        if (this.temp1.length > 0) {
            this.vehiclesCopy = this.temp1.slice(0 * this.pageSize, 0 * this.pageSize + this.pageSize);
            this.filteredVehicles = this.temp1;
        }

        this.temp2 = [];
        for (let entry of this.typeFilter) {
            this.temp2 = this.temp2.concat(this.temp1.filter((p: { type: number }) => p.type === entry));
        }

        if (this.temp2.length > 0) {
            this.vehiclesCopy = this.temp2.slice(0 * this.pageSize, 0 * this.pageSize + this.pageSize);
            this.filteredVehicles = this.temp2;
        }

        this.caluculateItems();
    }

    onSelectType(selectedtype: number) {
        if (!this.typeFilter.includes(selectedtype)) this.typeFilter.push(selectedtype);

        this.temp1 = [];
        for (let entry of this.typeFilter) {
            this.temp1 = this.temp1.concat(this.vehicles.filter((p: { type: number }) => p.type === entry));
        }
        if (this.temp1.length > 0) {
            this.vehiclesCopy = this.temp1.slice(0 * this.pageSize, 0 * this.pageSize + this.pageSize);
            this.filteredVehicles = this.temp1;
        }

        this.temp2 = [];
        for (let entry of this.categoryFilter) {
            this.temp2 = this.temp2.concat(this.temp1.filter((p: { floor: number }) => p.floor === entry));
        }

        if (this.temp2.length > 0) {
            this.vehiclesCopy = this.temp2.slice(0 * this.pageSize, 0 * this.pageSize + this.pageSize);
            this.filteredVehicles = this.temp2;
        }

        this.caluculateItems();
    }

    removeFilter() {
        this.typeFilter = [];
        this.categoryFilter = [];
        this.searchText = '';
        this.filteredVehicles = [];
        this.vehiclesCopy = this.vehicles?.slice(0 * this.pageSize, 0 * this.pageSize + this.pageSize);
        this.itemCount = this.vehicles?.length;
        this.itemsOnPage = this.vehiclesCopy?.length;
    }

    getEnumText(n: number) {
        if (n == 0) return 'Car';
        else return 'Motorbike';
    }

    onPageChange($event: any) {
        if (this.filteredVehicles?.length > 0) {
            this.vehiclesCopy = this.filteredVehicles.slice(
                $event.pageIndex * $event.pageSize,
                $event.pageIndex * $event.pageSize + $event.pageSize
            );
        } else {
            this.vehiclesCopy = this.vehicles.slice(
                $event.pageIndex * $event.pageSize,
                $event.pageIndex * $event.pageSize + $event.pageSize
            );
        }
        this.pageIndex = $event.pageIndex;
        this.itemsOnPage = this.vehiclesCopy?.length;
    }

    caluculateItems() {
        this.itemCount = this.filteredVehicles?.length;
        if (this.itemCount < this.pageSize) this.itemsOnPage = this.itemCount;
        else this.itemsOnPage = this.vehiclesCopy?.length;
    }
}
