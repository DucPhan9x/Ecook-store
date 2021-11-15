import createHttpError from "http-errors";
export const validateRequest = (req, schema, next) => {
  const options = {
    abortEarly: false, // false-all errors, true-first eror
    allowUnknown: true, // object to contain unknown keys which are ignored
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    throw createHttpError(
      400,
      `${error.details
        .map((x) => x.message.split('"')[1] + x.message.split('"')[2])
        .join(", ")}`
    );
  } else {
    req.body = value;
    next();
  }
};
