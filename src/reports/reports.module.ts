import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  controllers: [UsersController, ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
