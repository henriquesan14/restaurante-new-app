import { Address } from "./address.interface";
import { Avatar } from "./avatar.interface";
import { Role } from "./role.interface";


export interface Usuario {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  document: string;
  phoneNumber: string;
  role: Role;
  roleId: number;
  addresses: Address[];
  avatar: Avatar;
  createdAt: string;
}
