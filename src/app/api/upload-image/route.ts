import {
  SupabaseStorage,
  SupabaseStorageType,
} from '@/data/constants/supabase';
import { storageKeys } from '@/data/constants/supabase/Storage';
import { supabase } from '@/libs/supabase/supabase';
import { withAuthHandler } from '@/middlewares/withAuthHandler';
import { NextResponse } from 'next/server';

export const POST = withAuthHandler(async ({ request, sessionCtx }) => {
  try {
    const formData = await request.formData();
    const storageName = formData.get('storageName');
    const file = formData.get('file');

    if (
      typeof storageName !== 'string' ||
      !storageKeys.includes(storageName as SupabaseStorageType)
    ) {
      return NextResponse.json(
        { error: 'Invalid storageName supplied' },
        { status: 400 }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const storage = SupabaseStorage[storageName as SupabaseStorageType];
    const extension = file.name?.split('.').pop();
    const filePath = `${sessionCtx.userId}/${crypto.randomUUID()}${
      extension ? `.${extension}` : ''
    }`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(storage)
      .upload(filePath, file, {
        cacheControl: '3600', // seconds
        contentType: file.type || undefined,
        upsert: false,
      });

    if (uploadError || !uploadData) {
      console.error('Supabase upload failed', uploadError);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from(storage)
      .getPublicUrl(uploadData.path);

    return NextResponse.json(
      {
        storage,
        path: uploadData.path,
        publicUrl: publicUrlData.publicUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading image:', error);

    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
});
