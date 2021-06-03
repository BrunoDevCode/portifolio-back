function formatPrice(price: any): string {
  return String(
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price / 100)
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function deformatValue(price: any): number {
  // eslint-disable-next-line no-param-reassign
  price = price.replace(/\D/g, '');
  return price / 100;
}

export { formatPrice, deformatValue };
