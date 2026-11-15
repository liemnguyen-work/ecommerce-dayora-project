
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AdminUsersModule } from './admin-users/admin-users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AdminUsersModule,
  ],
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, CatalogModule],
  controllers: [AppController],
})
export class AppModule {}
