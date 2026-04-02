import { CountriesQueryDto } from '../dto/countries-query.dto';
import { CreateCountryDto } from '../dto/create-country.dto';

export class countryMapper {
  static fromApi(apiCountry: CountriesQueryDto): CreateCountryDto {
    return {
      id: apiCountry.id,
      name: apiCountry.name,
      code: apiCountry.code,
      region: apiCountry.region?.name
    };
  }
}
