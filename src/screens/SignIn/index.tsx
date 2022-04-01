import React from 'react';
import LogoSvg from '../../assets/svg/logo.svg';
import AppleSvg from '../../assets/svg/apple.svg';
import GoogleSvg from '../../assets/svg/google.svg';

import { Container, Header, Footer, Title, Description, ButtonWrapper } from './styles';
import { SocialButton } from '../../components/SocialButton';
import { useAuth } from '../../hooks/auth';
import { Alert } from 'react-native';

const SignIn: React.FC = () => {
	const { user, signInWithGoogle, signInWithApple } = useAuth();

	const handleSignInWithGoogle = async () => {
		try {
			await signInWithGoogle();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível conectar com a conta Google');
		}
	};
	const handleSignInWithApple = async () => {
		try {
			await signInWithApple();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível conectar com a conta Apple');
		}
	};

	console.log('usuário logado:', user);

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
					<SocialButton onPress={handleSignInWithApple} title="Entrar com Apple" svg={AppleSvg} />
				</ButtonWrapper>
			</Footer>
		</Container>
	);
};

export { SignIn };
