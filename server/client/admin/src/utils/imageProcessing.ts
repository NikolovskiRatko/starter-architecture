function getExtension(mimetype: string): string {
  let extension = mimetype.split('/')[1];
  if ((extension === 'jpeg') || (extension === 'x-canon-cr2')) {
    extension = 'jpg';
  }
  if (extension === 'x-ms-bmp') {
    extension = 'bmp';
  }
  return extension;
}

export const getPhotoPath = (photoObj, size = 600, checkGif = true): string => {
  const { id, name, mime_type: mimeType } = photoObj;
  const fileExt = getExtension(mimeType);
  const fileName = name.replace(/ /g,"-");
  if (fileExt == 'gif' && checkGif) {
    return `storage/${id}/${fileName}.${fileExt}`;
  } else {
    return `storage/${id}/conversions/${fileName}-${size}.${fileExt}`;
  }
};
