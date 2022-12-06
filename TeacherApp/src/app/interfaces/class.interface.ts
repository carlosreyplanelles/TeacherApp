export interface Class {
    id?: number; 
    creation_datetime?: string;  
    teacher_id: number;
    student_id: number;
    title?: string;
    start_hour: number;
    end_hour?: number;
    start_date: string;
    cancel_date?: string;    
}
