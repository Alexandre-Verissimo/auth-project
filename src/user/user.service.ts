import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const creadtedUser = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10)
      }
    })

    return {
      ...creadtedUser,
      password: undefined
    }
  }

  fidByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email
      }
    })
  }

}
