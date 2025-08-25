import { PlansT } from "./PlansT";

export type OrderT = {
    id: string;
    responsible_user_id: string;
    applicants_quantity: number;
    plan_id: PlansT["id"];
    payment_status: 'pending' | 'completed' | 'failed' | 'cancelled';
    payment_details: {
      plan_name: PlansT["plan_name"];
      price: PlansT["price"];
      [key: string]: any;
    };
    created_at: string;
  };