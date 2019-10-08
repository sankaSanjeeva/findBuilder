import { Role } from "./role";

export class User {
    id: number;
    role: Role;
    token?: string;
    nic: string;
}