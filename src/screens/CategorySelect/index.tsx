import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/Forms/Button';
import { categories } from '../../utils/categories';
import { Container, Title, Header, Category, Icon, Name, Separator, Footer } from './styles';

interface CategoryProps {
	key: string;
	name: string;
}

interface Props {
	category: CategoryProps;
	setCategory: (category: CategoryProps) => void;
	closeSelectCategory: () => void;
}

const CategorySelect: React.FC<Props> = ({ category, setCategory, closeSelectCategory }) => {
	const handleCaregory = (categorySelected: CategoryProps) => {
		setCategory(categorySelected);
	};

	return (
		<Container>
			<Header>
				<Title>Categoria</Title>
			</Header>
			<FlatList
				data={categories}
				style={{ flex: 1, width: '100%' }}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<Category isActive={category.key === item.key} onPress={() => handleCaregory(item)}>
						<Icon name={item.icon} />
						<Name>{item.name}</Name>
					</Category>
				)}
				ItemSeparatorComponent={() => <Separator />}
			/>
			<Footer>
				<Button title="Selecionar" onPress={closeSelectCategory} />
			</Footer>
		</Container>
	);
};

export { CategorySelect };
