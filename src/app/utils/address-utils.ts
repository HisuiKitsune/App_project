export function findNumber(addressComponents: { long_name: string, short_name: string, types: string[]}[]): string {
  return findAddressComponents(addressComponents, "street_number");
}

export function findCity(addressComponents: { long_name: string, short_name: string, types: string[]}[]): string {
  return findAddressComponents(addressComponents, "administrative_area_level_2");
}

export function findNeighborhood(addressComponents: { long_name: string, short_name: string, types: string[]}[]): string {
  return findAddressComponents(addressComponents, "sublocality") ||
    findAddressComponents(addressComponents, "sublocality_level_1");
}

export function findState(addressComponents: { long_name: string, short_name: string, types: string[]}[]): string {
  return findAddressComponents(addressComponents, "administrative_area_level_1");
}

export function findStateShortName(addressComponents: { long_name: string, short_name: string, types: string[]}[]): string {
  return findAddressComponents(addressComponents, "administrative_area_level_1");
}

export function findStreet(addressComponents: { long_name: string, short_name: string, types: string[]}[]): string {
  return findAddressComponents(addressComponents, "route");
}

export function findZipCode(addressComponents: { long_name: string, short_name: string, types: string[]}[]): string {
  let element = ""
  addressComponents.forEach((a: any) => {
    let hasZipCode = a.types.some((t: string) => t =="postal_code");
    if (hasZipCode) {
      element = a.long_name;
    }
  });

  return element;
}

export function findAddressComponents(
  addressComponents:  { long_name: string, short_name: string, types: string[]}[],
  type: string
) : string {
  let element = addressComponents.find(a => a.types.some(t => t == type));
  return element ? element.long_name : '';
}

export function findAddressComponentsShortName (
  addressComponents:  { long_name: string, short_name: string, types: string[]}[],
  type: string
) : string {
  let element = addressComponents.find(a => a.types.some(t => t == type));
  return element ? element.short_name : '';
}
