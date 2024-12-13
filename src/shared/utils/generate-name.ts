interface UserNameOptions {
  first_name?: string;
  last_name?: string;
  username?: string;
  id: string;
  name: string | null;
}

function generateName({
  first_name,
  last_name,
  username,
  id,
  name,
}: UserNameOptions): string {
  if (name) return name;

  // Если есть first_name, то проверяем есть ли last_name
  if (first_name) {
    return last_name ? `${first_name} ${last_name}` : first_name;
  }

  // Если first_name нет, то проверяем username или возвращаем ID
  return username || `ID: ${id}`;
}

export default generateName;
