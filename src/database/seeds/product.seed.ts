import { DataSource } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'

export class ProductSeed implements Seeder {
    public async run(factory: Factory, dataSource: DataSource) {}
}
