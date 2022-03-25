import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

type ContainerProps = {
	color: string;
};

export const Container = styled.View<ContainerProps>`
	flex-direction: row;
	justify-content: space-between;
	width: 100%;

	padding: 16px;
	border-left-width: 8px;
	border-left-color: ${({ color }) => color};
	border-radius: 5px;

	background-color: ${({ theme }) => theme.colors.shape};
	margin-bottom: 8px;
`;

export const Title = styled.Text`
	color: ${({ theme: { colors } }) => colors.title};
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(15)}px;
`;
export const Amount = styled.Text`
	font-size: ${RFValue(15)}px;
	font-family: ${({ theme }) => theme.fonts.bold};
	color: ${({ theme: { colors } }) => colors.title};
`;
