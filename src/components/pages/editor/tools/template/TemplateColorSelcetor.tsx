import { FC, useState } from 'react';

import { GradientColorPicker } from '@/components/blocks/colorPicker/GradientColorPicker';
import { useEditor } from '@/hooks/editor/useEditor';

export const TemplateColorSelcetor: FC = () => {
  const { editorTemplate, dispatch } = useEditor();

  const [open, setOpen] = useState(false);

  const handleTemplateColorChange = (color: string) => {
    dispatch({
      type: 'UPDATE_TEMPLATE',
      payload: {
        template: {
          color: color,
        },
      },
    });
  };

  return (
    <div>
      <button type="button" onClick={() => setOpen(current => !current)}>
        <div
          className="w-6 h-6 rounded-md"
          style={{
            backgroundColor: editorTemplate?.color,
          }}
        />
      </button>
      <GradientColorPicker
        open={open}
        value={editorTemplate?.color}
        onChange={handleTemplateColorChange}
      />
    </div>
  );
};
