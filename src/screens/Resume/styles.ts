import { FlatList } from 'react-native-gesture-handler';
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

export const Content = styled.ScrollView.attrs({
	contentContainerStyle: {
		paddingHorizontal: 24,
		paddingVertical: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
})``;
