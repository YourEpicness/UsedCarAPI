import { Module } from "@nestjs/common";
import { UsersController } from "../users/users.controller";
import { ReportsController } from "./reports.controller";
import { ReportsService } from "./reports.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportEntity } from "./report.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity])],
  controllers: [UsersController, ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
