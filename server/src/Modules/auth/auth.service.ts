import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SelectUserWithoutPassword } from 'src/Models/_types';
import { EncryptionService } from '../shared/encryption/encryption.service';
import { UserService } from '../shared/user/user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly encryptionService: EncryptionService,
        ) {}

    async validateUser(email: string, password: string): Promise<SelectUserWithoutPassword | null> {
        const user = await this.userService.queryUserCredentialsByEmail(email);
        if (!user) throw new NotFoundException('User not found');

        const isPasswordValid = await this.encryptionService.comparePassword(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

        if (user && isPasswordValid) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<string | Error> {
        const user = await this.userService.queryUserCredentialsByEmail(createUserDTO.email);
        if (user) return new HttpException('User with this email already exists', HttpStatus.CONFLICT);

        const newUser = await this.userService.insertNewUser(createUserDTO);
        return newUser;
    }   
}
