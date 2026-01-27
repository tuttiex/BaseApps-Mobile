import { Dapp } from './index';

export type RootStackParamList = {
    '(tabs)': undefined;
    DappDetail: { dapp: Dapp };
    NotFound: undefined;
};

export type TabParamList = {
    Home: undefined;
    Search: undefined;
    Favorites: undefined;
    Settings: undefined;
};

// Helper types for navigation props
declare global {
    namespace ReactNavigation {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        interface RootParamList extends RootStackParamList { }
    }
}
