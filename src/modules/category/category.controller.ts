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
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@ApiTags('Category Management API')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ description: 'Bad Request', status: HttpStatus.BAD_REQUEST })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description: 'Category created successfully',
        status: HttpStatus.CREATED
    })
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Category created successfully',
            result: await this.categoryService.create(createCategoryDto)
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({ description: 'Categories found', status: HttpStatus.OK })
    async findAll() {
        return {
            statusCode: HttpStatus.OK,
            message: 'List of categories',
            result: await this.categoryService.findAll()
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a category' })
    @ApiResponse({ description: 'Category found', status: HttpStatus.OK })
    @ApiResponse({
        description: 'Category not found',
        status: HttpStatus.NOT_FOUND
    })
    async findOne(@Param('id') id: string) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Category found',
            result: await this.categoryService.findOne(id)
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a category' })
    @ApiResponse({ description: 'Category updated', status: HttpStatus.OK })
    @ApiResponse({
        description: 'Category not found',
        status: HttpStatus.NOT_FOUND
    })
    @ApiResponse({ description: 'Bad Request', status: HttpStatus.BAD_REQUEST })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    async update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Category updated successfully',
            result: await this.categoryService.update(id, updateCategoryDto)
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category' })
    @ApiResponse({ description: 'Category deleted', status: HttpStatus.OK })
    @ApiResponse({
        description: 'Category not found',
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
            message: 'Category deleted successfully',
            result: await this.categoryService.remove(id)
        }
    }
}
