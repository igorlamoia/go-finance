import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface UserAuth {
	id: string;
	name: string;
	email: string;
	photo?: string;
}

interface IAuthContextData {
	user: UserAuth;
	signInWithGoogle: () => Promise<void>;
	signInWithApple: () => Promise<void>;
	logOut(): Promise<void>;
}

interface AuthorizationResponse {
	params: {
		access_token: string;
	};
	type: string;
}

const storageUserKey = '@gofinances:user';

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider: React.FC<ReactNode> = ({ children }) => {
	const [userAuth, setUserAuth] = useState<UserAuth>({} as UserAuth);
	useEffect(() => {
		(async () => {
			const savedUser = await AsyncStorage.getItem(storageUserKey);
			if (savedUser) {
				setUserAuth(JSON.parse(savedUser));
			}
		})();
	}, []);

	const logOut = async () => {
		setUserAuth({} as UserAuth);
		await AsyncStorage.setItem(storageUserKey, JSON.stringify({}));
	};

	const signInWithGoogle = async () => {
		try {
			const RESPONSE_TYPE = 'token';
			const SCOPE = encodeURI('profile email');

			const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

			const { type, params } = (await AuthSession.startAsync({ authUrl })) as AuthorizationResponse;
			if (type === 'success') {
				const response = await fetch(
					`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
				);
				const userInfo = await response.json();
				const userLogged = {
					id: userInfo.id,
					name: userInfo.given_name,
					email: userInfo.email,
					photo: userInfo.picture,
				};
				setUserAuth(userLogged);
				await AsyncStorage.setItem(storageUserKey, JSON.stringify(userLogged));
			}
		} catch (error: any) {
			throw new Error(error);
		}
	};

	const signInWithApple = async () => {
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});

			if (credential) {
				const userLogged = {
					id: String(credential.user),
					email: credential.email!,
					name: credential.fullName!.givenName!,
					photo: undefined,
				};

				setUserAuth(userLogged);
				await AsyncStorage.setItem(storageUserKey, JSON.stringify(userLogged));
			}
		} catch (error: any) {
			throw new Error(error);
		}
	};

	return (
		<AuthContext.Provider value={{ user: userAuth, signInWithGoogle, signInWithApple, logOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
