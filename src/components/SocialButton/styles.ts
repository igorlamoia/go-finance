import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	align-items: center;
`;

export const ButtonContainer = styled(RectButton)`
	flex-direction: row;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.shape};
	height: ${RFValue(56)}px;
	justify-content: space-between;
	margin-bottom: 16px;
	border-radius: 5px;
`;

export const Title = styled.Text`
	flex: 1;
	text-align: center;

	font-family: ${({ theme }) => theme.fonts.medium};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.title};
`;

export const ImageContainer = styled.View`
	height: 100%;
	padding: ${RFValue(16)}px;
	border-right-color: ${({ theme }) => theme.colors.background};
	border-right-width: 1px;
	justify-content: center;
`;
