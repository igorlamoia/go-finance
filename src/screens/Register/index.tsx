import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton';
import { Container, Title, Header, Form, Fields, TransactionsTypes } from './styles';

import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Forms/InputForm';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

const Register = () => {
	const [transactionType, setTransactionType] = useState('');
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [category, setCategory] = useState({ key: 'category', name: 'Categoria' });

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	const handleRegister = (form: FormData) => {
		if (!transactionType) return Alert.alert('Selecione o tipo da transação');

		if (category.key === 'category') return Alert.alert('Selecione a categoria');

		const data = {
			name: form.name,
			amount: form.amount,
			transactionType,
			category: category.key,
		};
		console.log(data);
	};

	const hanldeTransactionTypeSelect = (type: 'up' | 'down') => {
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
							placeholder='Nome'
							name='name'
							autoCapitalize={'sentences'}
							autoCorrect={false}
							error={errors.name && errors.name.message}
						/>
						<InputForm
							control={control}
							placeholder='Preço'
							name='amount'
							keyboardType={'numeric'}
							error={errors.amount && errors.amount.message}
						/>

						<TransactionsTypes>
							<TransactionTypeButton
								isActive={transactionType === 'up'}
								title='Income'
								type='up'
								onPress={() => hanldeTransactionTypeSelect('up')}
							/>
							<TransactionTypeButton
								isActive={transactionType === 'down'}
								title='Outcome'
								type='down'
								onPress={() => hanldeTransactionTypeSelect('down')}
							/>
						</TransactionsTypes>
						<CategorySelectButton title={category.name} onPress={handleOpenSelectCategory} />
					</Fields>
					<Button title='Enviar' onPress={handleSubmit(handleRegister)} />
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
