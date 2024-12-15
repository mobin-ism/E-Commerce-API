import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseBoolPipe,
    ParseIntPipe,
    Patch,
    Post,
    Query
} from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { OrderService } from './order.service'

@ApiTags('Order Management API')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ description: 'Bad Request', status: HttpStatus.BAD_REQUEST })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description: 'Order created successfully',
        status: HttpStatus.CREATED
    })
    async create(@Body() createOrderDto: CreateOrderDto) {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Order created successfully',
            result: await this.orderService.create(createOrderDto)
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all orders' })
    @ApiResponse({ description: 'Orders found', status: HttpStatus.OK })
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number'
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of items per page'
    })
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit') limit: number,
        @Query('orderBy', new DefaultValuePipe('createdAt'))
        orderBy = 'createdAt',
        @Query('desc', new DefaultValuePipe(true), ParseBoolPipe)
        desc = true
    ) {
        limit = limit
            ? limit > parseInt(process.env.DEFAULT_PAGE_SIZE)
                ? parseInt(process.env.DEFAULT_PAGE_SIZE)
                : limit
            : parseInt(process.env.DEFAULT_PAGE_SIZE)

        const result = await this.orderService.paginate(
            {
                page,
                limit,
                route: process.env.APP_URL + '/api/v1/order'
            },
            orderBy,
            desc
        )

        return {
            statusCode: HttpStatus.OK,
            message: 'Data found',
            result: result.items,
            meta: result.meta,
            links: result.links
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an order' })
    @ApiResponse({ description: 'Order found', status: HttpStatus.OK })
    @ApiResponse({
        description: 'Order not found',
        status: HttpStatus.NOT_FOUND
    })
    async findOne(@Param('id') id: string) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Data found',
            result: await this.orderService.findOne(id)
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an order' })
    @ApiResponse({
        description: 'Order updated successfully',
        status: HttpStatus.OK
    })
    @ApiResponse({
        description: 'Order not found',
        status: HttpStatus.NOT_FOUND
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description: 'Order updated successfully',
        status: HttpStatus.OK
    })
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Order updated successfully',
            result: this.orderService.update(id, updateOrderDto)
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an order' })
    @ApiResponse({
        description: 'Order deleted successfully',
        status: HttpStatus.OK
    })
    @ApiResponse({
        description: 'Order not found',
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
            message: 'Order deleted successfully',
            result: await this.orderService.remove(id)
        }
    }
}
