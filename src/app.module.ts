import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AdminModule } from './module/admin/admin.module';
import { AdminService } from './service/admin.service';


@Module({
  imports: [AdminModule],
  controllers: [AppController],
  providers: [AdminService],
})
export class AppModule {}
 