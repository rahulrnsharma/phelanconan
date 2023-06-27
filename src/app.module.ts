import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AdminModule } from './module/admin/admin.module';
import { AppDatabaseModule } from './module/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppAuthModule } from './module/auth/auth.module';
import { AppInstituteModule } from './module/institute/institute.module';
import { AppCourseModule } from './module/course/course.module';
import { AppFacultyModule } from './module/faculty/faculty.module';
import { AppCeremonyModule } from './module/ceremony/ceremony.module';
import { AppDropdownModule } from './module/dropdown/dropdown.module';
import { AppGownModule } from './module/gown/gown.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppPaymentModule } from './module/payment/payment.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppStaffModule } from './module/staff/staff.module';

const MODULE = [
  AdminModule,
  AppAuthModule,
  AppInstituteModule,
  AppCourseModule,
  AppFacultyModule,
  AppCeremonyModule,
  AppDropdownModule,
  AppGownModule,
  AppPaymentModule,
  AppStaffModule
]



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: "rahulrnsharma@gmail.com",
          pass: "pxklyipvcijtlash"
        }
      }
    }),
    AppDatabaseModule.forRootConnection(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ...MODULE],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
