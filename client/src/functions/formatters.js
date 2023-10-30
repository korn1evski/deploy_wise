function transformDateFormat(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month starts from 0 in JS
    const year = date.getUTCFullYear();
  
    return `${month}/${day}/${year}`;
  }

export { transformDateFormat };