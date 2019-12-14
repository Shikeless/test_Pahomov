const products = [
  {
    img: "Ellipse.png",
    name: "SHINGLAS многослойная черепица, Ранчо, Коричневый, 2 м2",
    count: "78 уп.",
    price: "589.00",
    sum: "45471.00"
  },
  {
    img: "Ellipse-1.png",
    name: "Черепица конька/карниза  (уп. 12 п.м / 20 п.м)",
    count: "3 уп.",
    price: "4988.00",
    sum: "13717.00"
  },
  {
    img: "Ellipse-2.png",
    name: "Планка карниза, 2 м",
    count: "15 шт.",
    price: "595.00",
    sum: "8925.00"
  },
  {
    img: "Ellipse-3.png",
    name: "Планка ветровая, 2 м",
    count: "10 шт.",
    price: "780.00",
    sum: "7800.00"
  },
  {
    img: "Ellipse-4.png",
    name: "Ковер подкладочный, рулон 15 м2",
    count: "11 шт.",
    price: "3829.00",
    sum: "39439.00"
  },
  {
    img: "Ellipse-5.png",
    name: "Лист OSB, 2500×1250×9 мм",
    count: "54 шт.",
    price: "715.00",
    sum: "38057.00"
  },
  {
    img: "Ellipse-6.png",
    name: "Аэратор коньковый AIRIDGE FELT",
    count: "26 шт.",
    price: "350.00",
    sum: "9052.00"
  },
  {
    img: "Ellipse-7.png",
    name: "Вентилятор скатный Huopa KTV",
    count: "3 уп.",
    price: "1050.00",
    sum: "3150.00"
  },
  {
    img: "Ellipse-8.png",
    name: "Мастика битумная, 3 л",
    count: "4 шт.",
    price: "2380.00",
    sum: "7335.00"
  },
  {
    img: "Ellipse-9.png",
    name: "Гвозди кровельные ершеные (упаковка 5 кг)",
    count: "4 уп.",
    price: "589.00",
    sum: "2318.00"
  }
];

export const fetchProducts = async () => {
  //Имитируем таймаут фетч запроса
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(1000);
  return products;
};
