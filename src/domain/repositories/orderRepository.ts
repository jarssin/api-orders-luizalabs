import { OrderFilter } from 'src/application/useCases/interfaces/listUsersOrders';
import { CombinedEntities } from '../entities/combinedEntities';
import { IFileContent } from '../entities/fileContent';

export interface IUsersOrderRepository {
  findAll(filters: OrderFilter): CombinedEntities[] | null;
  upsert(content: IFileContent): void;
}
