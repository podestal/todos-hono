import { db, pool } from '../server/db/db'
import * as schema from '../server/db/schema'
import { seed } from 'drizzle-seed'

const seedDb = async () => {
    await seed(db, schema).refine( funcs => ({
        user: {
            columns: {},
            count: 10,
            with: {
                todos: 10
            }
        },
        todos: {
            columns: {
                title: funcs.valuesFromArray({
                    values: [
                        'Buy groceries',
                        'Do laundry',
                        'Clean the house',
                        'Wash the car',
                        'Mow the lawn',
                        'Fix the leaky faucet',
                        'Buy a new phone',
                    ]
                }),
                description: funcs.valuesFromArray({
                    values: [
                        'Buy groceries for the week',
                        'Wash the clothes',
                        'Clean the house',
                        'Wash the car',
                        'Mow the lawn',
                        'Fix the leaky faucet',
                        undefined,
                    ]
                }),
            }
        }
    }))
}

seedDb()
    .then(() => {
        console.log('Database seeded successfully')
    }).catch((error) => {
        console.error('Error seeding database:', error)
    }).finally(() => {
        return pool.end()
    })
