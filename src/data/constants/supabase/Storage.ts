export const SupabaseStorage = {
  CardThumbnail: "card_thumbnail",
} as const;

export type SupabaseStorageType = keyof typeof SupabaseStorage;

export const storageKeys = Object.keys(SupabaseStorage);
