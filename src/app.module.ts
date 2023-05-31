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

const MODULE = [
  AdminModule,
  AppAuthModule,
  AppInstituteModule,
  AppCourseModule,
  AppFacultyModule,
  AppCeremonyModule,
  AppDropdownModule
]



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AppDatabaseModule.forRootConnection(),
    ...MODULE],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
