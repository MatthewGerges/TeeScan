import {createRealmContext} from '@realm/react';
import {Item} from './ItemSchema';
import {Link} from './LinkSchema';

export const realmContext = createRealmContext({
  schema: [Item, Link],
});
