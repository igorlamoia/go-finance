import React from 'react';
import { numberFormat } from '../../utils/formatter';
import { Container, Title, Amount } from './styles';

interface HistoryCardProps {
	amount: number;
	category: { key: string; name: string; icon: string; color: string };
}

const HistoryCard: React.FC<HistoryCardProps> = ({ category, amount }) => {
	return (
		<Container color={category.color}>
			<Title>{category.name}</Title>
			<Amount>{numberFormat(amount)}</Amount>
		</Container>
	);
};

export { HistoryCard };
