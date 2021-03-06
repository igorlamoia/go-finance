import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	background-color: ${({ theme }) => theme.colors.background};
	flex: 1;
`;
export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	background-color: ${({ theme }) => theme.colors.primary};
	font-size: ${RFValue(18)}px;
	color: ${({ theme }) => theme.colors.shape};
`;
export const Header = styled.View`
	background-color: ${({ theme }) => theme.colors.primary};
	height: ${RFValue(113)}px;
	width: 100%;

	align-items: center;
	justify-content: flex-end;
	padding-bottom: 19px;
`;

export const Form = styled.View`
	flex: 1;
	width: 100%;
	padding: 24px;
	justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransactionsTypes = styled.View`
	flex-direction: row;
	justify-content: space-between;

	margin-top: 8px;
	margin-bottom: 16px;
`;
