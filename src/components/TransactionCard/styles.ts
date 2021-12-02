import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
	background-color: ${({ theme }) => theme.colors.shape};
	padding: ${RFValue(17)}px ${RFValue(24)}px;
`;

export const Title = styled.Text`
	color: ${({ theme }) => theme.colors.title};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;

	margin-bottom: 16px;
`;

export const Amount = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(20)}px;
	margin-top: 2px;
`;
export const Footer = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	margin-top: 19px;
`;
export const Icon = styled(Feather)`
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.text};
`;
export const Date = styled.Text`
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.text};
`;

export const Category = styled.View`
	flex-direction: row;
	align-items: center;
`;
export const CategoryName = styled.Text`
	color: ${({ theme }) => theme.colors.text};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;

	margin-left: 17px;
`;
