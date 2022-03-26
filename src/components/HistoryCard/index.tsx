import React from 'react';
import { CategoryData } from '../../screens/Resume';
import { numberFormat } from '../../utils/formatter';
import { Container, Title, Amount } from './styles';

interface HistoryCardProps {
	category: CategoryData;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ category: { color, name, amount } }: HistoryCardProps) => {
	return (
		<Container color={color}>
			<Title>{name}</Title>
			<Amount>{numberFormat(amount)}</Amount>
		</Container>
	);
};

export { HistoryCard };
