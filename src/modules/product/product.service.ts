import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryService } from '../category/category.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly categoryService: CategoryService
    ) {}

    /**
     * Create a new product
     * @param createProductDto
     * @returns
     */
    async create(createProductDto: CreateProductDto) {
        // Check if category exists
        if (createProductDto.categoryId) {
            const category = await this.categoryService.findOne(
                createProductDto.categoryId
            )

            if (!category) {
                throw new HttpException(
                    `Category with ID ${createProductDto.categoryId} does not exist`,
                    HttpStatus.NOT_FOUND
                )
            }
        }
        try {
            const aboutToCreateProduct =
                this.productRepository.create(createProductDto)
            return await this.productRepository.save(aboutToCreateProduct)
        } catch (error) {
            throw new HttpException(
                'An error occurred while creating a product',
                HttpStatus.BAD_REQUEST
            )
        }
    }

    /**
     * Retrieve all products
     * @returns
     */
    async findAll() {
        return await this.productRepository.find({
            relations: {
                category: true
            }
        })
    }

    /**
     * Return a product
     * @param id
     * @returns
     */
    async findOne(id: string) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: {
                category: true
            }
        })

        if (!product) {
            throw new HttpException(
                `Product with ID ${id} does not exist`,
                HttpStatus.NOT_FOUND
            )
        }

        return product
    }

    /**
     * Update a product
     * @param id
     * @param updateProductDto
     * @returns
     */
    async update(id: string, updateProductDto: UpdateProductDto) {
        // Check if category exists
        if (updateProductDto.categoryId) {
            const category = await this.categoryService.findOne(
                updateProductDto.categoryId
            )

            if (!category) {
                throw new HttpException(
                    `Category with ID ${updateProductDto.categoryId} does not exist`,
                    HttpStatus.NOT_FOUND
                )
            }
        }

        try {
            await this.productRepository.update(id, updateProductDto)
            return await this.productRepository.findOne({
                where: { id },
                relations: {
                    category: true
                }
            })
        } catch (error) {
            throw new HttpException(
                'An error occurred while updating a product',
                HttpStatus.BAD_REQUEST
            )
        }
    }

    /**
     * Soft delete a product
     * @param id
     * @returns
     */
    async remove(id: string) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: {
                category: true
            }
        })

        if (!product) {
            throw new HttpException(
                `Product with ID ${id} does not exist`,
                HttpStatus.NOT_FOUND
            )
        }

        try {
            await this.productRepository.softDelete(id)
            return product
        } catch (error) {
            throw new HttpException(
                'An error occurred while deleting a product',
                HttpStatus.BAD_REQUEST
            )
        }
    }
}
