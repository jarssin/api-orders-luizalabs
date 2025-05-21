import { IListUsersOrders, OrderFilter } from './interfaces/listUsersOrders';
import { Inject, Injectable } from '@nestjs/common';
import { IUsersOrderRepository } from 'src/domain/repositories/orderRepository';
import { CombinedEntities } from 'src/domain/entities/combinedEntities';

@Injectable()
export class ListUsersOrders implements IListUsersOrders {
  constructor(
    @Inject('IUsersOrderRepository')
    private readonly orderRepository: IUsersOrderRepository,
  ) {}

  async execute(filter: OrderFilter): Promise<CombinedEntities[] | null> {
    return this.orderRepository.findAll(filter);
  }
}
