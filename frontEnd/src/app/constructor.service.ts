import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
/* import { Subject } from 'rxjs';
import { Observable } from 'rxjs'; */

@Injectable({
  providedIn: 'root'
})
export class ConstructorService {

  authToken: any;
  user: any;

  uri = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  upload(content) {
    return this.http.post(`${this.uri}/upload/profilePic`, content, { reportProgress: true, observe: 'events' });
  }

/*   public upload(files: Set<File>): {[key: string]: Observable<number>} {
    // this will be the our resulting map
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', this.uri, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage
          const percentDone = Math.round(100*event.loaded/event.total);

          // pass the percentage into the progress-stream

          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  } */

  //get all
  getConstructors(){
    return this.http.get(`${this.uri}/users/view`);
  }

  //get all filtering cTypes
  getConstructorsBycType(type: String){
    return this.http.get(`${this.uri}/users/cTypes?cType=`+type);
  }

  //get all filtering distric
  getConstructorsByDistric(distric: String){
    return this.http.get(`${this.uri}/users/districs?distric=`+distric);
  }

  //get all filtering gender
  getConstructorsByGender(gender: String){
    return this.http.get(`${this.uri}/users/genders?gender=`+gender);
  }

  //search all by fname
  searchConstructorByName(name){
    return this.http.get(`${this.uri}/users/searchByName?fName=`+name);
  }

  //search all by fname
  searchConstructorByCity(city){
    return this.http.get(`${this.uri}/users/searchByCity?city=`+city);
  }

  //get one by id
  getConstructorsByID(id){
    return this.http.get(`${this.uri}/users/view/${id}`);
  }

  getRegisteredConstructors(state){
    return this.http.get(`${this.uri}/users/state?state=`+state);
  }

  //register constructors
  registerConstructor(fName, mName, lName, line1, line2, line3, city, distric, birthday, gender, nic, email, phone, cType, password){
    const constructor = {
      register: false,
      fName: fName,
      mName: mName,
      lName: lName,
      line1: line1,
      line2: line2,
      line3: line3,
      city: city,
      distric: distric,
      birthday: birthday,
      gender: gender,
      nic: nic,
      email: email,
      phone: phone,
      cType: cType,
      password: password,
    };
    return this.http.post(`${this.uri}/users/register`, constructor)
  }


  //update a constructor
  updateConstructor(id, fName, mName, lName, line1, line2, line3, city, distric, birthday, gender, nic, email, phone, cType){
    const constructor = {
      fName: fName,
      mName: mName,
      lName: lName,
      line1: line1,
      line2: line2,
      line3: line3,
      city: city,
      distric: distric,
      birthday: birthday,
      gender: gender,
      nic: nic,
      email: email,
      phone: phone,
      cType: cType
    };
    return this.http.post(`${this.uri}/users/update/${id}`, constructor)
  }

  updateConstructor2(id, register, fName, mName, lName, line1, line2, line3, city, distric, birthday, gender, nic, email, phone, cType){
    const constructor = {
      register: register,
      fName: fName,
      mName: mName,
      lName: lName,
      line1: line1,
      line2: line2,
      line3: line3,
      city: city,
      distric: distric,
      birthday: birthday,
      gender: gender,
      nic: nic,
      email: email,
      phone: phone,
      cType: cType
    };
    return this.http.post(`${this.uri}/users/update2/${id}`, constructor)
  }

  //delete a constructor
  deleteConstructor(id){
    return this.http.delete(`${this.uri}/users/delete/${id}`);
  }

}
