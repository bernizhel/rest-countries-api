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
    topLevelDomains: string[];
    currencies: object[];
    languages: object[];
    borders: string[];
}

export const keysOfDetailedCountry = keysOfCountry.concat(
    ['nativeName', 'subregion', 'topLevelDomain', 'currencies', 'languages', 'borders']);

export type DetailedCountries = IDetailedCountry[]

export interface INeighbor {
    name: string;
}