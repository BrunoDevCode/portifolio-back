function formatPrice(price: any) {
  return String(
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price / 100)
  );
}

function deformatValue(price: any) {
  price = price.replace(/\D/g, '');
  return price / 100;
}

export { formatPrice, deformatValue };
