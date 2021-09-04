import * as bcrypt from 'bcrypt';
import { BeforeInsert } from 'typeorm';
const ROUNDS = 10;

export class EncryptUtil {
    @BeforeInsert()
    static async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, ROUNDS);
        return hashedPassword;
    }

    static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    }
}