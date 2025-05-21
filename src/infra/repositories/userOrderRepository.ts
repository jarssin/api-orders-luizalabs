import { Injectable } from '@nestjs/common';
import { CombinedEntities } from 'src/domain/entities/combinedEntities';
import { IFileContent } from 'src/domain/entities/fileContent';
import { IUsersOrderRepository } from 'src/domain/repositories/orderRepository';
import { InMemoryStorage } from '../services/inMemoryStorage';
import { OrderFilter } from 'src/application/useCases/interfaces/listUsersOrders';

@Injectable()
export class UserOrderRepository implements IUsersOrderRepository {
  constructor(private readonly inMemoryStorage: InMemoryStorage) {}

  findAll(filters: OrderFilter): CombinedEntities[] | null {
    return this.inMemoryStorage.toArrayFiltered(filters);
  }

  upsert(content: IFileContent): void {
    const { user_id } = content;
    this.inMemoryStorage.upsert(user_id, content);
  }
}
