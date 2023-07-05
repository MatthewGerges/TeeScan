/* eslint-disable */

import { BSON } from 'realm';

export class Link extends Realm.Object<Link> {
  _id!: BSON.ObjectId;
  user!: string;
  LinkID!: string;
  originalURL!: string;

  static schema: Realm.ObjectSchema = {
    name: 'Link',
    primaryKey: '_id',
    properties: {
        _id: {type: 'objectId', default: () => new BSON.ObjectId()},
        user: { type: 'string', default: 'matthew.g.2219@gmail.com' },
      LinkID: { type: 'string', default: 'lnk_3dhs_9dCPkpOgUmB' },
      originalURL: 'string',
    },
  };
}
