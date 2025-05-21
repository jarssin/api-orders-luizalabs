import { ImportUsersOrdersFromFile } from '../../../src/application/useCases/importUsersOrdersFromFile';
import { IUsersOrderRepository } from '../../../src/domain/repositories/orderRepository';
import { IFileContent } from '../../../src/domain/entities/fileContent';
import { CombinedEntities } from '../../../src/domain/entities/combinedEntities';

describe('ImportUsersOrdersFromFile', () => {
  let importUsersOrdersFromFile: ImportUsersOrdersFromFile;
  let orderRepository: jest.Mocked<IUsersOrderRepository>;

  beforeEach(() => {
    orderRepository = {
      upsert: jest.fn(),
      findAll: jest.fn(),
    } as any;
    importUsersOrdersFromFile = new ImportUsersOrdersFromFile(orderRepository);
  });

  it('deve ignorar conteúdos inválidos e chamar upsert apenas para conteúdos válidos', async () => {
    const fileContent: IFileContent[] = [
      {
        user_id: 1,
        name: 'User',
        order_id: 1,
        date: '2024-01-01',
        product_id: 1,
        value: 100,
      },
      undefined as any,
      {
        user_id: undefined,
        name: 'User',
        order_id: 2,
        date: '2024-01-01',
        product_id: 2,
        value: 200,
      },
    ];
    orderRepository.findAll.mockReturnValue([]);

    await importUsersOrdersFromFile.execute(fileContent);

    expect(orderRepository.upsert).toHaveBeenCalledTimes(1);
    expect(orderRepository.upsert).toHaveBeenCalledWith(fileContent[0]);
  });

  it('deve retornar o resultado de findAll', async () => {
    const fileContent: IFileContent[] = [
      {
        user_id: 1,
        name: 'User',
        order_id: 1,
        date: '2024-01-01',
        product_id: 1,
        value: 100,
      },
    ];
    const expected: CombinedEntities[] = [
      { user_id: 1, name: 'User', orders: [] },
    ];
    orderRepository.findAll.mockReturnValue(expected);

    const result = await importUsersOrdersFromFile.execute(fileContent);
    expect(result).toBe(expected);
    expect(orderRepository.findAll).toHaveBeenCalledWith({});
  });
});
