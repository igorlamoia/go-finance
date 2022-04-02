import React, { useState } from 'react';
import LogoSvg from '../../assets/svg/logo.svg';
import AppleSvg from '../../assets/svg/apple.svg';
import GoogleSvg from '../../assets/svg/google.svg';

import { Container, Header, Footer, Title, Description, ButtonWrapper } from './styles';
import { SocialButton } from '../../components/SocialButton';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { useTheme } from 'styled-components/native';

const SignIn: React.FC = () => {
	const { signInWithGoogle, signInWithApple } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const theme = useTheme();

	const handleSignInWithGoogle = async () => {
		try {
			setIsLoading(true);
			await signInWithGoogle();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível conectar com a conta Google');
		}
	};
	const handleSignInWithApple = async () => {
		try {
			setIsLoading(true);
			await signInWithApple();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível conectar com a conta Apple');
		}
	};

	return (
		<Container>
			<Header>
				<LogoSvg height="68" width="120" />
				<Title>
					Controle suas {'\n'}
					finanças de forma{'\n'}
					muito simples
				</Title>
				<Description>
					Faça seu login com{'\n'}
					uma das contas abaixo
				</Description>
			</Header>
			<Footer>
				<ButtonWrapper>
					<SocialButton onPress={handleSignInWithGoogle} title="Entrar com Google" svg={GoogleSvg} />
					{Platform.OS === 'ios' && (
						<SocialButton onPress={handleSignInWithApple} title="Entrar com Apple" svg={AppleSvg} />
					)}
				</ButtonWrapper>
				{isLoading && <ActivityIndicator color={theme.colors.primary} size="large" />}
			</Footer>
		</Container>
	);
};

export { SignIn };
