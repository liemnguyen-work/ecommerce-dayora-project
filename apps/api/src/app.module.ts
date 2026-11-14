import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, CatalogModule],
  controllers: [AppController],
})
export class AppModule {}
