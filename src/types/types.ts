export interface StoreEvent {
  post: {
    title: string;
    description?: string;
    start_date: string;
    end_date: string;
    location?: string;
    location_type: "physical" | "virtual" | "hybrid";
    max_participants?: number;
    is_private: boolean;
    status: "draft" | "published" | "cancelled";
    creator_id: number;
    group_id?: number;
  };
  loading: boolean;
  error: string;
  getAllEvent: () => void;
}
