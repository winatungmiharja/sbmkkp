import { differenceInYears, parse } from 'date-fns';

type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
};
// Please clone them and self-host if your site is going to be visited by many people.
// Then change the url and the default logo.
export function openGraph({
  siteName,
  templateTitle,
  description,
  logo = 'https://og.thcl.dev/images/logo.jpg',
}: OpenGraphType): string {
  const ogLogo = encodeURIComponent(logo);
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  const ogDesc = encodeURIComponent(description.trim());

  return `https://og.thcl.dev/api/general?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`;
}

export function calculateAge(birthDate: string, baseDate = new Date()) {
  const date = parse(birthDate, 'yyyy-MM-dd', new Date());
  const age = differenceInYears(baseDate, date);
  return age;
}

export const spacedToSnakeCase = (string: string) => {
  return string
    .split(' ')
    .map((word) => word.toLowerCase())
    .join('_');
};

/**
 * @function returns new array of object with appended item
 * @param value : array of object
 * @param appendItem : receive two params, (item,idx), return object that will be appended
 */
export function appendDataToArrayObject<T>(
  items: T[],
  appendItem: (value: T, id?: number) => Record<string, unknown>
): (T & Record<string, unknown>)[] {
  return items.map((item, i) => ({
    ...item,
    ...appendItem(item, i),
  }));
}
