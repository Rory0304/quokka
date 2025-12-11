export const canvasToBlob = (
  canvas: HTMLCanvasElement,
  type = 'image/png'
): Promise<Blob> =>
  new Promise<Blob>((resolve, reject) => {
    return canvas.toBlob(blob => {
      if (!blob) {
        reject(new Error('Failed to convert canvas to blob'));
        return;
      }

      resolve(blob);
    }, type);
  });
