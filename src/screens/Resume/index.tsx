import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { DataListProps } from '../Dashboard';
import { Container, Title, Header, Content } from './styles';
import { categories } from '../../utils/categories';
import { HistoryCard } from '../../components/HistoryCard';

const dataKey = '@gofinance:transactions';

interface CategoryData {
	key: string;
	amount: number;
}

const Resume: React.FC = () => {
	const [categoriesHistory, setCategoriesHistory] = useState([] as CategoryData[]);

	const getCategoryHistory = async () => {
		const data = await AsyncStorage.getItem(dataKey);
		const transactionsSaved: DataListProps[] = data ? JSON.parse(data) : ([] as DataListProps[]);

		const categoryData = transactionsSaved.reduce((acc, transaction) => {
			const actualCategory = acc.find((category: CategoryData) => category.key === transaction.category);
			if (!!actualCategory) {
				actualCategory.key = transaction.category;
				actualCategory.amount += Number(transaction.amount);
				return acc;
			}
			acc.push({ key: transaction.category, amount: Number(transaction.amount) });
			return acc;
		}, [] as CategoryData[]);
		setCategoriesHistory(categoryData);
	};

	useFocusEffect(
		useCallback(() => {
			getCategoryHistory();
		}, [])
	);

	return (
		<Container>
			<Header>
				<Title>Resumo</Title>
			</Header>
			<Content>
				{categoriesHistory.map((category) => (
					<HistoryCard
						key={category.key}
						category={categories.find((item) => item.key === category.key)!}
						amount={category.amount}
					/>
				))}
			</Content>
		</Container>
	);
};

export { Resume };
