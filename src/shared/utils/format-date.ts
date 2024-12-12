const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const adjustedDate = new Date(date);
  adjustedDate.setHours(adjustedDate.getHours() + 4); // Добавляем 4 часа

  return adjustedDate.toLocaleString("ru-RU", options);
};

export default formatDate;
