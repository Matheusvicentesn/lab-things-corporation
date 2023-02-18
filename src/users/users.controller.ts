/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { CredentialsDTO } from 'src/auth/dto/credentials.dto';
import { updatePasswordDTO } from 'src/auth/dto/update-password.dto';
import { updateUserDTO } from 'src/auth/dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUsersDeviceDto } from './dto/create-users_device.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiResponse({ status: 200 })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @ApiResponse({ status: 200, description: 'user data' })
  @ApiResponse({
    status: 401,
    description: 'invalid login data',
  })
  @Post('/signin')
  async singIn(@Body() credentials: CredentialsDTO) {
    try {
      return await this.authService.signIn(credentials);
    } catch (error) {
      if ((error = 'data invalid')) {
        throw new UnauthorizedException('invalid login data');
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({ status: 201, description: 'User Created' })
  @ApiResponse({
    status: 409,
    description: 'User alredy exists in data base',
  })
  @ApiResponse({
    status: 400,
    description: 'Missing information',
  })
  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      await this.authService.signUp(createUserDto);
      return {
        message: 'user created successfully',
      };
    } catch (error) {
      if (error.code == 23505)
        throw new HttpException(
          { reason: 'email already exists in the database' },
          HttpStatus.CONFLICT,
        );
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({ status: 200, description: 'Password update' })
  @ApiResponse({
    status: 401,
    description: 'E-mail or password invalid',
  })
  @ApiResponse({
    status: 400,
    description: 'Missing information',
  })
  @UseGuards(JwtAuthGuard)
  @Put('/updatepassword')
  async updatePassword(
    @Body() updatePasswordDTO: updatePasswordDTO,
    @Request() payload,
  ) {
    try {
      await this.authService.updatePassword(updatePasswordDTO, payload.user);
      return {
        message: 'updated password',
      };
    } catch (error) {
      if ((error = 'data invalid')) {
        throw new UnauthorizedException('email or password invalid');
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({ status: 201, description: 'Device linked' })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/linkdevice')
  async createDeviceForUser(
    @Body() createDevice: CreateUsersDeviceDto,
    @Request() payload,
  ) {
    try {
      await this.usersService.createDeviceForUser(createDevice, payload.user);
      return {
        message: 'successfully linked device',
      };
    } catch (error) {
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }
  @ApiResponse({ status: 200, description: 'Array of devices' })
  @ApiResponse({
    status: 404,
  })
  @ApiResponse({
    status: 400,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  @Get('searchdevices')
  async searchDevices(@Request() payload, @Query('local') query) {
    try {
      return await this.usersService.findUserDevices(payload.user, query);
    } catch (error) {
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({ status: 200, description: 'Device info' })
  @ApiResponse({
    status: 404,
  })
  @ApiResponse({
    status: 400,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  @Get('userDeviceInfo/:id')
  async userDeviceInfo(@Request() payload, @Param('id') id: string) {
    try {
      return await this.usersService.userDeviceInfo(payload.user, +id);
    } catch (error) {
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({ status: 200, description: 'User info' })
  @ApiResponse({
    status: 404,
  })
  @ApiResponse({
    status: 400,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  @Get('userinfo')
  async userInfo(@Request() payload) {
    try {
      return await this.usersService.findUser(payload.user);
    } catch (error) {
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({ status: 200, description: 'Change the device state' })
  @ApiResponse({
    status: 400,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  @Put('switchdevice/:id')
  async updateUserState(@Request() payload, @Param('id') id: string) {
    try {
      return await this.usersService.updateUserState(payload.user, +id);
    } catch (error) {
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({ status: 200, description: 'Update user info' })
  @ApiResponse({
    status: 401,
    description: 'E-mail or password invalid',
  })
  @ApiResponse({
    status: 400,
  })
  @UseGuards(JwtAuthGuard)
  @Put('/updateUser')
  async updateUser(@Body() updateUserDTO: updateUserDTO, @Request() payload) {
    try {
      await this.authService.updateUser(updateUserDTO, payload.user);
      return {
        message: 'user Updated',
      };
    } catch (error) {
      if (error == 'data invalid') {
        throw new UnauthorizedException('email or password invalid');
      }
      throw new HttpException({ reason: error }, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({ status: 200, description: 'Device deleted' })
  @ApiResponse({
    status: 400,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('deleteuserdevice/:id')
  async deleteUserDevice(@Param('id') id: string, @Request() payload) {
    try {
      await this.usersService.deleteUserDevice(+id, payload.user);
      return {
        message: 'device deleted',
      };
    } catch (error) {
      throw new HttpException(
        { reason: 'This device is not yours or not exists' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
