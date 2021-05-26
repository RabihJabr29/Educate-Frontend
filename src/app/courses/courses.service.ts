import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  // getCourses() {
  //   let res = this.http.get("api/sections/all/60ad3a52c43d1a2d74cf0821");
  //   console.log(res);
  // }

  async getCourses() {
    try {
      let res = await fetch("api/sections/all/60ad3a52c43d1a2d74cf0821", { method: 'GET' });
      if (res.status == 200) {
        console.log(await res.json());
      } else {
        console.log(await res.text());
      }
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  }

}
