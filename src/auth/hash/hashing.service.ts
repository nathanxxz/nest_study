//Classe abastrata apenas para servir como um tipo

export abstract class HashingServiceProtocol{
    abstract hash(senha: string): Promise<string>;

    abstract compare(senha: string, senhaHash : string): Promise<boolean>;
}