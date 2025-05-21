import { CombinedEntities } from 'src/domain/entities/combinedEntities';
import { IFileContent } from 'src/domain/entities/fileContent';

export interface IImportUsersOrdersFromFile {
  execute(fileContent: IFileContent[]): Promise<CombinedEntities[]>;
}
