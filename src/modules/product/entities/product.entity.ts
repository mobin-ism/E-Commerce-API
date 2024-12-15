import { CustomBaseEntity } from 'src/common/entity/custom-base.entity'
import { Category } from 'src/modules/category/entities/category.entity'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
export class Product extends CustomBaseEntity {
    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    name: string

    @Column({
        type: 'text',
        nullable: true
    })
    description: string

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
        default: 0
    })
    price: number

    @Column({
        type: 'int',
        nullable: true,
        default: 0
    })
    quantity: number

    @Column({
        type: 'int',
        nullable: true
    })
    categoryId: number

    @ManyToOne(() => Category, (category) => category.products, {
        onDelete: 'CASCADE'
    })
    category: Category
}
