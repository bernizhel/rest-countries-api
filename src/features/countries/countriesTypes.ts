// todo: transforming interfaces keys to an array of the keys

export interface IBaseCountry {
    flag: string;
    name: string;
    population: number;
    region: string;
    capital: string;
}

export const keysOfCountry = ['flag', 'name', 'population', 'region', 'capital'];

export type Countries = IBaseCountry[]

export interface IDetailedCountry extends IBaseCountry {
    nativeName: string;
    subregion: string;
    topLevelDomain: string[];
    currencies: IDetail[];
    languages: IDetail[];
    borders: string[];
}

export const keysOfDetailedCountry = keysOfCountry.concat(
    ['nativeName', 'subregion', 'topLevelDomain', 'currencies', 'languages', 'borders']);

export type DetailedCountries = IDetailedCountry[]

export interface IDetail {
    name: string;
}

export interface INeighbor {
    name: string;
}