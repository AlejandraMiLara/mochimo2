import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsService } from './projects/projects.service';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ProjectsModule],
  controllers: [AppController, ProjectsController], 
  providers: [AppService, ProjectsService],
})
export class AppModule {}
