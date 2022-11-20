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
    //city: string;
    province_id: number;
    //province:string;    
  }