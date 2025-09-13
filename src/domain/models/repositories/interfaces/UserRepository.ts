import { User } from "../../user/User";
export default interface UserRepository {
    save(user: User): Promise<void>;

    getAll(): Promise<User[]>;

    getById(id: any): Promise<User | null>;

    update(id:any, email?:string, dpi?:string, name?:string, age?:number, is_valid?:boolean, phone?:string): Promise<void>;

    dzelete(id: any): Promise<void>;

}