import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import noTransactions from '../../assets/noTransactions.json';
import { BorderlessButton } from 'react-native-gesture-handler';

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

export const Content = styled.ScrollView``;
export const SelectDataMenu = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-top: 20px;
`;

export const ButtonTime = styled(BorderlessButton)``;

export const PreviusMonth = styled(Feather).attrs({
	name: 'chevron-left',
})`
	font-size: ${RFValue(24)}px;
	color: ${({ theme }) => theme.colors.title};
`;
export const DateText = styled.Text`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.title};
`;
export const NextMounth = styled(Feather).attrs({
	name: 'chevron-right',
})`
	font-size: ${RFValue(24)}px;
	color: ${({ theme }) => theme.colors.title};
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs(({ theme: { colors } }) => ({
	size: 'large',
	color: colors.primary,
}))``;

export const ContainerLoading = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export const NoTransactionLottie = styled(LottieView).attrs({
	autoPlay: true,
	loop: true,
	source: noTransactions,
})`
	height: ${RFValue(200)}px;
	width: ${RFValue(200)}px;
`;
export const ContainerNotFount = styled.View`
	justify-content: center;
	align-items: center;
	padding: 0 30px;
	flex: 1;
	margin-top: 100px;
`;

export const Message = styled(DateText)`
	text-align: center;
	margin-top: 10px;
`;
