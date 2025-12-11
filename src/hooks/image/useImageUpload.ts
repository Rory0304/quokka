import { QueryKey } from '@/data/constants/querykey/QueryKey';
import { SupabaseStorageType } from '@/data/constants/supabase';
import { useMutation } from '@tanstack/react-query';

interface useImageUploadResponse {
  storage: string;
  path: string;
  publicUrl: string;
}

export const useImageUpload = () => {
  return useMutation<
    useImageUploadResponse,
    Error,
    { storage: SupabaseStorageType; file: File }
  >({
    mutationKey: [QueryKey.image.upload_image],
    mutationFn: async ({ storage, file }) => {
      const formData = new FormData();
      formData.append('storageName', storage);
      formData.append('file', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      return response.json();
    },
  });
};
