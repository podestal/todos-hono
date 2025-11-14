import { db, pool } from '../server/db/db'
import * as schema from '../server/db/schema'
import { seed } from 'drizzle-seed'

const seedDb = async () => {
    await seed(db, schema)
}

seedDb()
    .then(() => {
        console.log('Database seeded successfully')
    }).catch((error) => {
        console.error('Error seeding database:', error)
    }).finally(() => {
        return pool.end()
    })
