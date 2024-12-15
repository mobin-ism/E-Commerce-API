import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductService } from './product.service'

@ApiTags('Product Mangement API')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ description: 'Bad Request', status: HttpStatus.BAD_REQUEST })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description: 'Product created successfully',
        status: HttpStatus.CREATED
    })
    async create(@Body() createProductDto: CreateProductDto) {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Product created successfully',
            result: await this.productService.create(createProductDto)
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ description: 'Products found', status: HttpStatus.OK })
    async findAll() {
        return {
            statusCode: HttpStatus.OK,
            message: 'List of products',
            result: await this.productService.findAll()
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product' })
    @ApiResponse({ description: 'Product found', status: HttpStatus.OK })
    @ApiResponse({
        description: 'Product not found',
        status: HttpStatus.NOT_FOUND
    })
    async findOne(@Param('id') id: string) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Product found',
            result: await this.productService.findOne(id)
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a product' })
    @ApiResponse({
        description: 'Product updated successfully',
        status: HttpStatus.OK
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description: 'Product updated successfully',
        status: HttpStatus.OK
    })
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Product updated successfully',
            result: await this.productService.update(id, updateProductDto)
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product' })
    @ApiResponse({
        description: 'Product deleted successfully',
        status: HttpStatus.OK
    })
    @ApiResponse({
        description: 'Product not found',
        status: HttpStatus.NOT_FOUND
    })
    @ApiResponse({ description: 'Bad Request', status: HttpStatus.BAD_REQUEST })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    async remove(@Param('id') id: string) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Product deleted successfully',
            result: await this.productService.remove(id)
        }
    }
}
