import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './libs/database/database.module';
import { JobsModule } from './features/jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),

    DatabaseModule,
    JobsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
