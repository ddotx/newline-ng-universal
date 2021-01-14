import {Inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MongoService {

  constructor(
    @Inject('dbConnection') private dbConnection
  ) { }

  /*public async retrieveFromDb(
    collectionName,
    project = {},
    query = {}
  ): Promise<any[]>{
    return []
  }*/

  public async retrieveFromDb<T>( // <- Use generic type
    collectionName,
    project = {},
    query = {}
  ): Promise<T[]> {

    // ! wait for async to resolve with setInterval()
    const intervalId = setInterval(() => {}, 1000); //https://github.com/angular/universal-starter/issues/181

    project['_id'] = 0;
    const db = await this.dbConnection;
    return new Promise((resolve) => {
      db.collection(collectionName)
        .aggregate([
          { $match: query },
          { $addFields: { id: { $toString: '$_id' } } },
          { $project: project },
        ])
        .toArray((err, objects) => {
          resolve(objects);
          clearInterval(intervalId);
        });
    });
  }
}
