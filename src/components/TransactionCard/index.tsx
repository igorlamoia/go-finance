import React from 'react';
import { Title, Container, Amount, Footer, Icon, CategoryName, Date, Category } from './styles';

interface Category {
	name: string;
	icon: string;
}

export interface TransactionCardProps {
	type: 'positive' | 'negative';
	title: string;
	amount: string;
	date: string;
	category: Category;
}

interface Props {
	data: TransactionCardProps;
}

const TransactionCard: React.FC<Props> = ({ data }) => {
	return (
		<Container>
			<Title>{data.title}</Title>
			<Amount type={data.type}>
				{data.type === 'negative' && '- '}
				{data.amount}
			</Amount>
			<Footer>
				<Category>
					<Icon name={data.category.icon} />
					<CategoryName>{data.category.name}</CategoryName>
				</Category>
				<Date>{data.date}</Date>
			</Footer>
		</Container>
	);
};

export { TransactionCard };
