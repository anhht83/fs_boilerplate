import _slugify from "slugify";

export const slugify = (str: string) =>
  _slugify(str, {
    lower: true,
    remove: /[*+~.()'"!:@]/g
  })
