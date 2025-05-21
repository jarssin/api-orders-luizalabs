import { UserOrderRepository } from '../../../src/infra/repositories/userOrderRepository';
import { InMemoryStorage } from '../../../src/infra/services/inMemoryStorage';
import { IFileContent } from '../../../src/domain/entities/fileContent';
import { CombinedEntities } from '../../../src/domain/entities/combinedEntities';
import { OrderFilter } from '../../../src/application/useCases/interfaces/listUsersOrders';

describe('UserOrderRepository', () => {
  let repository: UserOrderRepository;
  let inMemoryStorage: jest.Mocked<InMemoryStorage>;

  beforeEach(() => {
    inMemoryStorage = {
      toArrayFiltered: jest.fn(),
      upsert: jest.fn(),
      get: jest.fn(),
      clear: jest.fn(),
      // outros métodos se necessário
    } as any;
    repository = new UserOrderRepository(inMemoryStorage);
  });

  it('should call inMemoryStorage.toArrayFiltered with filters and return the result', () => {
    const filters: OrderFilter = {
      order_id: 1,
      start_date: '2024-01-01',
      end_date: '2024-12-31',
    };
    const expected: CombinedEntities[] = [
      { user_id: 1, name: 'User', orders: [] },
    ];
    inMemoryStorage.toArrayFiltered.mockReturnValue(expected);
    const result = repository.findAll(filters);
    expect(inMemoryStorage.toArrayFiltered).toHaveBeenCalledWith(filters);
    expect(result).toBe(expected);
  });

  it('should call inMemoryStorage.upsert with user_id and content', () => {
    const content: IFileContent = {
      user_id: 1,
      name: 'User',
      order_id: 10,
      date: '2024-05-21',
      product_id: 100,
      value: 5000,
    };
    repository.upsert(content);
    expect(inMemoryStorage.upsert).toHaveBeenCalledWith(
      content.user_id,
      content,
    );
  });
});
