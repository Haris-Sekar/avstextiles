export function formatMoney(input) {
  input = input.toString();
  input = input.replace(/\D/g, "");
  return input.split(".")[0].length > 3
    ? input
        .toString()
        .substring(0, input.toString().split(".")[0].length - 3)
        .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
        "," +
        input.toString().substring(input.toString().split(".")[0].length - 3)
    : input.toString();
}
