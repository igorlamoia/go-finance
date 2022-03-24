import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { dateFormat, dateStringFormat, numberFormat } from '../../utils/formatter';
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
	LogoutButton,
	LoadingIndicator,
	ContainerLoading,
} from './styles';

export interface DataListProps extends TransactionCardProps {
	id: string;
}

const dataKey = '@gofinance:transactions';

export const Dashboard: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [transactionsList, setTransactionsList] = useState<DataListProps[]>([]);
	const [account, setAccount] = useState({
		total: 0,
		lastTransaction: 0,
		income: { total: 0, lastTransaction: 0 },
		outcome: { total: 0, lastTransaction: 0 },
	});

	const getSavedTransactions = async () => {
		// await AsyncStorage.removeItem(dataKey);
		const data = await AsyncStorage.getItem(dataKey);
		const transactionsSaved: DataListProps[] = data ? JSON.parse(data) : ([] as DataListProps[]);

		const updatedAccount = transactionsSaved.reduce(
			(acc, transaction) => {
				const transactionDate = new Date(transaction.date).getTime();
				if (acc.lastTransaction < transactionDate) acc.lastTransaction = transactionDate;

				if (transaction.type === 'positive') {
					if (acc.income.lastTransaction < transactionDate) acc.income.lastTransaction = transactionDate;

					acc.income.total += Number(transaction.amount);
					acc.total += Number(transaction.amount);

					return acc;
				}
				if (acc.income.lastTransaction < transactionDate) acc.outcome.lastTransaction = transactionDate;
				acc.outcome.total += Number(transaction.amount);
				acc.total -= Number(transaction.amount);
				return acc;
			},
			{
				total: 0,
				lastTransaction: 0,
				income: { total: 0, lastTransaction: 0 },
				outcome: { total: 0, lastTransaction: 0 },
			}
		);
		setAccount(updatedAccount);

		const formattedTransactions = transactionsSaved.map((transaction: DataListProps) => ({
			...transaction,
			date: dateFormat(new Date(transaction.date)),
			amount: numberFormat(Number(transaction.amount)),
		}));

		setTransactionsList(formattedTransactions);
		setLoading(true);
	};

	useFocusEffect(
		useCallback(() => {
			getSavedTransactions();
		}, [])
	);

	return (
		<Container>
			{!loading ? (
				<ContainerLoading>
					<LoadingIndicator />
				</ContainerLoading>
			) : (
				<>
					<Header>
						<UserWrapper>
							<UserInfo>
								<Photo source={{ uri: 'https://avatars.githubusercontent.com/u/62469164?v=4' }} />
								<User>
									<UserGreeting>Olá,</UserGreeting>
									<UserName>Lamoia</UserName>
								</User>
							</UserInfo>
							<LogoutButton onPress={() => {}}>
								<Icon name="power" />
							</LogoutButton>
						</UserWrapper>
					</Header>
					<HighlightCards>
						<HighlightCard
							type="up"
							title="Entradas"
							amount={numberFormat(account.income.total)}
							lastTransaction={'Última entrada dia ' + dateStringFormat(account.income.lastTransaction)}
						/>
						<HighlightCard
							type="down"
							title="Saídas"
							amount={numberFormat(account.outcome.total)}
							lastTransaction={'Última saída dia ' + dateStringFormat(account.outcome.lastTransaction)}
						/>
						<HighlightCard
							type="total"
							title="Total"
							amount={numberFormat(account.total)}
							lastTransaction={'Última transação dia ' + dateStringFormat(account.lastTransaction)}
						/>
					</HighlightCards>

					<Transactions>
						<Title>Listagem</Title>

						<TransactionList
							data={transactionsList}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => <TransactionCard data={item} />}
						/>
					</Transactions>
				</>
			)}
		</Container>
	);
};
