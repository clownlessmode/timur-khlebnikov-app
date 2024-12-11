const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleString("ru-RU", options);
};

export default formatDate;
