import { ListUsersOrders } from '../../../src/application/useCases/listUsersOrders';
import { IUsersOrderRepository } from '../../../src/domain/repositories/orderRepository';
import { CombinedEntities } from '../../../src/domain/entities/combinedEntities';
import { OrderFilter } from '../../../src/application/useCases/interfaces/listUsersOrders';

describe('ListUsersOrders', () => {
  let listUsersOrders: ListUsersOrders;
  let orderRepository: jest.Mocked<IUsersOrderRepository>;

  beforeEach(() => {
    orderRepository = {
      findAll: jest.fn(),
      upsert: jest.fn(),
    } as any;
    listUsersOrders = new ListUsersOrders(orderRepository);
  });

  it('should return users and orders according to the filter', async () => {
    const filter: OrderFilter = {
      order_id: 1,
      start_date: '2024-01-01',
      end_date: '2024-12-31',
    };
    const expected: CombinedEntities[] = [
      { user_id: 1, name: 'User', orders: [] },
    ];
    orderRepository.findAll.mockReturnValue(expected);

    const result = await listUsersOrders.execute(filter);
    expect(orderRepository.findAll).toHaveBeenCalledWith(filter);
    expect(result).toBe(expected);
  });

  it('should return null if the repository returns null', async () => {
    orderRepository.findAll.mockReturnValue(null);
    const result = await listUsersOrders.execute({});
    expect(result).toBeNull();
  });
});
