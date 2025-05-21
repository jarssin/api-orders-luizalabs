import { Injectable } from '@nestjs/common';
import { UserMap } from '../dto/maps/userMap';
import { IFileContent } from 'src/domain/entities/fileContent';
import { OrderMap } from '../dto/maps/orderMap';
import { CombinedEntities } from 'src/domain/entities/combinedEntities';
import { OrderFilter } from 'src/application/useCases/interfaces/listUsersOrders';

@Injectable()
export class InMemoryStorage {
  private static instance: InMemoryStorage;
  private storage: Map<number, UserMap>;

  constructor() {
    this.storage = new Map<number, UserMap>();
  }

  public static getInstance(): InMemoryStorage {
    if (!InMemoryStorage.instance) {
      InMemoryStorage.instance = new InMemoryStorage();
    }
    return InMemoryStorage.instance;
  }

  public upsert(key: number, content: IFileContent): void {
    const { name, order_id, date, product_id, value } = content;
    const existingUser = this.storage.get(key);

    if (existingUser) {
      const existingOrder = existingUser!.orders.get(content.order_id);

      if (existingOrder) {
        existingOrder.total += value;
        existingOrder.products.push({ product_id, value });
      } else {
        existingUser!.orders.set(content.order_id, {
          order_id,
          date,
          total: 0,
          products: [{ product_id, value }],
        });
      }

      return;
    }

    this.storage.set(key, {
      name,
      orders: new Map<number, OrderMap>([
        [
          order_id,
          {
            order_id,
            date,
            total: value,
            products: [{ product_id, value }],
          },
        ],
      ]),
    });
  }

  public get(key: number): any | undefined {
    return this.storage.get(key);
  }

  public clear(): void {
    this.storage.clear();
  }

  public toArrayFiltered({
    start_date,
    end_date,
    order_id,
  }: OrderFilter): CombinedEntities[] {
    return Array.from(this.storage.entries())
      .map(([user_id, user]) => {
        const filteredOrders = Array.from(user.orders.values()).filter(
          (order) => {
            let isValid = true;
            if (order_id !== undefined && order.order_id !== order_id) {
              isValid = false;
            }
            if (start_date) {
              isValid = isValid && order.date >= start_date;
            }
            if (end_date) {
              isValid = isValid && order.date <= end_date;
            }
            return isValid;
          },
        );
        if (filteredOrders.length === 0) return null;
        return {
          user_id,
          name: user.name,
          orders: filteredOrders.map((order) => ({
            order_id: order.order_id,
            date: order.date,
            total: order.total,
            products: order.products,
          })),
        };
      })
      .filter((user) => user !== null) as CombinedEntities[];
  }
}
