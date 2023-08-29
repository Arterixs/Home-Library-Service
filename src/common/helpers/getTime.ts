export const getTime = () => {
  const date = new Date();
  const getYear = date.getFullYear();
  const getMonth = date.getMonth();
  const getDay = date.getDate();
  const getHours = date.getHours();
  const getMinutes = date.getMinutes();
  const getSeconds = date.getSeconds();
  const hours = getHours < 10 ? `0${getHours}` : `${getHours}`;
  const minutes = getMinutes < 10 ? `0${getMinutes}` : `${getMinutes}`;
  const seconds = getSeconds < 10 ? `0${getSeconds}` : `${getSeconds}`;
  return `[${getDay}/${getMonth}/${getYear}, ${hours}:${minutes}:${seconds}]`;
};
