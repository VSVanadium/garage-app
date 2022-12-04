import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private url = 'https://localhost:7078/Parking';

    constructor(private httpClient: HttpClient) {}

    getPosts() {
        return this.httpClient.get(this.url + '/GetAll');
    }

    getLevels() {
        return this.httpClient.get('https://localhost:7078/Floor/GetAllIds');
    }
}
