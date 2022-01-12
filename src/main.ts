import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
const cookieSession = require("cookie-session");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ["asdfdasf"],
    })
  );
  await app.listen(3000);
  // Used to balidate body
  app.useGlobalPipes(
    new ValidationPipe({
      // Whitelist removes extra non-validated properties
      whitelist: true,
    })
  );
}
bootstrap();
