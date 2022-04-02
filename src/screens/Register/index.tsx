import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../hooks/auth';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Forms/InputForm';

import { Container, Title, Header, Form, Fields, TransactionsTypes } from './styles';

interface FormData {
	name: string;
	amount: string;
}

const schema = Yup.object().shape({
	name: Yup.string().required('Nome é obrigatório'),
	amount: Yup.number()
		.typeError('Informe um valor numérico')
		.positive('O valor não pode ser negativo')
		.required('O valor é obrigatório'),
});

const Register: React.FC = () => {
	const [transactionType, setTransactionType] = useState('');
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [category, setCategory] = useState({ key: 'category', name: 'Categoria' });

	const navigation = useNavigation();

	const { user } = useAuth();
	const dataKey = `@gofinance:transactions_user:${user.id}`;

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const handleRegister = async (form: FormData) => {
		if (!transactionType) return Alert.alert('Selecione o tipo da transação');

		if (category.key === 'category') return Alert.alert('Selecione a categoria');

		const newTransaction = {
			id: String(uuid.v4()),
			type: transactionType,
			name: form.name,
			amount: form.amount,
			category: category.key,
			date: new Date(),
		};

		const previousDataString = await AsyncStorage.getItem(dataKey);
		const previousDataJson = previousDataString ? JSON.parse(previousDataString) : [];
		const updatedData = [...previousDataJson, newTransaction];

		await AsyncStorage.setItem(dataKey, JSON.stringify(updatedData));

		reset();
		setCategory({ key: 'category', name: 'Categoria' });
		setTransactionType('');

		navigation.navigate('Listagem');
	};

	const hanldeTransactionTypeSelect = (type: 'positive' | 'negative') => {
		setTransactionType(type);
	};

	const handleCloseSelectCategory = () => {
		setCategoryModalOpen(false);
	};
	const handleOpenSelectCategory = () => {
		setCategoryModalOpen(true);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<Header>
					<Title>Cadastro</Title>
				</Header>
				<Form>
					<Fields>
						<InputForm
							control={control}
							placeholder="Nome"
							name="name"
							autoCapitalize={'sentences'}
							autoCorrect={false}
							error={errors.name && errors.name.message}
						/>
						<InputForm
							control={control}
							placeholder="Preço"
							name="amount"
							keyboardType={'numeric'}
							error={errors.amount && errors.amount.message}
						/>

						<TransactionsTypes>
							<TransactionTypeButton
								isActive={transactionType === 'positive'}
								title="Income"
								type="positive"
								onPress={() => hanldeTransactionTypeSelect('positive')}
							/>
							<TransactionTypeButton
								isActive={transactionType === 'negative'}
								title="Outcome"
								type="negative"
								onPress={() => hanldeTransactionTypeSelect('negative')}
							/>
						</TransactionsTypes>
						<CategorySelectButton title={category.name} onPress={handleOpenSelectCategory} />
					</Fields>
					<Button title="Enviar" onPress={handleSubmit(handleRegister)} />
				</Form>

				<Modal visible={categoryModalOpen}>
					<CategorySelect
						category={category}
						setCategory={setCategory}
						closeSelectCategory={handleCloseSelectCategory}
					/>
				</Modal>
			</Container>
		</TouchableWithoutFeedback>
	);
};

export { Register };
