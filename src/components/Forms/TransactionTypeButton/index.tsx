import React from 'react';
import { Button, Container, Icon, Title } from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';

interface Props extends RectButtonProps {
	title: string;
	type: 'positive' | 'negative';
	isActive: boolean;
}

const icons = {
	positive: 'arrow-up-circle',
	negative: 'arrow-down-circle',
};

const TransactionTypeButton = ({ title, type, isActive, ...rest }: Props) => {
	return (
		<Container isActive={isActive} type={type}>
			<Button {...rest}>
				<Icon name={icons[type]} type={type} />
				<Title>{title}</Title>
			</Button>
		</Container>
	);
};

export default TransactionTypeButton;
