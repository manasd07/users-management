import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { getMetadataArgsStorage } from 'typeorm';

@Injectable()
export class BackendConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('nodeConfiguration.env');
  }

  get port(): number {
    return Number(this.configService.get<number>('nodeConfiguration.port'));
  }

  get typeormConfigOptions(): any {
    return {
      type: this.configService.get<string>('database.type'),
      host: this.configService.get<string>('database.host'),
      port: Number(this.configService.get<number>('database.port')),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      schema: this.configService.get<string>('database.schema'),
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      synchronize: Boolean(
        this.configService.get<boolean>('database.synchronize'),
      ),
      retryAttempts: Number(
        this.configService.get<number>('database.retryAttempts'),
      ),
      retryDelay: Number(this.configService.get<number>('database.retryDelay')),
      keepConnectionAlive: Boolean(
        this.configService.get<boolean>('database.keepConnectionAlive'),
      ),
    } as TypeOrmModuleOptions;
  }

  get jwtServerSecret(): string {
    return this.configService.get<string>('keys.jwtServerSecret');
  }
}
