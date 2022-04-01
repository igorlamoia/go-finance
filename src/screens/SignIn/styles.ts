import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(25)}px;
	color: ${({ theme }) => theme.colors.shape};
	text-align: center;
`;

export const Description = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(16)}px;
	color: ${({ theme }) => theme.colors.shape};
`;

export const Header = styled.View`
	padding: ${RFValue(50)}px 30px;
	height: 70%;
	width: 100%;
	justify-content: space-around;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.primary};
`;
export const Footer = styled.View`
	height: 30%;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.secondary};
	align-items: center;
	padding: 0 ${RFValue(32)}px;
`;

export const ButtonWrapper = styled.View`
	margin-top: -${RFValue(35)}px;
	width: 100%;
`;
