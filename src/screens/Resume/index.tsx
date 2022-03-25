import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { DataListProps } from '../Dashboard';
import { Container, Title, Header, CategoryWrapper, CaregoryList, Separator, Content } from './styles';
import { categories } from '../../utils/categories';
import { HistoryCard } from '../../components/HistoryCard';

const dataKey = '@gofinance:transactions';

interface CaregoryData {
	key: string;
	amount: number;
}

const Resume: React.FC = () => {
	const [categoriesHistory, setCategoriesHistory] = useState([] as CaregoryData[]);
	useFocusEffect(() => {
		(async () => {
			const data = await AsyncStorage.getItem(dataKey);
			const transactionsSaved: DataListProps[] = data ? JSON.parse(data) : ([] as DataListProps[]);

			const categoryData = transactionsSaved.reduce((acc, transaction) => {
				const newAcc = [...acc];
				const actualCategory = newAcc.find((category: CaregoryData) => category.key === transaction.category);
				if (!!actualCategory) {
					actualCategory.key = transaction.category;
					actualCategory.amount += Number(transaction.amount);
					return newAcc;
				}
				newAcc.push({ key: transaction.category, amount: Number(transaction.amount) });
				return newAcc;
			}, [] as CaregoryData[]);
			setCategoriesHistory(categoryData);
		})();
	});

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
