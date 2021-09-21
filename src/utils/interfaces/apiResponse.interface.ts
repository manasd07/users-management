import { HttpStatus } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';

export interface IApiResponse<T> {
  success: boolean;
  status?: HttpStatus;
  message: string;
  data?: T;
  error?: any;
}

export interface IDeleteResponse {
  generatedMaps: ObjectLiteral[];
  raw: ObjectLiteral[];
  affected?: number;
}
