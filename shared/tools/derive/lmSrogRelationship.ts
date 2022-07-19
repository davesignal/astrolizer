import * as data from "../../data";
import { cache, logMenSrog, yearSrog } from ".";

export function lmSrogRelationship(
  age: string,
  gender: string,
  dateOfBirth: string,
  cache: cache
): string {
  const keyOne = logMenSrog(age, gender, dateOfBirth, cache);
  const recordOne = cache[`${keyOne}_yearsElements_combined`]
    ? cache[`${keyOne}_yearsElements_combined`]
    : data.yearsElements.search({
        query: keyOne,
        range: "combined",
      });

  if (recordOne) {
    const keyTwo = yearSrog(dateOfBirth, cache);
    const resultOne = recordOne.srog;

    const recordTwo = cache[`${keyTwo + resultOne}_relationships_elemCombo`]
      ? cache[`${keyTwo + resultOne}_relationships_elemCombo`]
      : data.relationships.search({
          query: `${keyTwo + resultOne}`,
          range: `elemCombo`,
        });

    if (recordTwo) {
      cache[`${keyTwo + resultOne}_relationships_elemCombo`] = recordTwo;
      return `${resultOne} ${recordTwo.elemDeu}`;
    } else {
      throw new Error(
        "Lookup failed. This should not happen, please contact support."
      );
    }
  } else {
    throw new Error(
      "Lookup failed. This should not happen, please contact support."
    );
  }
}
