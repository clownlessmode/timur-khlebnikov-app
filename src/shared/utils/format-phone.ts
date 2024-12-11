const formatPhone = (phone: string): string => {
  if (!phone) return "Hе добавлен";
  const cleanedPhone = phone.replace(/\D/g, "");
  if (cleanedPhone.startsWith("7") && cleanedPhone.length === 11) {
    return cleanedPhone.replace(
      /(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/,
      "$1 ($2) $3 $4-$5"
    );
  }
  return cleanedPhone;
};

export default formatPhone;
