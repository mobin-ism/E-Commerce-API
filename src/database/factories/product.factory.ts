import { Product } from 'src/modules/product/entities/product.entity'
import { define } from 'typeorm-seeding'
define(Product, () => {
    return new Product()
})
