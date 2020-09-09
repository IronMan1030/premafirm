export const SESSION_STORE_OWNER = "admin";
// export const EMPTY = 1;
// export const VALID = 0;
// export const INVALID_EMAIL = 2;
// export const MSG_EMPTY = "should not be empty!";
// export const MSG_VALID = "is valid!";
// export const MSG_INVALID_EMAIL = "is not valid!";

export const SEARCH_FROM_PRODUCT = -1;
export const SEARCH_FROM_RESULT = -2;
export const SEARCH_FROM_IMPORT = -3;

export const SEARCH_PLACEHOLDER_FOR_PRODUCTS = "Search for products to sell";
export const SEARCH_PLACEHOLDER_KEYWORDS = "Enter keywords";
export const SESSION_PRODUCT_IDS = "productIds";
export const checkEmail = (value) => {
  if (!value.trim().length) {
    return { code: 1, msg: "The email should not be empty!" };
  }
  if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(value)) {
    return { code: 0, msg: "Email is valid!" };
  }

  return { code: 2, msg: "The email is not valid!" };
};
