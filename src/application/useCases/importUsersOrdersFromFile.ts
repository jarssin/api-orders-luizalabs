import { IFileContent } from 'src/domain/entities/fileContent';
import { IImportUsersOrdersFromFile } from './interfaces/importOrdersFrimFile';
import { Inject, Injectable } from '@nestjs/common';
import { IUsersOrderRepository } from 'src/domain/repositories/orderRepository';
import { CombinedEntities } from 'src/domain/entities/combinedEntities';

@Injectable()
export class ImportUsersOrdersFromFile implements IImportUsersOrdersFromFile {
  constructor(
    @Inject('IUsersOrderRepository')
    private readonly orderRepository: IUsersOrderRepository,
  ) {}

  async execute(fileContent: IFileContent[]): Promise<CombinedEntities[]> {
    for (const content of fileContent) {
      if (!content || content.user_id == undefined) {
        continue;
      }

      this.orderRepository.upsert(content);
    }

    const userOrders = this.orderRepository.findAll({});
    return userOrders!;
  }
}
