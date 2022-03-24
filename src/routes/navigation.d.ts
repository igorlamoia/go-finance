import { GoFinanceRoutesList } from './app.routes';

declare global {
	namespace ReactNavigation {
		interface RootParamList extends GoFinanceRoutesList {}
	}
}
