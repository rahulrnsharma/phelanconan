import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AdminModule } from './module/admin/admin.module';
import { AdminService } from './service/admin.service';
import { AppDatabaseModule } from './module/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppAuthModule } from './module/auth/auth.module';
import { AuthService } from './service/auth.service';


@Module({
  imports: [AdminModule,AppAuthModule,ConfigModule.forRoot({
    isGlobal:true
  }),AppDatabaseModule.forRootConnection()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
 