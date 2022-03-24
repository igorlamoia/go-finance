export const { format: numberFormat } = Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
});

export const { format: dateFormat } = Intl.DateTimeFormat('pt-BR', {
	day: '2-digit',
	month: '2-digit',
	year: '2-digit',
});

export const { format: dateStringFormat } = Intl.DateTimeFormat('pt-BR', {
	day: '2-digit',
	month: 'long',
});
