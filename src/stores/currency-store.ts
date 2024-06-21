import axios from 'axios';
import { create } from 'zustand';

interface CurrencyState {
  currency: string;
  setCurrency: (newValue: string) => void;
  fetchCurrency: (userId: number) => Promise<void>;
}

const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: "",
  setCurrency: (newValue) => {
    set({ currency: newValue });
  },
  fetchCurrency: async (userId) => {
    if (userId) {
      try {
        const response = await axios.get(`/api/get-currency?userId=${userId}`);
        set({ currency: response.data.currency });
      } catch (error) {
        console.error("Error fetching currency:", error);
      }
    }
  },
}));

export default useCurrencyStore;
