export interface Task {
    id: string;
    user_id: string;
    name: string;
    category: 'direct' | 'investment';
    duration: number;
    cost: number;
    current_revenue: number;
    potential_revenue: number;
    completion_date: string; // ISO format datuma
    revenue_date: string | null; // ISO format datuma ili null
    created_at: string;
    updated_at: string;
  }
  
  export interface TaskFormValues {
    name: string;
    category: 'direct' | 'investment';
    duration: number;
    cost: number;
    currentRevenue: number;
    potentialRevenue: number;
    completionDate: Date;
    revenueDate?: Date;
  }