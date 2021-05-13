export const formatDate = (date: Date, format?: string) => {
  const formatDate = new Date(date);
  const dd = String(formatDate.getDate()).padStart(2, "0");
  const mm = String(formatDate.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = formatDate.getFullYear();

  const fullDateOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  };

  const todayString = `${dd}-${mm}-${yyyy}`;
  switch (format) {
    case "full":
      return formatDate.toLocaleDateString("en-US", fullDateOptions);
    case "server":
      return `${yyyy}-${mm}-${dd}`;
    default:
      return todayString;
  }
};
