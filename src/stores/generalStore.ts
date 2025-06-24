import { create } from 'zustand';

type Stores = {
	form: 'login' | 'signup' | 'forgotPassword';

	setForm: (form: 'login' | 'signup' | 'forgotPassword') => void;
};

const useGeneralStore = create<Stores>((set) => ({
	form: 'login',
	setForm(form) {
		set({ form });
	},
}));

export default useGeneralStore;
