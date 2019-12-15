import validator from "validator";

export const validate = values => {
  const errors = {};
  if (values.password) {
    if (/\s/.test(values.password)) {
      errors.password = "Поле не должно содержать пробелов";
    }
    if (!validator.isAlphanumeric(values.password)) {
      errors.password = "Поле должно содержать только цифры и латинские буквы";
    }
    if (values.password.length < 5) {
      errors.password = "Поле должно состоять минимум из 5 символов";
    }
    if (validator.isEmpty(values.password)) {
      errors.password = "Поле обязательное для заполнения";
    }
  } else {
    errors.password = "Поле обязательное для заполнения";
  }
  if (values.email) {
    if (validator.isEmpty(values.email)) {
      errors.email = "Поле обязательное для заполнения";
    }
    if (!validator.isEmail(values.email)) {
      errors.email = "Введите корректный email";
    }
  } else {
    errors.email = "Поле обязательное для заполнения";
  }
  return errors;
};
