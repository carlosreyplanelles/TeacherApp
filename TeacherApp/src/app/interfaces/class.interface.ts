export interface Class {
    id?: number; 
    creation_datetime?: string;  
    teacherId: number;
    studentId: number;
    title?: string;
    start_hour: number;
    end_hour?: number;
    start_date: Date | string | null;
    cancel_date?: string;    
}
