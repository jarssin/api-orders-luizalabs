import { Module } from '@nestjs/common';
import { UsersOrdersController } from './infra/controllers/usersOrdersController';
import { ImportUsersOrdersFromFile } from './application/useCases/importUsersOrdersFromFile';
import { InMemoryStorage } from './infra/services/inMemoryStorage';
import { UserOrderRepository } from './infra/repositories/userOrderRepository';
import { ListUsersOrders } from './application/useCases/listUsersOrders';

@Module({
  imports: [],
  controllers: [UsersOrdersController],
  providers: [
    InMemoryStorage,
    {
      provide: 'IImportUsersOrdersFromFile',
      useClass: ImportUsersOrdersFromFile,
    },
    {
      provide: 'IListUsersOrders',
      useClass: ListUsersOrders,
    },
    {
      provide: 'IUsersOrderRepository',
      useClass: UserOrderRepository,
    },
  ],
})
export class AppModule {}
