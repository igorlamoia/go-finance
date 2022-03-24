import React from 'react';
import { categories } from '../../utils/categories';
import { Title, Container, Amount, Footer, Icon, CategoryName, Date, Category } from './styles';

export interface TransactionCardProps {
	type: 'positive' | 'negative';
	name: string;
	amount: string;
	date: string;
	category: string;
}

interface Props {
	data: TransactionCardProps;
}

const TransactionCard: React.FC<Props> = ({ data }) => {
	const [category] = categories.filter((item) => item.key === data.category);

	return (
		<Container>
			<Title>{data.name}</Title>
			<Amount type={data.type}>
				{data.type === 'negative' && '- '}
				{data.amount}
			</Amount>
			<Footer>
				<Category>
					<Icon name={category.icon} />
					<CategoryName>{category.name}</CategoryName>
				</Category>
				<Date>{data.date}</Date>
			</Footer>
		</Container>
	);
};

export { TransactionCard };
