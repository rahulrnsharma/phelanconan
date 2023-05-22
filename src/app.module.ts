import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AdminModule } from './module/admin/admin.module';
import { AdminService } from './service/admin.service';
import { AppDatabaseModule } from './module/database.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [AdminModule,ConfigModule.forRoot({
    isGlobal:true
  }),AppDatabaseModule.forRootConnection()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
 