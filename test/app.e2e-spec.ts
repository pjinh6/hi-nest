import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	/// 테스트 할때마다 매번 app을 생성하기 싫기 때문에
	/// beforeEach -> beforeAll로 변경
	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		/// 테스트 환경과 실제 환경을 맞춰줘야 한다.
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist :true,
				forbidNonWhitelisted: true,
				transform: true,	// 파라미터가 문자열로 넘어오므로 실제 데이터 타입으로 바꿔줄지 여부 옵션
			})
		);
		await app.init();
	});

	it('/ (GET)', () => {
		return request(app.getHttpServer())
			.get('/')
			.expect(200)
			.expect('Welcome to my Movie API');
	});

	describe('/movies', () => {
		it('GET', () => {
			return request(app.getHttpServer())
				.get('/movies')
				.expect(200)
				.expect([]);
		});

		it('POST 201', () => {
			return request(app.getHttpServer())
				.post('/movies')
				.send({
					title: 'Test Movic',
					genres: ['Test'],
					year: 2000,
				})
				.expect(201);
		});

		it('POST 400', () => {
			return request(app.getHttpServer())
				.post('/movies')
				.send({
					title: 'Test Movic',
					genres: ['Test'],
					year: 2000,
					other: 'thing'
				})
				.expect(400);
		});

		it('DELETE', () => {
			return request(app.getHttpServer())
				.delete('/movies')
				.expect(404);
		});
	});

	describe('/movies/:id', () => {
		it('GET 200', () => {
			return request(app.getHttpServer())
				.get('/movies/1')
				.expect(200);
		});
		it('PATCH', () => {
			return request(app.getHttpServer())
				.patch('/movies/1')
				.send({
					title: 'Updated Test'
				})
				.expect(200);
		});
		it('DELETE', () => {
			return request(app.getHttpServer())
				.delete('/movies/1')
				.expect(200);
		});
	});
});
