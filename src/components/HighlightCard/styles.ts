import styled, { css } from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface TypeProps {
	type: 'up' | 'down' | 'total';
}

export const Container = styled.View<TypeProps>`
	background-color: ${({ theme, type }) => (type !== 'total' ? theme.colors.shape : theme.colors.secondary)};
	width: ${RFValue(300)}px;
	border-radius: ${RFValue(5)}px;
	padding: 15px 23px;
	padding-bottom: ${RFValue(25)}px;
	margin-right: ${RFValue(16)}px;
`;
export const Header = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
export const Title = styled.Text<TypeProps>`
	font-size: ${RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme, type }) => (type !== 'total' ? theme.colors.text_dark : theme.colors.shape)};
`;
export const Icon = styled(Feather)<TypeProps>`
	font-size: ${RFValue(40)}px;

	${({ type }) =>
		type === 'up' &&
		css`
			color: ${({ theme }) => theme.colors.success};
		`};
	${({ type }) =>
		type === 'down' &&
		css`
			color: ${({ theme }) => theme.colors.attention};
		`};
	${({ type }) =>
		type === 'total' &&
		css`
			color: ${({ theme }) => theme.colors.shape};
		`};
`;
export const Footer = styled.View``;
export const Amount = styled.Text<TypeProps>`
	font-size: ${RFValue(32)}px;
	font-family: ${({ theme }) => theme.fonts.medium};

	color: ${({ theme, type }) => (type !== 'total' ? theme.colors.text_dark : theme.colors.shape)};
	margin-top: 5px;
`;
export const LastTransaction = styled.Text<TypeProps>`
	font-size: ${RFValue(12)}px;
	color: ${({ theme, type }) => (type !== 'total' ? theme.colors.title : theme.colors.shape)};
`;
