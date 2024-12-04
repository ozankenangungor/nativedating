import { makeVar } from '@apollo/client';

export interface Profile {
  id: string;
  email: string;
  name: string;
  accessToken: string;
}

const defaultProfile: Profile | null = null;

// ReactiveVar oluşturma
export const profileVar = makeVar<Profile | null>(defaultProfile);
export const pendingVar = makeVar(false); // Yüklenme durumu için ReactiveVar
export const errorVar = makeVar<boolean | undefined>(undefined); // Hata durumu için ReactiveVar

// Profil ve pending durumunu güncellemek için yardımcı fonksiyonlar
export const updateProfile = (profile: Profile | null) => {
  profileVar(profile);
};

export const setPending = (pending: boolean) => {
  pendingVar(pending);
};

export const setError = (error: boolean | undefined) => {
  errorVar(error);
};

// Auth state güncelleme fonksiyonu
export const updateAuthState = (newState: { profile: Profile | null; pending: boolean }) => {
  profileVar(newState.profile);
  pendingVar(newState.pending);
};


