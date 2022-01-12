import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { UserDto } from "../users/dtos/user.dto";

export function Serialize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler
    return handler.handle().pipe(
      map((data: T) => {
        // Run something before the response is sent out

        // Convert data to an instance of userDTO
        return plainToInstance(this.dto, data, {
          // Removes the properties that aren't Expose in DTO
          excludeExtraneousValues: true,
        });
      })
    );
  }
}
