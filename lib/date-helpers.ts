export function formatDateToDDMMYYYY(date: Date | string | null | undefined): string {
  try {
    if (!date) return "";

    const parsedDate = date instanceof Date ? date : new Date(date);

    // Verifica se a data é inválida
    if (isNaN(parsedDate.getTime())) {
      return "";
    }

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();

    return `${day}/${month}/${year}`;
  } catch {
    return "";
  }
}
