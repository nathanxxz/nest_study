import { HashingServiceProtocol } from "./hashing.service";
import * as  bcrypt from "bcryptjs"

export class BcryptService extends HashingServiceProtocol {
    
   async hash(senha: string): Promise<string> {
    const salto = await bcrypt.genSalt();
    return bcrypt.hash(senha,salto);
        
    }
    
  async  compare(senha: string, senhaHash: string): Promise<boolean> {
        return bcrypt.compare(senha,senhaHash);
    }


}