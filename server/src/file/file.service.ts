import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  async createFile(files: any[]): Promise<string[]> {
    try {
      const filePath = path.resolve(__dirname, '..', '..', 'static');
      const fileNames: string[] = [];

      for (const file of files) {
        const fileName = uuid.v4() + '.jpg';
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }
        fs.writeFileSync(path.join(filePath, fileName), file.buffer);
        fileNames.push(fileName);
      }
      return fileNames;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
