import { User } from './user.interface';

export interface Teacher extends User {
    teacher_id?: number;   
    phone: string;
    branch_id: number;
    price_hour: number;
    experience: string;
    validated: number;
    location_id: number;
    avatar: string;
    subjects: string;   
    latitude: number;
    longitude: number;
    address: string;
    city_id: number;
    city: string;
    province_id: number;
    province: string;    
  }

/*
Interface que usaba Francisco para los listados.

export interface Teacher {
    user_id?: number;
    name: string;
    surname: string;
    email: string;
    creation_date: string;
    teacher_id: number;
    phone: string;
    branch_id: number;
    branch_title: string;
    price_hour: number;
    experience: number;
    validated: number;
    location_id: number;
    address: string;
    city: string;
    province: string;
    latitude: number;
    longitude: number;
    avatar: string;
    subjects: string;
}
*/
