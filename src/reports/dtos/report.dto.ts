import { Expose, Transform } from "class-transformer";
import { User } from "../../users/user.entity";

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lat: number;
  @Expose()
  lng: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  mileage: number;

  // obj is a reference to original report entity
  // Look at user property then id property from obj
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
