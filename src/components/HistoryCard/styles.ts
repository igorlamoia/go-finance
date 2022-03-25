import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

type ContainerProps = {
	color: string;
};

export const Container = styled.View<ContainerProps>`
	width: 900px;
	max-width: 100%;
	padding: 16px;
	border-left-width: 8px;
	border-left-color: ${({ color }) => color};
	justify-content: space-between;
	flex-direction: row;
	border-radius: 5px;
	background-color: ${({ theme }) => theme.colors.shape};
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
