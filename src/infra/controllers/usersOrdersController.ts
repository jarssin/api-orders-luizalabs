import {
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileContent } from '../decorators/http/file-content.decorator';
import { ParseFileDto } from '../dto/parseFileDto';
import { OrderFilterDto } from '../dto/orderFilterDto';
import { IImportUsersOrdersFromFile } from 'src/application/useCases/interfaces/importOrdersFrimFile';
import { IListUsersOrders } from 'src/application/useCases/interfaces/listUsersOrders';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UserOrderOutputDto } from '../dto/output/userOdersDto';

@Controller('users/orders')
export class UsersOrdersController {
  constructor(
    @Inject('IImportUsersOrdersFromFile')
    private readonly importUsersOrdersFromFile: IImportUsersOrdersFromFile,
    @Inject('IListUsersOrders')
    private readonly listUsersOrders: IListUsersOrders,
  ) {}

  @Get()
  async getUsersOrders(@Query() query: OrderFilterDto) {
    const usersOrders = await this.listUsersOrders.execute(query);

    return usersOrders?.map((userOrders) =>
      plainToInstance(UserOrderOutputDto, userOrders),
    );
  }

  @Post('/import')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }),
  )
  async uploadFile(@FileContent() content: string) {
    const lines = ParseFileDto.parse(content);
    const usersOrders = await this.importUsersOrdersFromFile.execute(lines);

    return usersOrders?.map((userOrders) =>
      plainToInstance(UserOrderOutputDto, userOrders),
    );
  }
}
