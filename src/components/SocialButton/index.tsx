import React from 'react';
import { SvgProps } from 'react-native-svg';

import { ButtonContainer, Title, ImageContainer } from './styles';

interface SocialButtonProps {
	title: string;
	svg: React.FC<SvgProps>;
	onPress?: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ title, svg: Svg, ...rest }) => {
	return (
		<ButtonContainer {...rest}>
			<ImageContainer>
				<Svg height="24" width="24" />
			</ImageContainer>
			<Title>{title}</Title>
		</ButtonContainer>
	);
};

export { SocialButton };
