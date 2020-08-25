import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ContactsFakeDb } from 'app/fake-db/contacts';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            // Contacts
            'contacts-user'    : ContactsFakeDb.user,
        };
    }
}
