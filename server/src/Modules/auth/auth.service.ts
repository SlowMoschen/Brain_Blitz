import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../shared/user/user.service';
import { EncryptionService } from '../shared/encryption/encryption.service';
import { SelectUser, SelectUserWithoutPassword } from 'src/Models/_types';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly encryptionService: EncryptionService,
        ) {}

    async validateUser(email: string, password: string): Promise<SelectUserWithoutPassword | null> {
        const user = await this.userService.queryUserCredentialsByEmail(email);
        const isPasswordValid = await this.encryptionService.comparePassword(password, user.password);
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
