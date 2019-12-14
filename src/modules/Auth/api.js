import { save } from "../../localStorage";
import { load } from "../../localStorage";

const jwt = { jwt: "86fasfgfsogHGad" };

export const fetchAuth = async data => {
  //Проверяем, хочет ли юзер сохранить свои данные. Не самый корректный код.
  //Остановился на нем чтобы реализовать тогглер в формате чекбокса.
  if (data.remember) {
    if (data.remember.length > 0) {
      save("email", data.email);
      save("password", data.password);
    }
  }

  //Имитируем таймаут фетч запроса
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(500);
  return jwt;
};

export const fetchVer = async data => {
  const token = load("jwt");
  console.log("veryfying: " + token);
  //Имитируем таймаут фетч запроса
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(500);

  if (token === null) return "false";
  return "success";
};
