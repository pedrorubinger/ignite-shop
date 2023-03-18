export const convertCurrencyStringToNumber = (
  currencyString: string
): number => {
  const parsedCurrencyString = currencyString.replace(/[^\d,-]/g, ""); // Remove all characters except digits, commas, and hyphens
  const parsedCurrencyNumber = parseFloat(
    parsedCurrencyString.replace(",", ".")
  ); // Replace comma with period and parse as a float
  return parsedCurrencyNumber;
};

export const formatCurrency = (value: number, useStyles?: boolean) => {
  return new Intl.NumberFormat("pt-BR", {
    style: useStyles ? "currency" : undefined,
    currency: useStyles ? "BRL" : undefined,
    minimumFractionDigits: 2,
  }).format(value);
};
