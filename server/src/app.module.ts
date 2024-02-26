import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60,
        limit: 10,
      },
      {
        name: 'verificationEmail',
        ttl: 60 * 60, // 1 hour
        limit: 3,
      },
    ]),
  ],
})
export class AppModule {}
