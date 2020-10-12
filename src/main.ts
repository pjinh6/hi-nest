import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist :true,
			forbidNonWhitelisted: true,
			transform: true,	// 파라미터가 문자열로 넘어오므로 실제 데이터 타입으로 바꿔줄지 여부 옵션
		})
	);
	await app.listen(3000);
}
bootstrap();
