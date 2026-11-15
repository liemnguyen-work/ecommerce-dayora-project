import { BadRequestException, Injectable } from '@nestjs/common';
import type { PipeTransform } from '@nestjs/common';
import type { Scenario } from '../generated/prisma/enums.js';

export interface CatalogQuery {
  q?: string;
  category?: string;
  scenario?: Scenario;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  size?: number[];
  sort?: 'price_asc' | 'price_desc';
}

const MAX_NUMBER = 2_147_483_647;

@Injectable()
export class CatalogQueryPipe implements PipeTransform<unknown, CatalogQuery> {
  transform(value: unknown): CatalogQuery {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new BadRequestException('Truy vấn không hợp lệ');
    }

    const result: CatalogQuery = {};
    for (const [key, raw] of Object.entries(value)) {
      if (typeof raw !== 'string' || !raw.trim()) {
        throw new BadRequestException(`Giá trị không hợp lệ: ${key}`);
      }
      const text = raw.trim();

      switch (key) {
        case 'q':
        case 'category':
        case 'material':
          if (text.length > 100) {
            throw new BadRequestException(`Giá trị quá dài: ${key}`);
          }
          result[key] = text;
          break;

        case 'scenario':
          if (text !== 'PICNIC' && text !== 'DATE' && text !== 'BEACH') {
            throw new BadRequestException('Tình huống không hợp lệ');
          }
          result.scenario = text;
          break;

        case 'sort':
          if (text !== 'price_asc' && text !== 'price_desc') {
            throw new BadRequestException('Thứ tự sắp xếp không hợp lệ');
          }
          result.sort = text;
          break;

        case 'minPrice':
        case 'maxPrice':
        case 'capacity': {
          const number = Number(text);
          if (!/^\d+$/.test(text) || !Number.isSafeInteger(number) ||
              number > MAX_NUMBER || (key === 'capacity' && number < 1)) {
            throw new BadRequestException(`Giá trị không hợp lệ: ${key}`);
          }
          result[key] = number;
          break;
        }

        case 'size': {
          if (!/^\d+x\d+(?:x\d+)?$/.test(text)) {
            throw new BadRequestException('Kích thước không hợp lệ');
          }
          const dimensions = text.split('x').map(Number);
          if (dimensions.some((dimension) =>
            !Number.isSafeInteger(dimension) || dimension < 1 || dimension > MAX_NUMBER,
          )) {
            throw new BadRequestException('Kích thước không hợp lệ');
          }
          result.size = dimensions;
          break;
        }

        default:
          throw new BadRequestException(`Tham số không hỗ trợ: ${key}`);
      }
    }

    if (result.minPrice !== undefined && result.maxPrice !== undefined &&
        result.minPrice > result.maxPrice) {
      throw new BadRequestException('Giá tối thiểu không được lớn hơn giá tối đa');
    }
    return result;
  }
}
