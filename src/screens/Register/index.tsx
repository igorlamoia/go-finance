import React, { useState } from 'react';
import Button from '../../components/Forms/Button';
import { Input } from '../../components/Forms/Input';
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton';
import { Container, Title, Header, Form, Fields, TransactionsTypes } from './styles';

const Register = () => {
	const [transactionType, setTransactionType] = useState('');

	const hanldeTransactionTypeSelect = (type: 'up' | 'down') => {
		setTransactionType(type);
	};

	return (
		<Container>
			<Header>
				<Title>Cadastro</Title>
			</Header>
			<Form>
				<Fields>
					<Input placeholder='Nome' />
					<Input placeholder='Preço' />
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
				</Fields>
				<Button title='Enviar' />
			</Form>
		</Container>
	);
};

export { Register };
