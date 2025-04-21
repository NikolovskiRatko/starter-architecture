export const createFile = (type: string): File => {
  let file: File = {};
  if (document.documentMode || /Edge/.test(navigator.userAgent)) {
    file = new Blob([], { type: type });
  } else {
    file = new File([], '');
  }
  return file;
};
