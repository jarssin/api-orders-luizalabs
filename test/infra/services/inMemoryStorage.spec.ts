import { InMemoryStorage } from '../../../src/infra/services/inMemoryStorage';
import { IFileContent } from '../../../src/domain/entities/fileContent';

describe('InMemoryStorage', () => {
  let storage: InMemoryStorage;

  beforeEach(() => {
    storage = new InMemoryStorage();
    storage.clear();
  });

  it('should upsert and retrieve a user with orders', () => {
    const content: IFileContent = {
      user_id: 1,
      name: 'User',
      order_id: 10,
      date: '2024-05-21',
      product_id: 100,
      value: 5000,
    };
    storage.upsert(content.user_id, content);
    const user = storage.get(content.user_id);
    expect(user).toBeDefined();
    expect(user.name).toBe('User');
    expect(user.orders.get(10)).toBeDefined();
  });

  it('should accumulate products and total in the same order', () => {
    const content1: IFileContent = {
      user_id: 1,
      name: 'User',
      order_id: 10,
      date: '2024-05-21',
      product_id: 100,
      value: 5000,
    };
    const content2: IFileContent = {
      user_id: 1,
      name: 'User',
      order_id: 10,
      date: '2024-05-21',
      product_id: 101,
      value: 2500,
    };
    storage.upsert(content1.user_id, content1);
    storage.upsert(content2.user_id, content2);
    const user = storage.get(1);
    const order = user.orders.get(10);
    expect(order.products.length).toBe(2);
    expect(order.total).toBe(5000 + 2500);
  });

  it('should filter orders by order_id and date range', () => {
    const content1: IFileContent = {
      user_id: 1,
      name: 'User',
      order_id: 10,
      date: '2024-05-21',
      product_id: 100,
      value: 5000,
    };
    const content2: IFileContent = {
      user_id: 1,
      name: 'User',
      order_id: 11,
      date: '2024-05-22',
      product_id: 101,
      value: 2500,
    };
    storage.upsert(content1.user_id, content1);
    storage.upsert(content2.user_id, content2);
    const filtered = storage.toArrayFiltered({
      order_id: 10,
      start_date: '2024-05-20',
      end_date: '2024-05-21',
    });
    expect(filtered.length).toBe(1);
    expect(filtered[0].orders.length).toBe(1);
    expect(filtered[0].orders[0].order_id).toBe(10);
  });

  it('should clear all data', () => {
    const content: IFileContent = {
      user_id: 1,
      name: 'User',
      order_id: 10,
      date: '2024-05-21',
      product_id: 100,
      value: 5000,
    };
    storage.upsert(content.user_id, content);
    storage.clear();
    expect(storage.get(1)).toBeUndefined();
  });
});
