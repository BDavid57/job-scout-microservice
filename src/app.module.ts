import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './libs/database/database.module';
import { JobsModule } from './features/jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    DatabaseModule,
    JobsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
