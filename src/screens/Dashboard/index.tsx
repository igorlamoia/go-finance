import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import {
	Container,
	Header,
	UserInfo,
	Photo,
	User,
	UserGreeting,
	UserName,
	UserWrapper,
	Icon,
	HighlightCards,
	Transactions,
	Title,
	TransactionList,
} from './styles';

export interface DataListProps extends TransactionCardProps {
	id: string;
}

export const Dashboard: React.FC = () => {
	const data: DataListProps[] = [
		{
			id: '1',
			type: 'positive',
			title: 'Desenvolvimento de site',
			amount: 'R$ 12.000,00',
			category: {
				name: 'vendas',
				icon: 'dollar-sign',
			},
			date: '14/04/2020',
		},
		{
			id: '2',
			type: 'negative',
			title: 'Aluguel apartamento',
			amount: 'R$ 1.200,00',
			category: {
				name: 'Casa',
				icon: 'shopping-bag',
			},
			date: '10/04/2020',
		},
		{
			id: '3',
			type: 'negative',
			title: 'Hamburgueria BenBurguer',
			amount: 'R$ 79,90',
			category: {
				name: 'Alimentação',
				icon: 'coffee',
			},
			date: '14/04/2020',
		},
	];
	return (
		<Container>
			<Header>
				<UserWrapper>
					<UserInfo>
						<Photo source={{ uri: 'https://avatars.githubusercontent.com/u/62469164?v=4' }} />
						<User>
							<UserGreeting>Olá,</UserGreeting>
							<UserName>Lamoia</UserName>
						</User>
					</UserInfo>
					<Icon name='power' />
				</UserWrapper>
			</Header>
			<HighlightCards>
				<HighlightCard
					type='up'
					title='Entradas'
					amount='R$ 17.400,00'
					lastTransaction='Última entrada dia 13 de abril'
				/>
				<HighlightCard
					type='down'
					title='Saídas'
					amount='R$ 1.259,00'
					lastTransaction='Última entrada dia 03 de abril'
				/>
				<HighlightCard type='total' title='Total' amount='R$ 16.141,00' lastTransaction='01 à 16 de abril' />
			</HighlightCards>

			<Transactions>
				<Title>Listagem</Title>

				<TransactionList
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <TransactionCard data={item} />}
				/>
			</Transactions>
		</Container>
	);
};
