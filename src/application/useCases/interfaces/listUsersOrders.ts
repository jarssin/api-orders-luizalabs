import { CombinedEntities } from 'src/domain/entities/combinedEntities';

export type OrderFilter = {
  start_date?: string;
  end_date?: string;
  order_id?: number;
};

export interface IListUsersOrders {
  execute(filter: OrderFilter): Promise<CombinedEntities[] | null>;
}
