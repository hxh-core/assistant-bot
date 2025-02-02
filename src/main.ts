import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors();
  app.enableCors({
    credentials: true,
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  });

  const PORT = configService.get('PORT') || 3002;

  await app.listen(PORT, () => {
    console.log(`Cервер запущен на порту ${PORT}.`);
    console.log(`http://localhost:${PORT}`);

    if (+PORT === 3333) {
      console.log('Сервер запущен в режиме разработки.');
    }

    if (+PORT === 3001) {
      console.log('Сервер запущен в production режиме.');
    }

    if (+PORT !== 3001 && +PORT !== 3333) {
      console.log('Возможно путь к файлу .env указан неправильно.');
    }
  });
}
bootstrap();
