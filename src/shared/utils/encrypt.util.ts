import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BeforeInsert } from 'typeorm';
const ROUNDS = 10;

export class EncryptUtil {
    static async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, ROUNDS);
        return hashedPassword;
    }

}