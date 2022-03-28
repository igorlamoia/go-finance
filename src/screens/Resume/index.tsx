import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths } from 'date-fns';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { DataListProps } from '../Dashboard';
import { categories } from '../../utils/categories';
import { HistoryCard } from '../../components/HistoryCard';
import { useTheme } from 'styled-components';
import {
	Container,
	Title,
	Header,
	Content,
	SelectDataMenu,
	PreviusMonth,
	DateText,
	NextMounth,
	ButtonTime,
	ContainerLoading,
	LoadingIndicator,
	NoTransactionLottie,
	ContainerNotFount,
	Message,
} from './styles';
import { fnsFormatMonthYear } from '../../utils/formatter';

const dataKey = '@gofinance:transactions';
export interface CategoryData {
	key: string;
	amount: number;
	percentage: number;
	percentageFormatted: string;
	name: string;
	icon: string;
	color: string;
}

const Resume: React.FC = () => {
	const [categoriesHistory, setCategoriesHistory] = useState([] as CategoryData[]);
	const [historyDate, setHistoryDate] = useState(new Date());
	const [isLoading, setIsLoading] = useState(true);
	const theme = useTheme();
	const tabBarHeight = useBottomTabBarHeight();

	const getCategoryHistory = async () => {
		setIsLoading(true);
		const data = await AsyncStorage.getItem(dataKey);
		const transactionsSaved: DataListProps[] = data ? JSON.parse(data) : ([] as DataListProps[]);
		const monthTransactionsSaved = transactionsSaved.filter(
			(transaction) =>
				transaction.type === 'negative' &&
				new Date(transaction.date).getMonth() === historyDate.getMonth() &&
				new Date(transaction.date).getFullYear() === historyDate.getFullYear()
		);

		const total = monthTransactionsSaved.reduce((acc, transaction) => {
			return (acc += Number(transaction.amount));
		}, 0);
		const categoryData = monthTransactionsSaved.reduce((acc, transaction) => {
			const categoryInfo = categories.find((item) => item.key === transaction.category)!;

			const actualCategory = acc.find((category: CategoryData) => category.key === transaction.category);
			const amount = Number(transaction.amount);

			if (!!actualCategory) {
				const newPercent = actualCategory.percentage + (amount * 100) / total;
				actualCategory.amount += amount;
				actualCategory.percentage = newPercent;
				actualCategory.percentageFormatted = newPercent.toFixed(0) + '%';
				return acc;
			}
			acc.push({
				key: transaction.category,
				amount: amount,
				percentage: (amount * 100) / total,
				percentageFormatted: ((amount * 100) / total).toFixed(0) + '%',
				color: categoryInfo.color,
				name: categoryInfo.name,
				icon: categoryInfo.icon,
			});
			return acc;
		}, [] as CategoryData[]);

		setCategoriesHistory(categoryData);
		setIsLoading(false);
	};

	useFocusEffect(
		useCallback(() => {
			getCategoryHistory();
		}, [historyDate])
	);

	const handleTimeHistory = (controllTime: 'prev' | 'next') => {
		if (controllTime === 'prev') return setHistoryDate((oldState) => subMonths(new Date(oldState), 1));
		setHistoryDate((oldState) => addMonths(new Date(oldState), 1));
	};

	return (
		<Container>
			<Header>
				<Title>Resumo por categoria</Title>
			</Header>
			{isLoading && (
				<ContainerLoading>
					<LoadingIndicator />
				</ContainerLoading>
			)}

			{!isLoading && (
				<Content
					contentContainerStyle={{
						paddingBottom: tabBarHeight,
						paddingHorizontal: 24,
						justifyContent: 'center',
						alignItems: 'center',
					}}
					showsVerticalScrollIndicator={false}
				>
					<SelectDataMenu>
						<ButtonTime onPress={() => handleTimeHistory('prev')}>
							<PreviusMonth />
						</ButtonTime>
						<DateText>{fnsFormatMonthYear(historyDate)}</DateText>
						<ButtonTime onPress={() => handleTimeHistory('next')}>
							<NextMounth />
						</ButtonTime>
					</SelectDataMenu>
					{categoriesHistory.length === 0 && (
						<ContainerNotFount>
							<NoTransactionLottie />
							<Message>Nenhuma transação feita nesta data</Message>
						</ContainerNotFount>
					)}
					<VictoryPie
						data={categoriesHistory}
						x="percentageFormatted"
						y="amount"
						colorScale={categoriesHistory.map(({ color }) => color)}
						style={{ labels: { fill: theme.colors.shape, fontSize: RFValue(18), fontWeight: 'bold' } }}
						labelRadius={100}
					/>
					{categoriesHistory.map((category) => (
						<HistoryCard key={category.key} category={category} />
					))}
				</Content>
			)}
		</Container>
	);
};

export { Resume };
