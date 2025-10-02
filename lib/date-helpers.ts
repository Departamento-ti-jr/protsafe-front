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


export function formatDateTimeToDDMMYYYYHHMMSS(date: Date | string | null | undefined): string {
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

    const hours = String(parsedDate.getHours()).padStart(2, "0");
    const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
    const seconds = String(parsedDate.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  } catch {
    return "";
  }
}
