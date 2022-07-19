import * as data from "../../data";
import { cache, hour } from ".";

export function dutsodLung(key: string[], cache: cache): string {
  const calcDate = key[1];
  const dutsodHour = hour(key, cache);

  const recordOne = cache[`${calcDate}_dates_dayDate`]
    ? cache[`${calcDate}_dates_dayDate`]
    : data.dates.search({ query: calcDate, range: "dayDate" });
  const recordTwo = cache[`${dutsodHour}_gektsi2020_combined`]
    ? cache[`${dutsodHour}_gektsi2020_combined`]
    : data.gektsi2020.search({
        query: dutsodHour,
        range: "combined",
      });

  if (recordOne && recordTwo) {
    cache[`${calcDate}_dates_dayDate`] = recordOne;
    cache[`${dutsodHour}_gektsi2020_combined`] = recordTwo;

    return `${recordOne.yearLung} ${recordTwo.lungrdel}`;
  } else {
    throw new Error(
      "Lookup failed. This should not happen, please contact support."
    );
  }
}
