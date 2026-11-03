/**
 * База данных стран и столиц мира на русском языке для TerraQuiz
 * Содержит все страны мира и территории с точными координатами, флагами, населением и интересными фактами.
 */

export interface Country {
  id: string; // ISO код, совпадающий с world-atlas
  name: string; // Русское название страны
  nameEn: string;
  capital: string; // Русское название столицы
  capitalEn: string;
  capitalCoords: [number, number]; // [долгота, широта]
  continent: 'Европа' | 'Азия' | 'Африка' | 'Америка' | 'Океания';
  flag: string;
  population: string;
  difficulty: 1 | 2 | 3; // 1: Базовый, 2: Продвинутый, 3: Эксперт
  trivia: string; // Интересный факт на русском
  aliases: string[]; // Варианты написания для ручного ввода
}

export const COUNTRIES: Country[] = [
  {
    "id": "643",
    "name": "Россия",
    "nameEn": "Russia",
    "capital": "Москва",
    "capitalEn": "Moscow",
    "capitalCoords": [
      37.6173,
      55.7558
    ],
    "continent": "Европа",
    "flag": "🇷🇺",
    "population": "146 млн",
    "difficulty": 1,
    "trivia": "Самое большое по площади государство мира, охватывающее 11 часовых поясов.",
    "aliases": [
      "россия",
      "рф",
      "российская федерация"
    ]
  },
  {
    "id": "250",
    "name": "Франция",
    "nameEn": "France",
    "capital": "Париж",
    "capitalEn": "Paris",
    "capitalCoords": [
      2.3522,
      48.8566
    ],
    "continent": "Европа",
    "flag": "🇫🇷",
    "population": "68 млн",
    "difficulty": 1,
    "trivia": "Париж называют «Городом света», а Лувр — самый посещаемый художественный музей на планете.",
    "aliases": [
      "франция",
      "французская республика"
    ]
  },
  {
    "id": "276",
    "name": "Германия",
    "nameEn": "Germany",
    "capital": "Берлин",
    "capitalEn": "Berlin",
    "capitalCoords": [
      13.405,
      52.52
    ],
    "continent": "Европа",
    "flag": "🇩🇪",
    "population": "84 млн",
    "difficulty": 1,
    "trivia": "В Берлине больше мостов, чем в Венеции — около 1700 мостовых переходов.",
    "aliases": [
      "германия",
      "фрг"
    ]
  },
  {
    "id": "826",
    "name": "Великобритания",
    "nameEn": "United Kingdom",
    "capital": "Лондон",
    "capitalEn": "London",
    "capitalCoords": [
      -0.1278,
      51.5074
    ],
    "continent": "Европа",
    "flag": "🇬🇧",
    "population": "67 млн",
    "difficulty": 1,
    "trivia": "Лондонское метро, открытое в 1863 году, является старейшим в мире.",
    "aliases": [
      "великобритания",
      "англия",
      "соединенное королевство",
      "британия"
    ]
  },
  {
    "id": "380",
    "name": "Италия",
    "nameEn": "Italy",
    "capital": "Рим",
    "capitalEn": "Rome",
    "capitalCoords": [
      12.4964,
      41.9028
    ],
    "continent": "Европа",
    "flag": "🇮🇹",
    "population": "59 млн",
    "difficulty": 1,
    "trivia": "Рим называют «Вечным городом», внутри него находится самое маленькое государство — Ватикан.",
    "aliases": [
      "италия",
      "итальянская республика"
    ]
  },
  {
    "id": "724",
    "name": "Испания",
    "nameEn": "Spain",
    "capital": "Мадрид",
    "capitalEn": "Madrid",
    "capitalCoords": [
      -3.7038,
      40.4168
    ],
    "continent": "Европа",
    "flag": "🇪🇸",
    "population": "47 млн",
    "difficulty": 1,
    "trivia": "Мадрид — одна из самых высокогорных столиц Европы, расположен на высоте 667 метров над уровнем моря.",
    "aliases": [
      "испания",
      "королевство испания"
    ]
  },
  {
    "id": "620",
    "name": "Португалия",
    "nameEn": "Portugal",
    "capital": "Лиссабон",
    "capitalEn": "Lisbon",
    "capitalCoords": [
      -9.1393,
      38.7223
    ],
    "continent": "Европа",
    "flag": "🇵🇹",
    "population": "10 млн",
    "difficulty": 1,
    "trivia": "Лиссабон старше Рима примерно на четыре века и был основан финикийцами.",
    "aliases": [
      "португалия"
    ]
  },
  {
    "id": "528",
    "name": "Нидерланды",
    "nameEn": "Netherlands",
    "capital": "Амстердам",
    "capitalEn": "Amsterdam",
    "capitalCoords": [
      4.9041,
      52.3676
    ],
    "continent": "Европа",
    "flag": "🇳🇱",
    "population": "18 млн",
    "difficulty": 1,
    "trivia": "Амстердам стоит более чем на миллионе деревянных свай, а количество велосипедов превышает население.",
    "aliases": [
      "нидерланды",
      "голландия"
    ]
  },
  {
    "id": "056",
    "name": "Бельгия",
    "nameEn": "Belgium",
    "capital": "Брюссель",
    "capitalEn": "Brussels",
    "capitalCoords": [
      4.3517,
      50.8503
    ],
    "continent": "Европа",
    "flag": "🇧🇪",
    "population": "11.6 млн",
    "difficulty": 1,
    "trivia": "Брюссель — столица Европейского союза и штаб-квартира НАТО.",
    "aliases": [
      "бельгия"
    ]
  },
  {
    "id": "756",
    "name": "Швейцария",
    "nameEn": "Switzerland",
    "capital": "Берн",
    "capitalEn": "Bern",
    "capitalCoords": [
      7.4474,
      46.948
    ],
    "continent": "Европа",
    "flag": "🇨🇭",
    "population": "8.7 млн",
    "difficulty": 1,
    "trivia": "Юридически у Швейцарии нет официальной столицы, Берн имеет статус «федерального города».",
    "aliases": [
      "швейцария"
    ]
  },
  {
    "id": "040",
    "name": "Австрия",
    "nameEn": "Austria",
    "capital": "Вена",
    "capitalEn": "Vienna",
    "capitalCoords": [
      16.3738,
      48.2082
    ],
    "continent": "Европа",
    "flag": "🇦🇹",
    "population": "9 млн",
    "difficulty": 1,
    "trivia": "Вена регулярно признается самым комфортным для проживания городом на Земле.",
    "aliases": [
      "австрия"
    ]
  },
  {
    "id": "616",
    "name": "Польша",
    "nameEn": "Poland",
    "capital": "Варшава",
    "capitalEn": "Warsaw",
    "capitalCoords": [
      21.0122,
      52.2297
    ],
    "continent": "Европа",
    "flag": "🇵🇱",
    "population": "38 млн",
    "difficulty": 1,
    "trivia": "Исторический центр Варшавы был бережно и детально восстановлен по старинным картинам после войны.",
    "aliases": [
      "польша"
    ]
  },
  {
    "id": "203",
    "name": "Чехия",
    "nameEn": "Czechia",
    "capital": "Прага",
    "capitalEn": "Prague",
    "capitalCoords": [
      14.4378,
      50.0755
    ],
    "continent": "Европа",
    "flag": "🇨🇿",
    "population": "10.5 млн",
    "difficulty": 1,
    "trivia": "Пражский Град занесен в Книгу рекордов Гиннесса как крупнейший древний замковый комплекс в мире.",
    "aliases": [
      "чехия",
      "чешская республика"
    ]
  },
  {
    "id": "703",
    "name": "Словакия",
    "nameEn": "Slovakia",
    "capital": "Братислава",
    "capitalEn": "Bratislava",
    "capitalCoords": [
      17.1077,
      48.1486
    ],
    "continent": "Европа",
    "flag": "🇸🇰",
    "population": "5.4 млн",
    "difficulty": 2,
    "trivia": "Братислава — единственная столица мира, граничащая сразу с двумя суверенными государствами: Австрией и Венгрией.",
    "aliases": [
      "словакия"
    ]
  },
  {
    "id": "348",
    "name": "Венгрия",
    "nameEn": "Hungary",
    "capital": "Будапешт",
    "capitalEn": "Budapest",
    "capitalCoords": [
      19.0402,
      47.4979
    ],
    "continent": "Европа",
    "flag": "🇭🇺",
    "population": "9.7 млн",
    "difficulty": 1,
    "trivia": "Будапешт образовался в 1873 году путем объединения трех древних городов: Буды, Обуды и Пешта.",
    "aliases": [
      "венгрия"
    ]
  },
  {
    "id": "642",
    "name": "Румыния",
    "nameEn": "Romania",
    "capital": "Бухарест",
    "capitalEn": "Bucharest",
    "capitalCoords": [
      26.1025,
      44.4268
    ],
    "continent": "Европа",
    "flag": "🇷🇴",
    "population": "19 млн",
    "difficulty": 2,
    "trivia": "Здание Парламента в Бухаресте — самое тяжелое административное здание в мире.",
    "aliases": [
      "румыния"
    ]
  },
  {
    "id": "100",
    "name": "Болгария",
    "nameEn": "Bulgaria",
    "capital": "София",
    "capitalEn": "Sofia",
    "capitalCoords": [
      23.3219,
      42.6977
    ],
    "continent": "Европа",
    "flag": "🇧🇬",
    "population": "6.5 млн",
    "difficulty": 2,
    "trivia": "София находится у подножия горы Витоша и является одной из древнейших европейских столиц.",
    "aliases": [
      "болгария"
    ]
  },
  {
    "id": "300",
    "name": "Греция",
    "nameEn": "Greece",
    "capital": "Афины",
    "capitalEn": "Athens",
    "capitalCoords": [
      23.7275,
      37.9838
    ],
    "continent": "Европа",
    "flag": "🇬🇷",
    "population": "10.4 млн",
    "difficulty": 1,
    "trivia": "Афины непрерывно заселены уже более 3400 лет и считаются колыбелью западной цивилизации.",
    "aliases": [
      "греция"
    ]
  },
  {
    "id": "752",
    "name": "Швеция",
    "nameEn": "Sweden",
    "capital": "Стокгольм",
    "capitalEn": "Stockholm",
    "capitalCoords": [
      18.0686,
      59.3293
    ],
    "continent": "Европа",
    "flag": "🇸🇪",
    "population": "10.5 млн",
    "difficulty": 1,
    "trivia": "Стокгольм раскинулся на 14 островах, соединенных 57 мостами на озере Меларен.",
    "aliases": [
      "швеция"
    ]
  },
  {
    "id": "578",
    "name": "Норвегия",
    "nameEn": "Norway",
    "capital": "Осло",
    "capitalEn": "Oslo",
    "capitalCoords": [
      10.7522,
      59.9139
    ],
    "continent": "Европа",
    "flag": "🇳🇴",
    "population": "5.5 млн",
    "difficulty": 1,
    "trivia": "В Осло ежегодно вручается Нобелевская премия мира.",
    "aliases": [
      "норвегия"
    ]
  },
  {
    "id": "246",
    "name": "Финляндия",
    "nameEn": "Finland",
    "capital": "Хельсинки",
    "capitalEn": "Helsinki",
    "capitalCoords": [
      24.9384,
      60.1699
    ],
    "continent": "Европа",
    "flag": "🇫🇮",
    "population": "5.5 млн",
    "difficulty": 1,
    "trivia": "Хельсинки признан одним из самых экологически чистых городов Европы.",
    "aliases": [
      "финляндия"
    ]
  },
  {
    "id": "208",
    "name": "Дания",
    "nameEn": "Denmark",
    "capital": "Копенгаген",
    "capitalEn": "Copenhagen",
    "capitalCoords": [
      12.5683,
      55.6761
    ],
    "continent": "Европа",
    "flag": "🇩🇰",
    "population": "5.9 млн",
    "difficulty": 1,
    "trivia": "В Копенгагене расположен парк Тиволи — один из старейших действующих луна-парков.",
    "aliases": [
      "дания"
    ]
  },
  {
    "id": "352",
    "name": "Исландия",
    "nameEn": "Iceland",
    "capital": "Рейкьявик",
    "capitalEn": "Reykjavik",
    "capitalCoords": [
      -21.9426,
      64.1466
    ],
    "continent": "Европа",
    "flag": "🇮🇸",
    "population": "390 тыс",
    "difficulty": 2,
    "trivia": "Самая северная столица независимого государства в мире.",
    "aliases": [
      "исландия"
    ]
  },
  {
    "id": "372",
    "name": "Ирландия",
    "nameEn": "Ireland",
    "capital": "Дублин",
    "capitalEn": "Dublin",
    "capitalCoords": [
      -6.2603,
      53.3498
    ],
    "continent": "Европа",
    "flag": "🇮🇪",
    "population": "5.1 млн",
    "difficulty": 1,
    "trivia": "Библиотека Тринити-колледжа в Дублине хранит Келлскую книгу 800 года н.э.",
    "aliases": [
      "ирландия"
    ]
  },
  {
    "id": "804",
    "name": "Украина",
    "nameEn": "Ukraine",
    "capital": "Киев",
    "capitalEn": "Kyiv",
    "capitalCoords": [
      30.5234,
      50.4501
    ],
    "continent": "Европа",
    "flag": "🇺🇦",
    "population": "38 млн",
    "difficulty": 1,
    "trivia": "Киев основан более 1500 лет назад на живописных склонах реки Днепр.",
    "aliases": [
      "украина"
    ]
  },
  {
    "id": "112",
    "name": "Беларусь",
    "nameEn": "Belarus",
    "capital": "Минск",
    "capitalEn": "Minsk",
    "capitalCoords": [
      27.5615,
      53.9045
    ],
    "continent": "Европа",
    "flag": "🇧🇾",
    "population": "9.2 млн",
    "difficulty": 1,
    "trivia": "В Минске находится один из самых длинных проспектов в Европе — проспект Независимости (15 км).",
    "aliases": [
      "беларусь",
      "белоруссия"
    ]
  },
  {
    "id": "498",
    "name": "Молдова",
    "nameEn": "Moldova",
    "capital": "Кишинёв",
    "capitalEn": "Chisinau",
    "capitalCoords": [
      28.8638,
      47.0105
    ],
    "continent": "Европа",
    "flag": "🇲🇩",
    "population": "2.5 млн",
    "difficulty": 2,
    "trivia": "Кишинёв славится огромными зелеными парками и крупнейшими винными подвалами Европы неподалеку.",
    "aliases": [
      "молдова",
      "молдавия"
    ]
  },
  {
    "id": "440",
    "name": "Литва",
    "nameEn": "Lithuania",
    "capital": "Вильнюс",
    "capitalEn": "Vilnius",
    "capitalCoords": [
      25.2797,
      54.6872
    ],
    "continent": "Европа",
    "flag": "🇱🇹",
    "population": "2.8 млн",
    "difficulty": 2,
    "trivia": "Старый город Вильнюса — один из крупнейших сохранившихся средневековых центров Восточной Европы.",
    "aliases": [
      "литва"
    ]
  },
  {
    "id": "428",
    "name": "Латвия",
    "nameEn": "Latvia",
    "capital": "Рига",
    "capitalEn": "Riga",
    "capitalCoords": [
      24.1052,
      56.9496
    ],
    "continent": "Европа",
    "flag": "🇱🇻",
    "population": "1.9 млн",
    "difficulty": 2,
    "trivia": "Рига признана мировой столицей архитектуры югендстиля (ар-нуво).",
    "aliases": [
      "латвия"
    ]
  },
  {
    "id": "233",
    "name": "Эстония",
    "nameEn": "Estonia",
    "capital": "Таллин",
    "capitalEn": "Tallinn",
    "capitalCoords": [
      24.7536,
      59.437
    ],
    "continent": "Европа",
    "flag": "🇪🇪",
    "population": "1.3 млн",
    "difficulty": 2,
    "trivia": "Таллинский Старый город сохранил нетронутыми крепостные стены и башни XIII века.",
    "aliases": [
      "эстония",
      "таллинн"
    ]
  },
  {
    "id": "688",
    "name": "Сербия",
    "nameEn": "Serbia",
    "capital": "Белград",
    "capitalEn": "Belgrade",
    "capitalCoords": [
      20.4612,
      44.7866
    ],
    "continent": "Европа",
    "flag": "🇷🇸",
    "population": "6.6 млн",
    "difficulty": 2,
    "trivia": "Белград стоит на слиянии рек Савы и Дуная, на месте древней крепости Калемегдан.",
    "aliases": [
      "сербия"
    ]
  },
  {
    "id": "191",
    "name": "Хорватия",
    "nameEn": "Croatia",
    "capital": "Загреб",
    "capitalEn": "Zagreb",
    "capitalCoords": [
      15.9819,
      45.815
    ],
    "continent": "Европа",
    "flag": "🇭🇷",
    "population": "3.9 млн",
    "difficulty": 2,
    "trivia": "В Загребе расположен Музей разорванных отношений, получивший европейскую музейную премию.",
    "aliases": [
      "хорватия"
    ]
  },
  {
    "id": "705",
    "name": "Словения",
    "nameEn": "Slovenia",
    "capital": "Любляна",
    "capitalEn": "Ljubljana",
    "capitalCoords": [
      14.5058,
      46.0569
    ],
    "continent": "Европа",
    "flag": "🇸🇮",
    "population": "2.1 млн",
    "difficulty": 2,
    "trivia": "Символ Любляны — зеленый дракон, охраняющий знаменитый Драконов мост.",
    "aliases": [
      "словения"
    ]
  },
  {
    "id": "070",
    "name": "Босния и Герцеговина",
    "nameEn": "Bosnia and Herz.",
    "capital": "Сараево",
    "capitalEn": "Sarajevo",
    "capitalCoords": [
      18.4131,
      43.8563
    ],
    "continent": "Европа",
    "flag": "🇧🇦",
    "population": "3.2 млн",
    "difficulty": 2,
    "trivia": "Сараево называют «Иерусалимом Европы» за гармоничное соседство мечетей, соборов и синагог.",
    "aliases": [
      "босния",
      "босния и герцеговина"
    ]
  },
  {
    "id": "499",
    "name": "Черногория",
    "nameEn": "Montenegro",
    "capital": "Подгорица",
    "capitalEn": "Podgorica",
    "capitalCoords": [
      19.2629,
      42.4304
    ],
    "continent": "Европа",
    "flag": "🇲🇪",
    "population": "620 тыс",
    "difficulty": 2,
    "trivia": "Подгорица стоит на слиянии пяти рек, а исторической столицей страны является город Цетине.",
    "aliases": [
      "черногория"
    ]
  },
  {
    "id": "807",
    "name": "Северная Македония",
    "nameEn": "Macedonia",
    "capital": "Скопье",
    "capitalEn": "Skopje",
    "capitalCoords": [
      21.428,
      41.9973
    ],
    "continent": "Европа",
    "flag": "🇲🇰",
    "population": "1.8 млн",
    "difficulty": 2,
    "trivia": "Скопье известен как город сотен монументальных памятников и родина Матери Терезы.",
    "aliases": [
      "македония",
      "северная македония"
    ]
  },
  {
    "id": "008",
    "name": "Албания",
    "nameEn": "Albania",
    "capital": "Тирана",
    "capitalEn": "Tirana",
    "capitalCoords": [
      19.8189,
      41.3275
    ],
    "continent": "Европа",
    "flag": "🇦🇱",
    "population": "2.7 млн",
    "difficulty": 2,
    "trivia": "Центральная площадь Тираны названа в честь национального героя Скандербега.",
    "aliases": [
      "албания"
    ]
  },
  {
    "id": "442",
    "name": "Люксембург",
    "nameEn": "Luxembourg",
    "capital": "Люксембург",
    "capitalEn": "Luxembourg",
    "capitalCoords": [
      6.1296,
      49.6116
    ],
    "continent": "Европа",
    "flag": "🇱🇺",
    "population": "660 тыс",
    "difficulty": 2,
    "trivia": "Первая в мире страна, сделавшая весь общественный транспорт абсолютно бесплатным.",
    "aliases": [
      "люксембург"
    ]
  },
  {
    "id": "196",
    "name": "Кипр",
    "nameEn": "Cyprus",
    "capital": "Никосия",
    "capitalEn": "Nicosia",
    "capitalCoords": [
      33.3823,
      35.1856
    ],
    "continent": "Европа",
    "flag": "🇨🇾",
    "population": "1.25 млн",
    "difficulty": 2,
    "trivia": "Никосия — последняя разделенная демаркационной линией ООН столица в Европе.",
    "aliases": [
      "кипр"
    ]
  },
  {
    "id": "470",
    "name": "Мальта",
    "nameEn": "Malta",
    "capital": "Валлетта",
    "capitalEn": "Valletta",
    "capitalCoords": [
      14.5141,
      35.8989
    ],
    "continent": "Европа",
    "flag": "🇲🇹",
    "population": "530 тыс",
    "difficulty": 2,
    "trivia": "Валлетта — самая компактная столица ЕС, полностью внесена в список всемирного наследия ЮНЕСКО.",
    "aliases": [
      "мальта"
    ]
  },
  {
    "id": "156",
    "name": "Китай",
    "nameEn": "China",
    "capital": "Пекин",
    "capitalEn": "Beijing",
    "capitalCoords": [
      116.4074,
      39.9042
    ],
    "continent": "Азия",
    "flag": "🇨🇳",
    "population": "1.41 млрд",
    "difficulty": 1,
    "trivia": "В Пекине находится Запретный город — крупнейший в мире дворцовый комплекс из 980 зданий.",
    "aliases": [
      "китай",
      "кнр"
    ]
  },
  {
    "id": "392",
    "name": "Япония",
    "nameEn": "Japan",
    "capital": "Токио",
    "capitalEn": "Tokyo",
    "capitalCoords": [
      139.6917,
      35.6895
    ],
    "continent": "Азия",
    "flag": "🇯🇵",
    "population": "125 млн",
    "difficulty": 1,
    "trivia": "Токио с агломерацией (более 37 млн жителей) — крупнейшая городская агломерация планеты.",
    "aliases": [
      "япония"
    ]
  },
  {
    "id": "356",
    "name": "Индия",
    "nameEn": "India",
    "capital": "Нью-Дели",
    "capitalEn": "New Delhi",
    "capitalCoords": [
      77.209,
      28.6139
    ],
    "continent": "Азия",
    "flag": "🇮🇳",
    "population": "1.43 млрд",
    "difficulty": 1,
    "trivia": "Самая населенная страна планеты, в Нью-Дели находится знаменитый храм Лотоса.",
    "aliases": [
      "индия",
      "дели",
      "нью-дели"
    ]
  },
  {
    "id": "410",
    "name": "Южная Корея",
    "nameEn": "South Korea",
    "capital": "Сеул",
    "capitalEn": "Seoul",
    "capitalCoords": [
      126.978,
      37.5665
    ],
    "continent": "Азия",
    "flag": "🇰🇷",
    "population": "51 млн",
    "difficulty": 1,
    "trivia": "Сеул — мировой лидер по скорости интернета и проникновению цифровых технологий.",
    "aliases": [
      "южная корея",
      "корея",
      "республика корея"
    ]
  },
  {
    "id": "408",
    "name": "Северная Корея",
    "nameEn": "North Korea",
    "capital": "Пхеньян",
    "capitalEn": "Pyongyang",
    "capitalCoords": [
      125.7625,
      39.0392
    ],
    "continent": "Азия",
    "flag": "🇰🇵",
    "population": "26 млн",
    "difficulty": 2,
    "trivia": "Метро Пхеньяна является одним из самых глубоких в мире — около 110 метров под землей.",
    "aliases": [
      "кндр",
      "северная корея"
    ]
  },
  {
    "id": "398",
    "name": "Казахстан",
    "nameEn": "Kazakhstan",
    "capital": "Астана",
    "capitalEn": "Astana",
    "capitalCoords": [
      71.4491,
      51.1694
    ],
    "continent": "Азия",
    "flag": "🇰🇿",
    "population": "20 млн",
    "difficulty": 1,
    "trivia": "Крупнейшее в мире государство, не имеющее прямого выхода к Мировому океану.",
    "aliases": [
      "казахстан",
      "нур-султан",
      "астана"
    ]
  },
  {
    "id": "860",
    "name": "Узбекистан",
    "nameEn": "Uzbekistan",
    "capital": "Ташкент",
    "capitalEn": "Tashkent",
    "capitalCoords": [
      69.2401,
      41.2995
    ],
    "continent": "Азия",
    "flag": "🇺🇿",
    "population": "36 млн",
    "difficulty": 2,
    "trivia": "Ташкентский метрополитен стал первой подземной железной дорогой в Центральной Азии.",
    "aliases": [
      "узбекистан"
    ]
  },
  {
    "id": "762",
    "name": "Таджикистан",
    "nameEn": "Tajikistan",
    "capital": "Душанбе",
    "capitalEn": "Dushanbe",
    "capitalCoords": [
      68.7864,
      38.5598
    ],
    "continent": "Азия",
    "flag": "🇹🇯",
    "population": "10 млн",
    "difficulty": 2,
    "trivia": "Более 93% территории страны покрыто высокими хребтами Памира и Тянь-Шаня.",
    "aliases": [
      "таджикистан"
    ]
  },
  {
    "id": "417",
    "name": "Кыргызстан",
    "nameEn": "Kyrgyzstan",
    "capital": "Бишкек",
    "capitalEn": "Bishkek",
    "capitalCoords": [
      74.5698,
      42.8746
    ],
    "continent": "Азия",
    "flag": "🇰🇬",
    "population": "7 млн",
    "difficulty": 2,
    "trivia": "В Кыргызстане расположено озеро Иссык-Куль — второе по величине высокогорное озеро в мире.",
    "aliases": [
      "кыргызстан",
      "киргизия"
    ]
  },
  {
    "id": "795",
    "name": "Туркменистан",
    "nameEn": "Turkmenistan",
    "capital": "Ашхабад",
    "capitalEn": "Ashgabat",
    "capitalCoords": [
      58.3261,
      37.9601
    ],
    "continent": "Азия",
    "flag": "🇹🇲",
    "population": "6.5 млн",
    "difficulty": 2,
    "trivia": "Ашхабад внесен в Книгу Гиннесса как город с самой высокой концентрацией беломраморных зданий.",
    "aliases": [
      "туркменистан",
      "туркмения"
    ]
  },
  {
    "id": "496",
    "name": "Монголия",
    "nameEn": "Mongolia",
    "capital": "Улан-Батор",
    "capitalEn": "Ulaanbaatar",
    "capitalCoords": [
      106.9057,
      47.8864
    ],
    "continent": "Азия",
    "flag": "🇲🇳",
    "population": "3.4 млн",
    "difficulty": 2,
    "trivia": "Улан-Батор — самая холодная столица мира со среднегодовой температурой около −1,3 °C.",
    "aliases": [
      "монголия"
    ]
  },
  {
    "id": "792",
    "name": "Турция",
    "nameEn": "Turkey",
    "capital": "Анкара",
    "capitalEn": "Ankara",
    "capitalCoords": [
      32.8597,
      39.9334
    ],
    "continent": "Азия",
    "flag": "🇹🇷",
    "population": "85 млн",
    "difficulty": 1,
    "trivia": "Анкара стала столицей республики в 1923 году по инициативе Мустафы Кемаля Ататюрка.",
    "aliases": [
      "турция"
    ]
  },
  {
    "id": "268",
    "name": "Грузия",
    "nameEn": "Georgia",
    "capital": "Тбилиси",
    "capitalEn": "Tbilisi",
    "capitalCoords": [
      44.8271,
      41.7151
    ],
    "continent": "Азия",
    "flag": "🇬🇪",
    "population": "3.7 млн",
    "difficulty": 1,
    "trivia": "Тбилиси основан в V веке царем Вахтангом Горгасали у теплых серных источников.",
    "aliases": [
      "грузия"
    ]
  },
  {
    "id": "051",
    "name": "Армения",
    "nameEn": "Armenia",
    "capital": "Ереван",
    "capitalEn": "Yerevan",
    "capitalCoords": [
      44.5152,
      40.1872
    ],
    "continent": "Азия",
    "flag": "🇦🇲",
    "population": "3 млн",
    "difficulty": 1,
    "trivia": "Ереван основан как крепость Эребуни в 782 году до н.э. и старше Рима почти на 30 лет.",
    "aliases": [
      "армения"
    ]
  },
  {
    "id": "031",
    "name": "Азербайджан",
    "nameEn": "Azerbaijan",
    "capital": "Баку",
    "capitalEn": "Baku",
    "capitalCoords": [
      49.8671,
      40.4093
    ],
    "continent": "Азия",
    "flag": "🇦🇿",
    "population": "10.2 млн",
    "difficulty": 1,
    "trivia": "Баку расположен на 28 метров ниже уровня моря, это самая низко расположенная столица мира.",
    "aliases": [
      "азербайджан"
    ]
  },
  {
    "id": "364",
    "name": "Иран",
    "nameEn": "Iran",
    "capital": "Тегеран",
    "capitalEn": "Tehran",
    "capitalCoords": [
      51.389,
      35.6892
    ],
    "continent": "Азия",
    "flag": "🇮🇷",
    "population": "88 млн",
    "difficulty": 1,
    "trivia": "Тегеран расположен у подножия гор Эльбурс, высота которых превышает 5000 метров.",
    "aliases": [
      "иран"
    ]
  },
  {
    "id": "368",
    "name": "Ирак",
    "nameEn": "Iraq",
    "capital": "Багдад",
    "capitalEn": "Baghdad",
    "capitalCoords": [
      44.3661,
      33.3152
    ],
    "continent": "Азия",
    "flag": "🇮🇶",
    "population": "43 млн",
    "difficulty": 1,
    "trivia": "В эпоху Золотого века ислама Багдад был крупнейшим культурным и научным центром Земли.",
    "aliases": [
      "ирак"
    ]
  },
  {
    "id": "682",
    "name": "Саудовская Аравия",
    "nameEn": "Saudi Arabia",
    "capital": "Эр-Рияд",
    "capitalEn": "Riyadh",
    "capitalCoords": [
      46.6753,
      24.7136
    ],
    "continent": "Азия",
    "flag": "🇸🇦",
    "population": "36 млн",
    "difficulty": 1,
    "trivia": "В Саудовской Аравии нет постоянных рек, а Эр-Рияд вырос из небольшого оазиса в пустыне.",
    "aliases": [
      "саудовская аравия"
    ]
  },
  {
    "id": "784",
    "name": "ОАЭ",
    "nameEn": "United Arab Emirates",
    "capital": "Абу-Даби",
    "capitalEn": "Abu Dhabi",
    "capitalCoords": [
      54.3773,
      24.4539
    ],
    "continent": "Азия",
    "flag": "🇦🇪",
    "population": "10 млн",
    "difficulty": 1,
    "trivia": "Абу-Даби — столица эмиратов, здесь находится грандиозная Белая мечеть шейха Заида.",
    "aliases": [
      "оаэ",
      "эмираты"
    ]
  },
  {
    "id": "634",
    "name": "Катар",
    "nameEn": "Qatar",
    "capital": "Доха",
    "capitalEn": "Doha",
    "capitalCoords": [
      51.531,
      25.2854
    ],
    "continent": "Азия",
    "flag": "🇶🇦",
    "population": "2.9 млн",
    "difficulty": 2,
    "trivia": "В Дохе проживает более 80% всего населения страны.",
    "aliases": [
      "катар"
    ]
  },
  {
    "id": "414",
    "name": "Кувейт",
    "nameEn": "Kuwait",
    "capital": "Эль-Кувейт",
    "capitalEn": "Kuwait City",
    "capitalCoords": [
      47.9774,
      29.3759
    ],
    "continent": "Азия",
    "flag": "🇰🇼",
    "population": "4.3 млн",
    "difficulty": 2,
    "trivia": "Кувейтский динар является самой дорогой валютой в мире по номиналу.",
    "aliases": [
      "кувейт"
    ]
  },
  {
    "id": "048",
    "name": "Бахрейн",
    "nameEn": "Bahrain",
    "capital": "Манама",
    "capitalEn": "Manama",
    "capitalCoords": [
      50.586,
      26.2285
    ],
    "continent": "Азия",
    "flag": "🇧🇭",
    "population": "1.5 млн",
    "difficulty": 2,
    "trivia": "Островное королевство соединено с Саудовской Аравией 25-километровым мостом короля Фахда.",
    "aliases": [
      "бахрейн"
    ]
  },
  {
    "id": "512",
    "name": "Оман",
    "nameEn": "Oman",
    "capital": "Маскат",
    "capitalEn": "Muscat",
    "capitalCoords": [
      58.4059,
      23.5859
    ],
    "continent": "Азия",
    "flag": "🇴🇲",
    "population": "5.2 млн",
    "difficulty": 2,
    "trivia": "Маскат окружен скалистыми горами Аль-Хаджар и сохранил традиционную арабскую архитектуру.",
    "aliases": [
      "оман"
    ]
  },
  {
    "id": "887",
    "name": "Йемен",
    "nameEn": "Yemen",
    "capital": "Сана",
    "capitalEn": "Sana'a",
    "capitalCoords": [
      44.2064,
      15.3694
    ],
    "continent": "Азия",
    "flag": "🇾🇪",
    "population": "34 млн",
    "difficulty": 3,
    "trivia": "Старый город Саны знаменит уникальными многоэтажными глиняными домами-башнями.",
    "aliases": [
      "йемен"
    ]
  },
  {
    "id": "400",
    "name": "Иордания",
    "nameEn": "Jordan",
    "capital": "Амман",
    "capitalEn": "Amman",
    "capitalCoords": [
      35.9284,
      31.9454
    ],
    "continent": "Азия",
    "flag": "🇯🇴",
    "population": "11 млн",
    "difficulty": 2,
    "trivia": "Амман построен на семи холмах, а в стране находится древнейший каменный город Петра.",
    "aliases": [
      "иордания"
    ]
  },
  {
    "id": "376",
    "name": "Израиль",
    "nameEn": "Israel",
    "capital": "Иерусалим",
    "capitalEn": "Jerusalem",
    "capitalCoords": [
      35.2137,
      31.7683
    ],
    "continent": "Азия",
    "flag": "🇮🇱",
    "population": "9.8 млн",
    "difficulty": 1,
    "trivia": "Священный город трех мировых религий с историей более 3000 лет.",
    "aliases": [
      "израиль"
    ]
  },
  {
    "id": "275",
    "name": "Палестина",
    "nameEn": "Palestine",
    "capital": "Рамалла",
    "capitalEn": "Ramallah",
    "capitalCoords": [
      35.2058,
      31.9038
    ],
    "continent": "Азия",
    "flag": "🇵🇸",
    "population": "5.2 млн",
    "difficulty": 2,
    "trivia": "Рамалла служит административным центром Государства Палестина на Западном берегу реки Иордан.",
    "aliases": [
      "палестина"
    ]
  },
  {
    "id": "422",
    "name": "Ливан",
    "nameEn": "Lebanon",
    "capital": "Бейрут",
    "capitalEn": "Beirut",
    "capitalCoords": [
      35.5018,
      33.8938
    ],
    "continent": "Азия",
    "flag": "🇱🇧",
    "population": "5.5 млн",
    "difficulty": 2,
    "trivia": "Бейрут исторически называли «Парижем Ближнего Востока» за его космополитичную культуру.",
    "aliases": [
      "ливан"
    ]
  },
  {
    "id": "760",
    "name": "Сирия",
    "nameEn": "Syria",
    "capital": "Дамаск",
    "capitalEn": "Damascus",
    "capitalCoords": [
      36.2765,
      33.5138
    ],
    "continent": "Азия",
    "flag": "🇸🇾",
    "population": "23 млн",
    "difficulty": 2,
    "trivia": "Дамаск считается одной из старейших непрерывно обитаемых столиц в истории человечества.",
    "aliases": [
      "сирия"
    ]
  },
  {
    "id": "586",
    "name": "Пакистан",
    "nameEn": "Pakistan",
    "capital": "Исламабад",
    "capitalEn": "Islamabad",
    "capitalCoords": [
      73.0479,
      33.6844
    ],
    "continent": "Азия",
    "flag": "🇵🇰",
    "population": "240 млн",
    "difficulty": 2,
    "trivia": "Исламабад был специально спроектирован в 1960-х годах греческим архитектором Доксиадисом.",
    "aliases": [
      "пакистан"
    ]
  },
  {
    "id": "004",
    "name": "Афганистан",
    "nameEn": "Afghanistan",
    "capital": "Кабул",
    "capitalEn": "Kabul",
    "capitalCoords": [
      69.1723,
      34.5553
    ],
    "continent": "Азия",
    "flag": "🇦🇫",
    "population": "41 млн",
    "difficulty": 2,
    "trivia": "Кабул расположен в узкой долине реки Кабул на высоте 1790 метров над уровнем моря.",
    "aliases": [
      "афганистан"
    ]
  },
  {
    "id": "050",
    "name": "Бангладеш",
    "nameEn": "Bangladesh",
    "capital": "Дакка",
    "capitalEn": "Dhaka",
    "capitalCoords": [
      90.4125,
      23.8103
    ],
    "continent": "Азия",
    "flag": "🇧🇩",
    "population": "170 млн",
    "difficulty": 2,
    "trivia": "Дакку называют «Мировой столицей рикш» — по городу курсирует более 500 000 велорикш.",
    "aliases": [
      "бангладеш"
    ]
  },
  {
    "id": "524",
    "name": "Непал",
    "nameEn": "Nepal",
    "capital": "Катманду",
    "capitalEn": "Kathmandu",
    "capitalCoords": [
      85.324,
      27.7172
    ],
    "continent": "Азия",
    "flag": "🇳🇵",
    "population": "30 млн",
    "difficulty": 2,
    "trivia": "В Непале находится высочайшая вершина планеты — Джомолунгма (Эверест, 8848 м).",
    "aliases": [
      "непал"
    ]
  },
  {
    "id": "064",
    "name": "Бутан",
    "nameEn": "Bhutan",
    "capital": "Тхимпху",
    "capitalEn": "Thimphu",
    "capitalCoords": [
      89.6393,
      27.4728
    ],
    "continent": "Азия",
    "flag": "🇧🇹",
    "population": "780 тыс",
    "difficulty": 3,
    "trivia": "Тхимпху — единственная столица в мире, где нет ни одного светофора.",
    "aliases": [
      "бутан"
    ]
  },
  {
    "id": "144",
    "name": "Шри-Ланка",
    "nameEn": "Sri Lanka",
    "capital": "Коломбо",
    "capitalEn": "Colombo",
    "capitalCoords": [
      79.8612,
      6.9271
    ],
    "continent": "Азия",
    "flag": "🇱🇰",
    "population": "22 млн",
    "difficulty": 2,
    "trivia": "Остров чая Цейлон, официальная столица законодательной власти — Шри-Джаяварденепура-Котте.",
    "aliases": [
      "шри-ланка",
      "коломбо",
      "цейлон"
    ]
  },
  {
    "id": "764",
    "name": "Таиланд",
    "nameEn": "Thailand",
    "capital": "Бангкок",
    "capitalEn": "Bangkok",
    "capitalCoords": [
      100.5018,
      13.7563
    ],
    "continent": "Азия",
    "flag": "🇹🇭",
    "population": "71 млн",
    "difficulty": 1,
    "trivia": "Полное церемониальное название Бангкока занесено в Книгу Гиннесса как самое длинное название места (168 букв).",
    "aliases": [
      "таиланд"
    ]
  },
  {
    "id": "704",
    "name": "Вьетнам",
    "nameEn": "Vietnam",
    "capital": "Ханой",
    "capitalEn": "Hanoi",
    "capitalCoords": [
      105.8342,
      21.0278
    ],
    "continent": "Азия",
    "flag": "🇻🇳",
    "population": "98 млн",
    "difficulty": 1,
    "trivia": "Ханой переводится как «город между рек», его сердцем является древнее озеро Возвращенного Меча.",
    "aliases": [
      "вьетнам"
    ]
  },
  {
    "id": "458",
    "name": "Малайзия",
    "nameEn": "Malaysia",
    "capital": "Куала-Лумпур",
    "capitalEn": "Kuala Lumpur",
    "capitalCoords": [
      101.6869,
      3.139
    ],
    "continent": "Азия",
    "flag": "🇲🇾",
    "population": "34 млн",
    "difficulty": 1,
    "trivia": "Визитная карточка Куала-Лумпура — башни-близнецы Петронас высотой 452 метра.",
    "aliases": [
      "малайзия"
    ]
  },
  {
    "id": "702",
    "name": "Сингапур",
    "nameEn": "Singapore",
    "capital": "Сингапур",
    "capitalEn": "Singapore",
    "capitalCoords": [
      103.8198,
      1.3521
    ],
    "continent": "Азия",
    "flag": "🇸🇬",
    "population": "5.9 млн",
    "difficulty": 1,
    "trivia": "Город-государство и остров, один из самых безопасных и зеленых мегаполисов мира.",
    "aliases": [
      "сингапур"
    ]
  },
  {
    "id": "360",
    "name": "Индонезия",
    "nameEn": "Indonesia",
    "capital": "Джакарта",
    "capitalEn": "Jakarta",
    "capitalCoords": [
      106.8456,
      -6.2088
    ],
    "continent": "Азия",
    "flag": "🇮🇩",
    "population": "277 млн",
    "difficulty": 1,
    "trivia": "Крупнейшее островное государство мира, насчитывающее более 17 000 островов.",
    "aliases": [
      "индонезия"
    ]
  },
  {
    "id": "608",
    "name": "Филиппины",
    "nameEn": "Philippines",
    "capital": "Манила",
    "capitalEn": "Manila",
    "capitalCoords": [
      120.9842,
      14.5995
    ],
    "continent": "Азия",
    "flag": "🇵🇭",
    "population": "114 млн",
    "difficulty": 1,
    "trivia": "Манила — один из самых густонаселенных городов в мире, основанный испанцами в 1571 году.",
    "aliases": [
      "филиппины"
    ]
  },
  {
    "id": "104",
    "name": "Мьянма",
    "nameEn": "Myanmar",
    "capital": "Нейпьидо",
    "capitalEn": "Naypyidaw",
    "capitalCoords": [
      96.0785,
      19.7633
    ],
    "continent": "Азия",
    "flag": "🇲🇲",
    "population": "54 млн",
    "difficulty": 3,
    "trivia": "Нейпьидо стал новой столицей в 2005 году, здесь построены пустующие шоссе шириной до 20 полос.",
    "aliases": [
      "мьянма",
      "бирма"
    ]
  },
  {
    "id": "116",
    "name": "Камбоджа",
    "nameEn": "Cambodia",
    "capital": "Пномпень",
    "capitalEn": "Phnom Penh",
    "capitalCoords": [
      104.9282,
      11.5564
    ],
    "continent": "Азия",
    "flag": "🇰🇭",
    "population": "17 млн",
    "difficulty": 2,
    "trivia": "В Камбодже находится Ангкор-Ват — самое крупное религиозное сооружение в мировой истории.",
    "aliases": [
      "камбоджа"
    ]
  },
  {
    "id": "418",
    "name": "Лаос",
    "nameEn": "Laos",
    "capital": "Вьентьян",
    "capitalEn": "Vientiane",
    "capitalCoords": [
      102.6331,
      17.9757
    ],
    "continent": "Азия",
    "flag": "🇱🇦",
    "population": "7.5 млн",
    "difficulty": 3,
    "trivia": "Единственная страна Юго-Восточной Азии, не имеющая выхода к морю.",
    "aliases": [
      "лаос"
    ]
  },
  {
    "id": "096",
    "name": "Бруней",
    "nameEn": "Brunei",
    "capital": "Бандар-Сери-Бегаван",
    "capitalEn": "Bandar Seri Begawan",
    "capitalCoords": [
      114.9481,
      4.9031
    ],
    "continent": "Азия",
    "flag": "🇧🇳",
    "population": "450 тыс",
    "difficulty": 3,
    "trivia": "Султанский дворец Истана Нурул Иман — самая большая жилая резиденция монарха в мире.",
    "aliases": [
      "бруней"
    ]
  },
  {
    "id": "626",
    "name": "Восточный Тимор",
    "nameEn": "Timor-Leste",
    "capital": "Дили",
    "capitalEn": "Dili",
    "capitalCoords": [
      125.5736,
      -8.5569
    ],
    "continent": "Азия",
    "flag": "🇹🇱",
    "population": "1.3 млн",
    "difficulty": 3,
    "trivia": "Первое новое суверенное государство, появившееся в XXI веке (в 2002 году).",
    "aliases": [
      "тимор",
      "восточный тимор",
      "тимор-лешти"
    ]
  },
  {
    "id": "158",
    "name": "Тайвань",
    "nameEn": "Taiwan",
    "capital": "Тайбэй",
    "capitalEn": "Taipei",
    "capitalCoords": [
      121.5654,
      25.033
    ],
    "continent": "Азия",
    "flag": "🇹🇼",
    "population": "23.5 млн",
    "difficulty": 2,
    "trivia": "Небоскреб «Тайбэй 101» стал первым зданием планеты, преодолевшим рубеж в полкилометра.",
    "aliases": [
      "тайвань"
    ]
  },
  {
    "id": "840",
    "name": "США",
    "nameEn": "United States of America",
    "capital": "Вашингтон",
    "capitalEn": "Washington, D.C.",
    "capitalCoords": [
      -77.0369,
      38.9072
    ],
    "continent": "Америка",
    "flag": "🇺🇸",
    "population": "335 млн",
    "difficulty": 1,
    "trivia": "Столица США не входит ни в один из 50 штатов и образует самостоятельный федеральный округ Колумбия.",
    "aliases": [
      "сша",
      "америка",
      "соединенные штаты"
    ]
  },
  {
    "id": "124",
    "name": "Канада",
    "nameEn": "Canada",
    "capital": "Оттава",
    "capitalEn": "Ottawa",
    "capitalCoords": [
      -75.6972,
      45.4215
    ],
    "continent": "Америка",
    "flag": "🇨🇦",
    "population": "40 млн",
    "difficulty": 1,
    "trivia": "Канада обладает самой длинной береговой линией в мире (свыше 202 000 километров).",
    "aliases": [
      "канада"
    ]
  },
  {
    "id": "484",
    "name": "Мексика",
    "nameEn": "Mexico",
    "capital": "Мехико",
    "capitalEn": "Mexico City",
    "capitalCoords": [
      -99.1332,
      19.4326
    ],
    "continent": "Америка",
    "flag": "🇲🇽",
    "population": "128 млн",
    "difficulty": 1,
    "trivia": "Мехико построен на руинах древней столицы ацтеков Теночтитлана на высоте 2240 метров.",
    "aliases": [
      "мексика"
    ]
  },
  {
    "id": "076",
    "name": "Бразилия",
    "nameEn": "Brazil",
    "capital": "Бразилиа",
    "capitalEn": "Brasilia",
    "capitalCoords": [
      -47.8822,
      -15.7942
    ],
    "continent": "Америка",
    "flag": "🇧🇷",
    "population": "215 млн",
    "difficulty": 1,
    "trivia": "Город Бразилиа был с нуля построен за 41 месяц по проекту архитектора Оскара Нимейера в форме самолета.",
    "aliases": [
      "бразилия"
    ]
  },
  {
    "id": "032",
    "name": "Аргентина",
    "nameEn": "Argentina",
    "capital": "Буэнос-Айрес",
    "capitalEn": "Buenos Aires",
    "capitalCoords": [
      -58.3816,
      -34.6037
    ],
    "continent": "Америка",
    "flag": "🇦🇷",
    "population": "46 млн",
    "difficulty": 1,
    "trivia": "Авенида 9 июля в Буэнос-Айресе считается одной из самых широких улиц в мире (до 140 метров).",
    "aliases": [
      "аргентина"
    ]
  },
  {
    "id": "152",
    "name": "Чили",
    "nameEn": "Chile",
    "capital": "Сантьяго",
    "capitalEn": "Santiago",
    "capitalCoords": [
      -70.6693,
      -33.4489
    ],
    "continent": "Америка",
    "flag": "🇨🇱",
    "population": "19.5 млн",
    "difficulty": 1,
    "trivia": "Самая длинная и узкая страна мира, вытянувшаяся на 4300 километров вдоль хребтов Анд.",
    "aliases": [
      "чили"
    ]
  },
  {
    "id": "170",
    "name": "Колумбия",
    "nameEn": "Colombia",
    "capital": "Богота",
    "capitalEn": "Bogota",
    "capitalCoords": [
      -74.0721,
      4.711
    ],
    "continent": "Америка",
    "flag": "🇨🇴",
    "population": "52 млн",
    "difficulty": 1,
    "trivia": "Богота находится на высоте 2640 метров и является третьей по высоте столицей Южной Америки.",
    "aliases": [
      "колумбия"
    ]
  },
  {
    "id": "604",
    "name": "Перу",
    "nameEn": "Peru",
    "capital": "Лима",
    "capitalEn": "Lima",
    "capitalCoords": [
      -77.0428,
      -12.0464
    ],
    "continent": "Америка",
    "flag": "🇵🇪",
    "population": "34 млн",
    "difficulty": 1,
    "trivia": "Лима основана испанским конкистадором Франсиско Писарро в 1535 году как «Город королей».",
    "aliases": [
      "перу"
    ]
  },
  {
    "id": "862",
    "name": "Венесуэла",
    "nameEn": "Venezuela",
    "capital": "Каракас",
    "capitalEn": "Caracas",
    "capitalCoords": [
      -66.9036,
      10.4806
    ],
    "continent": "Америка",
    "flag": "🇻🇪",
    "population": "29 млн",
    "difficulty": 1,
    "trivia": "В Венесуэле находится водопад Анхель высотой 979 метров — самый высокий в мире.",
    "aliases": [
      "венесуэла"
    ]
  },
  {
    "id": "218",
    "name": "Эквадор",
    "nameEn": "Ecuador",
    "capital": "Кито",
    "capitalEn": "Quito",
    "capitalCoords": [
      -78.4678,
      -0.1807
    ],
    "continent": "Америка",
    "flag": "🇪🇨",
    "population": "18 млн",
    "difficulty": 1,
    "trivia": "Кито — столица, расположенная ближе всего к земному экватору (всего в 25 км).",
    "aliases": [
      "эквадор"
    ]
  },
  {
    "id": "068",
    "name": "Боливия",
    "nameEn": "Bolivia",
    "capital": "Сукре",
    "capitalEn": "Sucre",
    "capitalCoords": [
      -65.259,
      -19.0196
    ],
    "continent": "Америка",
    "flag": "🇧🇴",
    "population": "12 млн",
    "difficulty": 2,
    "trivia": "Официальная конституционная столица — Сукре, а правительство и парламент заседают в Ла-Пасе.",
    "aliases": [
      "боливия",
      "ла-пас",
      "сукре"
    ]
  },
  {
    "id": "600",
    "name": "Парагвай",
    "nameEn": "Paraguay",
    "capital": "Асунсьон",
    "capitalEn": "Asuncion",
    "capitalCoords": [
      -57.5759,
      -25.2637
    ],
    "continent": "Америка",
    "flag": "🇵🇾",
    "population": "7.4 млн",
    "difficulty": 2,
    "trivia": "Асунсьон — один из старейших городов Южной Америки, основанный еще в 1537 году.",
    "aliases": [
      "парагвай"
    ]
  },
  {
    "id": "858",
    "name": "Уругвай",
    "nameEn": "Uruguay",
    "capital": "Монтевидео",
    "capitalEn": "Montevideo",
    "capitalCoords": [
      -56.1645,
      -34.9011
    ],
    "continent": "Америка",
    "flag": "🇺🇾",
    "population": "3.5 млн",
    "difficulty": 2,
    "trivia": "В Монтевидео в 1930 году прошел самый первый в истории чемпионат мира по футболу.",
    "aliases": [
      "уругвай"
    ]
  },
  {
    "id": "328",
    "name": "Гайана",
    "nameEn": "Guyana",
    "capital": "Джорджтаун",
    "capitalEn": "Georgetown",
    "capitalCoords": [
      -58.1551,
      6.8013
    ],
    "continent": "Америка",
    "flag": "🇬🇾",
    "population": "800 тыс",
    "difficulty": 3,
    "trivia": "Единственная англоязычная страна на материке Южная Америка.",
    "aliases": [
      "гайана"
    ]
  },
  {
    "id": "740",
    "name": "Суринам",
    "nameEn": "Suriname",
    "capital": "Парамарибо",
    "capitalEn": "Paramaribo",
    "capitalCoords": [
      -55.2038,
      5.852
    ],
    "continent": "Америка",
    "flag": "🇸🇷",
    "population": "620 тыс",
    "difficulty": 3,
    "trivia": "Самая маленькая по площади независимая страна Южной Америки, официальный язык — нидерландский.",
    "aliases": [
      "суринам"
    ]
  },
  {
    "id": "591",
    "name": "Панама",
    "nameEn": "Panama",
    "capital": "Панама",
    "capitalEn": "Panama City",
    "capitalCoords": [
      -79.5197,
      8.9824
    ],
    "continent": "Америка",
    "flag": "🇵🇦",
    "population": "4.4 млн",
    "difficulty": 1,
    "trivia": "Знаменитый Панамский канал соединяет Атлантический и Тихий океаны на протяжении 82 км.",
    "aliases": [
      "панама"
    ]
  },
  {
    "id": "188",
    "name": "Коста-Рика",
    "nameEn": "Costa Rica",
    "capital": "Сан-Хосе",
    "capitalEn": "San Jose",
    "capitalCoords": [
      -84.0907,
      9.9281
    ],
    "continent": "Америка",
    "flag": "🇨🇷",
    "population": "5.2 млн",
    "difficulty": 2,
    "trivia": "Коста-Рика еще в 1948 году полностью и конституционно отказалась от постоянной армии.",
    "aliases": [
      "коста-рика"
    ]
  },
  {
    "id": "558",
    "name": "Никарагуа",
    "nameEn": "Nicaragua",
    "capital": "Манагуа",
    "capitalEn": "Managua",
    "capitalCoords": [
      -86.2362,
      12.115
    ],
    "continent": "Америка",
    "flag": "🇳🇮",
    "population": "7 млн",
    "difficulty": 2,
    "trivia": "Крупнейшая страна Центральной Америки, на озере Никарагуа водятся пресноводные акулы.",
    "aliases": [
      "никарагуа"
    ]
  },
  {
    "id": "340",
    "name": "Гондурас",
    "nameEn": "Honduras",
    "capital": "Тегусигальпа",
    "capitalEn": "Tegucigalpa",
    "capitalCoords": [
      -87.2068,
      14.0723
    ],
    "continent": "Америка",
    "flag": "🇭🇳",
    "population": "10.4 млн",
    "difficulty": 2,
    "trivia": "Здесь находился могущественный древний город майя Копан со знаменитой Иероглифической лестницей.",
    "aliases": [
      "гондурас"
    ]
  },
  {
    "id": "222",
    "name": "Сальвадор",
    "nameEn": "El Salvador",
    "capital": "Сан-Сальвадор",
    "capitalEn": "San Salvador",
    "capitalCoords": [
      -89.2182,
      13.6929
    ],
    "continent": "Америка",
    "flag": "🇸🇻",
    "population": "6.3 млн",
    "difficulty": 2,
    "trivia": "Самая плотно населенная страна континентальной Америки, известная как «Земля вулканов».",
    "aliases": [
      "сальвадор",
      "эль-сальвадор"
    ]
  },
  {
    "id": "320",
    "name": "Гватемала",
    "nameEn": "Guatemala",
    "capital": "Гватемала",
    "capitalEn": "Guatemala City",
    "capitalCoords": [
      -90.5069,
      14.6349
    ],
    "continent": "Америка",
    "flag": "🇬🇹",
    "population": "18 млн",
    "difficulty": 2,
    "trivia": "Название страны происходит от индейского слова, означающего «место многих деревьев».",
    "aliases": [
      "гватемала"
    ]
  },
  {
    "id": "084",
    "name": "Белиз",
    "nameEn": "Belize",
    "capital": "Бельмопан",
    "capitalEn": "Belmopan",
    "capitalCoords": [
      -88.7667,
      17.251
    ],
    "continent": "Америка",
    "flag": "🇧🇿",
    "population": "400 тыс",
    "difficulty": 3,
    "trivia": "Бельмопан — одна из самых молодых столиц мира, построена после разрушения ураганом прежней столицы Белиз-Сити.",
    "aliases": [
      "белиз"
    ]
  },
  {
    "id": "192",
    "name": "Куба",
    "nameEn": "Cuba",
    "capital": "Гавана",
    "capitalEn": "Havana",
    "capitalCoords": [
      -82.3666,
      23.1136
    ],
    "continent": "Америка",
    "flag": "🇨🇺",
    "population": "11 млн",
    "difficulty": 1,
    "trivia": "Крупнейший остров Карибского бассейна, исторический центр Гаваны внесен в список ЮНЕСКО.",
    "aliases": [
      "куба"
    ]
  },
  {
    "id": "332",
    "name": "Гаити",
    "nameEn": "Haiti",
    "capital": "Порт-о-Пренс",
    "capitalEn": "Port-au-Prince",
    "capitalCoords": [
      -72.3387,
      18.5944
    ],
    "continent": "Америка",
    "flag": "🇭🇹",
    "population": "11.5 млн",
    "difficulty": 2,
    "trivia": "Первая в мире независимая республика темнокожих, сбросившая рабство в 1804 году.",
    "aliases": [
      "гаити"
    ]
  },
  {
    "id": "214",
    "name": "Доминиканская Республика",
    "nameEn": "Dominican Rep.",
    "capital": "Санто-Доминго",
    "capitalEn": "Santo Domingo",
    "capitalCoords": [
      -69.9312,
      18.4861
    ],
    "continent": "Америка",
    "flag": "🇩🇴",
    "population": "11 млн",
    "difficulty": 2,
    "trivia": "Санто-Доминго — старейшее непрерывно обитаемое европейское поселение в Америке, основанное братом Колумба.",
    "aliases": [
      "доминикана",
      "доминиканская республика"
    ]
  },
  {
    "id": "388",
    "name": "Ямайка",
    "nameEn": "Jamaica",
    "capital": "Кингстон",
    "capitalEn": "Kingston",
    "capitalCoords": [
      -76.7936,
      17.9712
    ],
    "continent": "Америка",
    "flag": "🇯🇲",
    "population": "2.8 млн",
    "difficulty": 2,
    "trivia": "Родина музыки регги, Боба Марли и самых быстрых спринтеров планеты.",
    "aliases": [
      "ямайка"
    ]
  },
  {
    "id": "044",
    "name": "Багамские Острова",
    "nameEn": "Bahamas",
    "capital": "Нассау",
    "capitalEn": "Nassau",
    "capitalCoords": [
      -77.345,
      25.048
    ],
    "continent": "Америка",
    "flag": "🇧🇸",
    "population": "400 тыс",
    "difficulty": 2,
    "trivia": "Нассау в XVIII веке служил знаменитой пиратской республикой Черной Бороды.",
    "aliases": [
      "багамы",
      "багамские острова"
    ]
  },
  {
    "id": "780",
    "name": "Тринидад и Тобаго",
    "nameEn": "Trinidad and Tobago",
    "capital": "Порт-оф-Спейн",
    "capitalEn": "Port of Spain",
    "capitalCoords": [
      -61.5189,
      10.6549
    ],
    "continent": "Америка",
    "flag": "🇹🇹",
    "population": "1.5 млн",
    "difficulty": 3,
    "trivia": "Родина стальных барабанов (стилпэнов) — единственного нового акустического инструмента XX века.",
    "aliases": [
      "тринидад",
      "тринидад и тобаго"
    ]
  },
  {
    "id": "630",
    "name": "Пуэрто-Рико",
    "nameEn": "Puerto Rico",
    "capital": "Сан-Хуан",
    "capitalEn": "San Juan",
    "capitalCoords": [
      -66.1057,
      18.4655
    ],
    "continent": "Америка",
    "flag": "🇵🇷",
    "population": "3.2 млн",
    "difficulty": 2,
    "trivia": "Остров со статусом свободно ассоциированной территории США, крепость Эль-Морро защищает гавань более 400 лет.",
    "aliases": [
      "пуэрто-рико"
    ]
  },
  {
    "id": "304",
    "name": "Гренландия",
    "nameEn": "Greenland",
    "capital": "Нуук",
    "capitalEn": "Nuuk",
    "capitalCoords": [
      -51.7216,
      64.1814
    ],
    "continent": "Америка",
    "flag": "🇬🇱",
    "population": "56 тыс",
    "difficulty": 2,
    "trivia": "Крупнейший остров на Земле, более 80% площади которого круглый год покрыто ледяным щитом.",
    "aliases": [
      "гренландия"
    ]
  },
  {
    "id": "238",
    "name": "Фолклендские острова",
    "nameEn": "Falkland Is.",
    "capital": "Стэнли",
    "capitalEn": "Stanley",
    "capitalCoords": [
      -57.8545,
      -51.6977
    ],
    "continent": "Америка",
    "flag": "🇫🇰",
    "population": "3.5 тыс",
    "difficulty": 3,
    "trivia": "Архипелаг на крайнем юге Атлантики, где численность пингвинов превосходит людей более чем в 300 раз.",
    "aliases": [
      "фолкленды",
      "фолклендские острова",
      "мальвины"
    ]
  },
  {
    "id": "818",
    "name": "Египет",
    "nameEn": "Egypt",
    "capital": "Каир",
    "capitalEn": "Cairo",
    "capitalCoords": [
      31.2357,
      30.0444
    ],
    "continent": "Африка",
    "flag": "🇪🇬",
    "population": "105 млн",
    "difficulty": 1,
    "trivia": "Каир — крупнейший мегаполис арабского мира, рядом с которым высятся пирамиды Гизы.",
    "aliases": [
      "египет"
    ]
  },
  {
    "id": "504",
    "name": "Марокко",
    "nameEn": "Morocco",
    "capital": "Рабат",
    "capitalEn": "Rabat",
    "capitalCoords": [
      -6.8498,
      34.0209
    ],
    "continent": "Африка",
    "flag": "🇲🇦",
    "population": "37 млн",
    "difficulty": 1,
    "trivia": "В Марокко находится старейший непрерывно действующий университет мира — Аль-Карауин, основанный в 859 году.",
    "aliases": [
      "марокко"
    ]
  },
  {
    "id": "012",
    "name": "Алжир",
    "nameEn": "Algeria",
    "capital": "Алжир",
    "capitalEn": "Algiers",
    "capitalCoords": [
      3.0588,
      36.7538
    ],
    "continent": "Африка",
    "flag": "🇩🇿",
    "population": "45 млн",
    "difficulty": 1,
    "trivia": "Крупнейшее по площади государство Африканского континента, более 80% которого занимает Сахара.",
    "aliases": [
      "алжир"
    ]
  },
  {
    "id": "788",
    "name": "Тунис",
    "nameEn": "Tunisia",
    "capital": "Тунис",
    "capitalEn": "Tunis",
    "capitalCoords": [
      10.1815,
      36.8065
    ],
    "continent": "Африка",
    "flag": "🇹🇳",
    "population": "12 млн",
    "difficulty": 1,
    "trivia": "Рядом со столицей находятся руины античного Карфагена — главного соперника Древнего Рима.",
    "aliases": [
      "тунис"
    ]
  },
  {
    "id": "434",
    "name": "Ливия",
    "nameEn": "Libya",
    "capital": "Триполи",
    "capitalEn": "Tripoli",
    "capitalCoords": [
      13.1913,
      32.8872
    ],
    "continent": "Африка",
    "flag": "🇱🇾",
    "population": "7 млн",
    "difficulty": 2,
    "trivia": "Триполи был основан финикийцами в VII веке до н.э. под названием Эя.",
    "aliases": [
      "ливия"
    ]
  },
  {
    "id": "710",
    "name": "ЮАР",
    "nameEn": "South Africa",
    "capital": "Претория",
    "capitalEn": "Pretoria",
    "capitalCoords": [
      28.2293,
      -25.7479
    ],
    "continent": "Африка",
    "flag": "🇿🇦",
    "population": "60 млн",
    "difficulty": 1,
    "trivia": "У ЮАР три столицы: исполнительная — Претория, законодательная — Кейптаун, судебная — Блумфонтейн.",
    "aliases": [
      "юар",
      "южная африка"
    ]
  },
  {
    "id": "566",
    "name": "Нигерия",
    "nameEn": "Nigeria",
    "capital": "Абуджа",
    "capitalEn": "Abuja",
    "capitalCoords": [
      7.4951,
      9.0579
    ],
    "continent": "Африка",
    "flag": "🇳🇬",
    "population": "220 млн",
    "difficulty": 1,
    "trivia": "Самая густонаселенная страна Африки, Абуджа стала столицей в 1991 году, сменив Лагос.",
    "aliases": [
      "нигерия"
    ]
  },
  {
    "id": "404",
    "name": "Кения",
    "nameEn": "Kenya",
    "capital": "Найроби",
    "capitalEn": "Nairobi",
    "capitalCoords": [
      36.8219,
      -1.2921
    ],
    "continent": "Африка",
    "flag": "🇰🇪",
    "population": "54 млн",
    "difficulty": 1,
    "trivia": "Найроби — единственная мировая столица с действующим национальным сафари-парком прямо в черте города.",
    "aliases": [
      "кения"
    ]
  },
  {
    "id": "231",
    "name": "Эфиопия",
    "nameEn": "Ethiopia",
    "capital": "Аддис-Абеба",
    "capitalEn": "Addis Ababa",
    "capitalCoords": [
      38.7578,
      9.025
    ],
    "continent": "Африка",
    "flag": "🇪🇹",
    "population": "123 млн",
    "difficulty": 1,
    "trivia": "Аддис-Абеба («Новый цветок») расположена на высоте 2355 метров и является дипломатической столицей Африки.",
    "aliases": [
      "эфиопия"
    ]
  },
  {
    "id": "834",
    "name": "Танзания",
    "nameEn": "Tanzania",
    "capital": "Додома",
    "capitalEn": "Dodoma",
    "capitalCoords": [
      35.7516,
      -6.163
    ],
    "continent": "Африка",
    "flag": "🇹🇿",
    "population": "65 млн",
    "difficulty": 2,
    "trivia": "В Танзании высится пик Килиманджаро (5895 м) — высочайшая точка Африки.",
    "aliases": [
      "танзания"
    ]
  },
  {
    "id": "180",
    "name": "ДР Конго",
    "nameEn": "Dem. Rep. Congo",
    "capital": "Киншаса",
    "capitalEn": "Kinshasa",
    "capitalCoords": [
      15.2663,
      -4.4419
    ],
    "continent": "Африка",
    "flag": "🇨🇩",
    "population": "100 млн",
    "difficulty": 2,
    "trivia": "Киншаса и Браззавиль — две ближайшие в мире столицы, разделенные лишь рекой Конго.",
    "aliases": [
      "др конго",
      "конго",
      "заир"
    ]
  },
  {
    "id": "178",
    "name": "Республика Конго",
    "nameEn": "Congo",
    "capital": "Браззавиль",
    "capitalEn": "Brazzaville",
    "capitalCoords": [
      15.2832,
      -4.2634
    ],
    "continent": "Африка",
    "flag": "🇨🇬",
    "population": "6 млн",
    "difficulty": 2,
    "trivia": "Город назван в честь франко-итальянского исследователя Пьера Саворньяна де Бразза.",
    "aliases": [
      "республика конго",
      "конго-браззавиль"
    ]
  },
  {
    "id": "729",
    "name": "Судан",
    "nameEn": "Sudan",
    "capital": "Хартум",
    "capitalEn": "Khartoum",
    "capitalCoords": [
      32.5599,
      15.5007
    ],
    "continent": "Африка",
    "flag": "🇸🇩",
    "population": "48 млн",
    "difficulty": 2,
    "trivia": "Хартум находится в точке слияния Белого и Голубого Нила в единую великую реку.",
    "aliases": [
      "судан"
    ]
  },
  {
    "id": "728",
    "name": "Южный Судан",
    "nameEn": "S. Sudan",
    "capital": "Джуба",
    "capitalEn": "Juba",
    "capitalCoords": [
      31.5825,
      4.8594
    ],
    "continent": "Африка",
    "flag": "🇸🇸",
    "population": "11 млн",
    "difficulty": 2,
    "trivia": "Самое молодое признанное государство планеты, получившее независимость в 2011 году.",
    "aliases": [
      "южный судан"
    ]
  },
  {
    "id": "024",
    "name": "Ангола",
    "nameEn": "Angola",
    "capital": "Луанда",
    "capitalEn": "Luanda",
    "capitalCoords": [
      13.2343,
      -8.839
    ],
    "continent": "Африка",
    "flag": "🇦🇴",
    "population": "35 млн",
    "difficulty": 2,
    "trivia": "Луанда — крупный порт на Атлантике, основанный португальцами в 1576 году.",
    "aliases": [
      "ангола"
    ]
  },
  {
    "id": "508",
    "name": "Мозамбик",
    "nameEn": "Mozambique",
    "capital": "Мапуту",
    "capitalEn": "Maputo",
    "capitalCoords": [
      32.5732,
      -25.9692
    ],
    "continent": "Африка",
    "flag": "🇲🇿",
    "population": "33 млн",
    "difficulty": 2,
    "trivia": "Железнодорожный вокзал Мапуту спроектирован по чертежам самого Гюстава Эйфеля.",
    "aliases": [
      "мозамбик"
    ]
  },
  {
    "id": "894",
    "name": "Замбия",
    "nameEn": "Zambia",
    "capital": "Лусака",
    "capitalEn": "Lusaka",
    "capitalCoords": [
      28.3228,
      -15.3875
    ],
    "continent": "Африка",
    "flag": "🇿🇲",
    "population": "20 млн",
    "difficulty": 2,
    "trivia": "На границе Замбии и Зимбабве гремит грандиозный водопад Виктория шириной 1,7 км.",
    "aliases": [
      "замбия"
    ]
  },
  {
    "id": "716",
    "name": "Зимбабве",
    "nameEn": "Zimbabwe",
    "capital": "Хараре",
    "capitalEn": "Harare",
    "capitalCoords": [
      31.053,
      -17.8252
    ],
    "continent": "Африка",
    "flag": "🇿🇼",
    "population": "16 млн",
    "difficulty": 2,
    "trivia": "Хараре называют «Цветущим городом» за тысячи деревьев жакаранды, цветущих фиолетовым весной.",
    "aliases": [
      "зимбабве"
    ]
  },
  {
    "id": "516",
    "name": "Намибия",
    "nameEn": "Namibia",
    "capital": "Виндхук",
    "capitalEn": "Windhoek",
    "capitalCoords": [
      17.0658,
      -22.5609
    ],
    "continent": "Африка",
    "flag": "🇳🇦",
    "population": "2.6 млн",
    "difficulty": 2,
    "trivia": "Пустыня Намиб считается древнейшей на Земле — пескам здесь более 55 миллионов лет.",
    "aliases": [
      "намибия"
    ]
  },
  {
    "id": "072",
    "name": "Ботсвана",
    "nameEn": "Botswana",
    "capital": "Габороне",
    "capitalEn": "Gaborone",
    "capitalCoords": [
      25.9231,
      -24.6282
    ],
    "continent": "Африка",
    "flag": "🇧🇼",
    "population": "2.6 млн",
    "difficulty": 2,
    "trivia": "В Ботсване обитает крупнейшая популяция диких африканских слонов на планете.",
    "aliases": [
      "ботсвана"
    ]
  },
  {
    "id": "450",
    "name": "Мадагаскар",
    "nameEn": "Madagascar",
    "capital": "Антананариву",
    "capitalEn": "Antananarivo",
    "capitalCoords": [
      47.5079,
      -18.8792
    ],
    "continent": "Африка",
    "flag": "🇲🇬",
    "population": "29 млн",
    "difficulty": 2,
    "trivia": "Четвертый по величине остров планеты, более 90% флоры и фауны которого эндемичны.",
    "aliases": [
      "мадагаскар"
    ]
  },
  {
    "id": "120",
    "name": "Камерун",
    "nameEn": "Cameroon",
    "capital": "Яунде",
    "capitalEn": "Yaounde",
    "capitalCoords": [
      11.5021,
      3.848
    ],
    "continent": "Африка",
    "flag": "🇨🇲",
    "population": "28 млн",
    "difficulty": 2,
    "trivia": "Камерун называют «Африкой в миниатюре» за потрясающее разнообразие климатических зон.",
    "aliases": [
      "камерун"
    ]
  },
  {
    "id": "266",
    "name": "Габон",
    "nameEn": "Gabon",
    "capital": "Либревиль",
    "capitalEn": "Libreville",
    "capitalCoords": [
      9.4673,
      0.4162
    ],
    "continent": "Африка",
    "flag": "🇬🇦",
    "population": "2.4 млн",
    "difficulty": 3,
    "trivia": "Либревиль («Свободный город») был основан в 1849 году освобожденными рабами.",
    "aliases": [
      "габон"
    ]
  },
  {
    "id": "226",
    "name": "Экваториальная Гвинея",
    "nameEn": "Eq. Guinea",
    "capital": "Малабо",
    "capitalEn": "Malabo",
    "capitalCoords": [
      8.7832,
      3.7504
    ],
    "continent": "Африка",
    "flag": "🇬🇶",
    "population": "1.6 млн",
    "difficulty": 3,
    "trivia": "Столица Малабо расположена на острове Биоко в Гвинейском заливе, а не на материке.",
    "aliases": [
      "экваториальная гвинея"
    ]
  },
  {
    "id": "148",
    "name": "Чад",
    "nameEn": "Chad",
    "capital": "Нджамена",
    "capitalEn": "N'Djamena",
    "capitalCoords": [
      15.0444,
      12.1348
    ],
    "continent": "Африка",
    "flag": "🇹🇩",
    "population": "18 млн",
    "difficulty": 2,
    "trivia": "Страна названа по бессточному озеру Чад, которое в сезон дождей увеличивается в разы.",
    "aliases": [
      "чад"
    ]
  },
  {
    "id": "562",
    "name": "Нигер",
    "nameEn": "Niger",
    "capital": "Ниамей",
    "capitalEn": "Niamey",
    "capitalCoords": [
      2.1254,
      13.5116
    ],
    "continent": "Африка",
    "flag": "🇳🇪",
    "population": "26 млн",
    "difficulty": 2,
    "trivia": "Ниамей расположен на берегах реки Нигер, дающей жизнь среди безводной Сахары.",
    "aliases": [
      "нигер"
    ]
  },
  {
    "id": "466",
    "name": "Мали",
    "nameEn": "Mali",
    "capital": "Бамако",
    "capitalEn": "Bamako",
    "capitalCoords": [
      -8.0029,
      12.6392
    ],
    "continent": "Африка",
    "flag": "🇲🇱",
    "population": "22 млн",
    "difficulty": 2,
    "trivia": "В Мали находится легендарный средневековый город Тимбукту и мечеть Дженне из глины.",
    "aliases": [
      "мали"
    ]
  },
  {
    "id": "478",
    "name": "Мавритания",
    "nameEn": "Mauritania",
    "capital": "Нуакшот",
    "capitalEn": "Nouakchott",
    "capitalCoords": [
      -15.9785,
      18.0735
    ],
    "continent": "Африка",
    "flag": "🇲🇷",
    "population": "4.8 млн",
    "difficulty": 3,
    "trivia": "Нуакшот вырос из маленькой рыбацкой деревни на краю Сахары в город-миллионник.",
    "aliases": [
      "мавритания"
    ]
  },
  {
    "id": "686",
    "name": "Сенегал",
    "nameEn": "Senegal",
    "capital": "Дакар",
    "capitalEn": "Dakar",
    "capitalCoords": [
      -17.4441,
      14.7167
    ],
    "continent": "Африка",
    "flag": "🇸🇳",
    "population": "17 млн",
    "difficulty": 1,
    "trivia": "Дакар расположен на полуострове Зеленый Мыс — самой западной точке Африканского материка.",
    "aliases": [
      "сенегал"
    ]
  },
  {
    "id": "270",
    "name": "Гамбия",
    "nameEn": "Gambia",
    "capital": "Банжул",
    "capitalEn": "Banjul",
    "capitalCoords": [
      -16.579,
      13.4549
    ],
    "continent": "Африка",
    "flag": "🇬🇲",
    "population": "2.7 млн",
    "difficulty": 2,
    "trivia": "Самая маленькая страна на Африканском континенте, вытянутая узкой полосой вдоль реки Гамбия.",
    "aliases": [
      "гамбия"
    ]
  },
  {
    "id": "324",
    "name": "Гвинея",
    "nameEn": "Guinea",
    "capital": "Конакри",
    "capitalEn": "Conakry",
    "capitalCoords": [
      -13.6773,
      9.6412
    ],
    "continent": "Африка",
    "flag": "🇬🇳",
    "population": "14 млн",
    "difficulty": 2,
    "trivia": "Гвинея обладает крупнейшими в мире доказанными запасами бокситов (алюминиевой руды).",
    "aliases": [
      "гвинея"
    ]
  },
  {
    "id": "624",
    "name": "Гвинея-Бисау",
    "nameEn": "Guinea-Bissau",
    "capital": "Бисау",
    "capitalEn": "Bissau",
    "capitalCoords": [
      -15.5984,
      11.8632
    ],
    "continent": "Африка",
    "flag": "🇬🇼",
    "population": "2.1 млн",
    "difficulty": 3,
    "trivia": "В состав страны входит живописный архипелаг Бижагош из 88 островов в Атлантике.",
    "aliases": [
      "гвинея-бисау"
    ]
  },
  {
    "id": "694",
    "name": "Сьерра-Леоне",
    "nameEn": "Sierra Leone",
    "capital": "Фритаун",
    "capitalEn": "Freetown",
    "capitalCoords": [
      -13.2317,
      8.4844
    ],
    "continent": "Африка",
    "flag": "🇸🇱",
    "population": "8.6 млн",
    "difficulty": 3,
    "trivia": "Фритаун («Свободный город») основан в 1792 году британскими аболиционистами.",
    "aliases": [
      "сьерра-леоне"
    ]
  },
  {
    "id": "430",
    "name": "Либерия",
    "nameEn": "Liberia",
    "capital": "Монровия",
    "capitalEn": "Monrovia",
    "capitalCoords": [
      -10.7969,
      6.3156
    ],
    "continent": "Африка",
    "flag": "🇱🇷",
    "population": "5.3 млн",
    "difficulty": 3,
    "trivia": "Монровия названа в честь 5-го президента США Джеймса Монро.",
    "aliases": [
      "либерия"
    ]
  },
  {
    "id": "384",
    "name": "Кот-д'Ивуар",
    "nameEn": "Côte d'Ivoire",
    "capital": "Ямусукро",
    "capitalEn": "Yamoussoukro",
    "capitalCoords": [
      -5.2767,
      6.8276
    ],
    "continent": "Африка",
    "flag": "🇨🇮",
    "population": "29 млн",
    "difficulty": 2,
    "trivia": "В Ямусукро возведена базилика Нотр-Дам-де-ла-Пе — крупнейшая христианская церковь в мире.",
    "aliases": [
      "кот-д'ивуар",
      "берег слоновой кости"
    ]
  },
  {
    "id": "288",
    "name": "Гана",
    "nameEn": "Ghana",
    "capital": "Аккра",
    "capitalEn": "Accra",
    "capitalCoords": [
      -0.187,
      5.6037
    ],
    "continent": "Африка",
    "flag": "🇬🇭",
    "population": "33 млн",
    "difficulty": 2,
    "trivia": "Первая страна Черной Африки, получившая независимость от колониальных держав (в 1957 году).",
    "aliases": [
      "гана"
    ]
  },
  {
    "id": "768",
    "name": "Того",
    "nameEn": "Togo",
    "capital": "Ломе",
    "capitalEn": "Lome",
    "capitalCoords": [
      1.2167,
      6.1375
    ],
    "continent": "Африка",
    "flag": "🇹🇬",
    "population": "8.8 млн",
    "difficulty": 3,
    "trivia": "Столица Ломе расположена прямо на побережье Гвинейского залива и на границе с Ганой.",
    "aliases": [
      "того"
    ]
  },
  {
    "id": "204",
    "name": "Бенин",
    "nameEn": "Benin",
    "capital": "Порто-Ново",
    "capitalEn": "Porto-Novo",
    "capitalCoords": [
      2.6036,
      6.4969
    ],
    "continent": "Африка",
    "flag": "🇧🇯",
    "population": "13 млн",
    "difficulty": 3,
    "trivia": "Официальная столица — Порто-Ново, а правительство страны фактически находится в Котону.",
    "aliases": [
      "бенин"
    ]
  },
  {
    "id": "854",
    "name": "Буркина-Фасо",
    "nameEn": "Burkina Faso",
    "capital": "Уагадугу",
    "capitalEn": "Ouagadougou",
    "capitalCoords": [
      -1.5197,
      12.3714
    ],
    "continent": "Африка",
    "flag": "🇧🇫",
    "population": "22 млн",
    "difficulty": 2,
    "trivia": "Название переводится как «Родина честных людей», а Уагадугу — крупнейший культурный центр Сахеля.",
    "aliases": [
      "буркина-фасо",
      "верхняя вольта"
    ]
  },
  {
    "id": "140",
    "name": "ЦАР",
    "nameEn": "Central African Rep.",
    "capital": "Банги",
    "capitalEn": "Bangui",
    "capitalCoords": [
      18.5582,
      4.3947
    ],
    "continent": "Африка",
    "flag": "🇨🇫",
    "population": "5.5 млн",
    "difficulty": 3,
    "trivia": "Центральноафриканская Республика лежит прямо в сердце континента, столица Банги стоит на реке Убанги.",
    "aliases": [
      "цар",
      "центральноафриканская республика"
    ]
  },
  {
    "id": "800",
    "name": "Уганда",
    "nameEn": "Uganda",
    "capital": "Кампала",
    "capitalEn": "Kampala",
    "capitalCoords": [
      32.5825,
      0.3476
    ],
    "continent": "Африка",
    "flag": "🇺🇬",
    "population": "47 млн",
    "difficulty": 2,
    "trivia": "Уинстон Черчилль назвал Уганду «Жемчужиной Африки» за ее пышную вечнозеленую природу.",
    "aliases": [
      "уганда"
    ]
  },
  {
    "id": "646",
    "name": "Руанда",
    "nameEn": "Rwanda",
    "capital": "Кигали",
    "capitalEn": "Kigali",
    "capitalCoords": [
      30.0619,
      -1.9706
    ],
    "continent": "Африка",
    "flag": "🇷🇼",
    "population": "14 млн",
    "difficulty": 2,
    "trivia": "Руанду называют «Страной тысячи холмов», а Кигали признан одним из чистейших городов континента.",
    "aliases": [
      "руанда"
    ]
  },
  {
    "id": "108",
    "name": "Бурунди",
    "nameEn": "Burundi",
    "capital": "Гитега",
    "capitalEn": "Gitega",
    "capitalCoords": [
      29.9278,
      -3.4264
    ],
    "continent": "Африка",
    "flag": "🇧🇮",
    "population": "13 млн",
    "difficulty": 3,
    "trivia": "Гитега стала столицей в 2019 году, сменив прежнюю столицу на озере Танганьика — Бужумбуру.",
    "aliases": [
      "бурунди"
    ]
  },
  {
    "id": "706",
    "name": "Сомали",
    "nameEn": "Somalia",
    "capital": "Могадишо",
    "capitalEn": "Mogadishu",
    "capitalCoords": [
      45.3182,
      2.0469
    ],
    "continent": "Африка",
    "flag": "🇸🇴",
    "population": "18 млн",
    "difficulty": 2,
    "trivia": "Сомали обладает самой протяженной береговой линией среди всех стран континентальной Африки (3333 км).",
    "aliases": [
      "сомали"
    ]
  },
  {
    "id": "262",
    "name": "Джибути",
    "nameEn": "Djibouti",
    "capital": "Джибути",
    "capitalEn": "Djibouti",
    "capitalCoords": [
      43.1456,
      11.5721
    ],
    "continent": "Африка",
    "flag": "🇩🇯",
    "population": "1.1 млн",
    "difficulty": 2,
    "trivia": "Стратегический порт в Баб-эль-Мандебском проливе, соединяющем Красное море и Индийский океан.",
    "aliases": [
      "джибути"
    ]
  },
  {
    "id": "232",
    "name": "Эритрея",
    "nameEn": "Eritrea",
    "capital": "Асмэра",
    "capitalEn": "Asmara",
    "capitalCoords": [
      38.9251,
      15.3229
    ],
    "continent": "Африка",
    "flag": "🇪🇷",
    "population": "3.6 млн",
    "difficulty": 3,
    "trivia": "Асмэра целиком внесена в список ЮНЕСКО за уникальную модернистскую итальянскую архитектуру 1930-х годов.",
    "aliases": [
      "эритрея"
    ]
  },
  {
    "id": "454",
    "name": "Малави",
    "nameEn": "Malawi",
    "capital": "Лилонгве",
    "capitalEn": "Lilongwe",
    "capitalCoords": [
      33.7741,
      -13.9626
    ],
    "continent": "Африка",
    "flag": "🇲🇼",
    "population": "20 млн",
    "difficulty": 3,
    "trivia": "Озеро Малави (Ньяса) содержит больше видов тропических рыб-цихлид, чем любое другое озеро мира.",
    "aliases": [
      "малави"
    ]
  },
  {
    "id": "426",
    "name": "Лесото",
    "nameEn": "Lesotho",
    "capital": "Масеру",
    "capitalEn": "Maseru",
    "capitalCoords": [
      27.4833,
      -29.3167
    ],
    "continent": "Африка",
    "flag": "🇱🇸",
    "population": "2.3 млн",
    "difficulty": 3,
    "trivia": "Единственное в мире суверенное государство, вся территория которого лежит выше 1400 метров.",
    "aliases": [
      "лесото"
    ]
  },
  {
    "id": "748",
    "name": "Эсватини",
    "nameEn": "eSwatini",
    "capital": "Мбабане",
    "capitalEn": "Mbabane",
    "capitalCoords": [
      31.1333,
      -26.3167
    ],
    "continent": "Африка",
    "flag": "🇸🇿",
    "population": "1.2 млн",
    "difficulty": 3,
    "trivia": "До 2018 года королевство официально называлось Свазиленд, монарх правит совместно с королевой-матерью.",
    "aliases": [
      "эсватини",
      "свазиленд"
    ]
  },
  {
    "id": "732",
    "name": "Западная Сахара",
    "nameEn": "W. Sahara",
    "capital": "Эль-Аюн",
    "capitalEn": "El Aaiun",
    "capitalCoords": [
      -13.2033,
      27.1536
    ],
    "continent": "Африка",
    "flag": "🇪🇭",
    "population": "600 тыс",
    "difficulty": 3,
    "trivia": "Спорная территория на атлантическом побережье северо-западной Африки, богатая запасами фосфоритов.",
    "aliases": [
      "западная сахара"
    ]
  },
  {
    "id": "036",
    "name": "Австралия",
    "nameEn": "Australia",
    "capital": "Канберра",
    "capitalEn": "Canberra",
    "capitalCoords": [
      149.13,
      -35.2809
    ],
    "continent": "Океания",
    "flag": "🇦🇺",
    "population": "26 млн",
    "difficulty": 1,
    "trivia": "Канберра была специально построена в качестве компромисса между двумя соперничавшими городами — Сиднеем и Мельбурном.",
    "aliases": [
      "австралия"
    ]
  },
  {
    "id": "554",
    "name": "Новая Зеландия",
    "nameEn": "New Zealand",
    "capital": "Веллингтон",
    "capitalEn": "Wellington",
    "capitalCoords": [
      174.7762,
      -41.2865
    ],
    "continent": "Океания",
    "flag": "🇳🇿",
    "population": "5.2 млн",
    "difficulty": 1,
    "trivia": "Веллингтон — самая южная столица суверенного государства на Земле.",
    "aliases": [
      "новая зеландия"
    ]
  },
  {
    "id": "598",
    "name": "Папуа — Новая Гвинея",
    "nameEn": "Papua New Guinea",
    "capital": "Порт-Морсби",
    "capitalEn": "Port Moresby",
    "capitalCoords": [
      147.1803,
      -9.4438
    ],
    "continent": "Океания",
    "flag": "🇵🇬",
    "population": "10 млн",
    "difficulty": 2,
    "trivia": "Самая лингвистически разнообразная страна планеты — здесь говорят более чем на 850 коренных языках.",
    "aliases": [
      "папуа",
      "папуа новая гвинея",
      "пнг"
    ]
  },
  {
    "id": "242",
    "name": "Фиджи",
    "nameEn": "Fiji",
    "capital": "Сува",
    "capitalEn": "Suva",
    "capitalCoords": [
      178.4419,
      -18.1248
    ],
    "continent": "Океания",
    "flag": "🇫🇯",
    "population": "930 тыс",
    "difficulty": 2,
    "trivia": "Через Фиджи проходит 180-й меридиан (Линия перемены дат), столица Сува расположена на острове Вити-Леву.",
    "aliases": [
      "фиджи"
    ]
  },
  {
    "id": "090",
    "name": "Соломоновы Острова",
    "nameEn": "Solomon Is.",
    "capital": "Хониара",
    "capitalEn": "Honiara",
    "capitalCoords": [
      159.9498,
      -9.4456
    ],
    "continent": "Океания",
    "flag": "🇸🇧",
    "population": "720 тыс",
    "difficulty": 3,
    "trivia": "Хониара расположена на острове Гуадалканал, знаменитом решающими битвами на Тихом океане в 1942 году.",
    "aliases": [
      "соломоновы острова"
    ]
  },
  {
    "id": "548",
    "name": "Вануату",
    "nameEn": "Vanuatu",
    "capital": "Порт-Вила",
    "capitalEn": "Port Vila",
    "capitalCoords": [
      168.3273,
      -17.7333
    ],
    "continent": "Океания",
    "flag": "🇻🇺",
    "population": "330 тыс",
    "difficulty": 3,
    "trivia": "На острове Пятидесятницы в Вануату зародился тарзанковый прыжок (банджи-джампинг) как древний ритуал плодородия.",
    "aliases": [
      "вануату"
    ]
  },
  {
    "id": "540",
    "name": "Новая Каледония",
    "nameEn": "New Caledonia",
    "capital": "Нумеа",
    "capitalEn": "Noumea",
    "capitalCoords": [
      166.4572,
      -22.2758
    ],
    "continent": "Океания",
    "flag": "🇳🇨",
    "population": "270 тыс",
    "difficulty": 3,
    "trivia": "Особое заморское территориальное образование Франции, лагуна вокруг острова — одна из крупнейших коралловых в мире.",
    "aliases": [
      "новая каледония"
    ]
  },
  {
    "id": "010",
    "name": "Антарктида",
    "nameEn": "Antarctica",
    "capital": "Станция «Восток»",
    "capitalEn": "Vostok Station",
    "capitalCoords": [
      106.8373,
      -78.4644
    ],
    "continent": "Океания",
    "flag": "🇦🇶",
    "population": "1-4 тыс",
    "difficulty": 3,
    "trivia": "Шестой континент Земли, на станции «Восток» зафиксирована абсолютная рекордно низкая температура: −89,2 °C.",
    "aliases": [
      "антарктида",
      "антарктика"
    ]
  },
  {
    "id": "260",
    "name": "Французские Южные территории",
    "nameEn": "Fr. S. Antarctic Lands",
    "capital": "Порт-о-Франсе",
    "capitalEn": "Port-aux-Francais",
    "capitalCoords": [
      70.2186,
      -49.3503
    ],
    "continent": "Африка",
    "flag": "🇹🇫",
    "population": "200 чел",
    "difficulty": 3,
    "trivia": "Заморское административное образование Франции, включающее вулканические острова Кергелен и Крозе.",
    "aliases": [
      "французские южные территории",
      "кергелен"
    ]
  }
];

export const COUNTRIES_BY_ID: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((country) => [country.id, country])
);

export const CONTINENTS = ['Все', 'Европа', 'Азия', 'Африка', 'Америка', 'Океания'] as const;
export type ContinentFilter = (typeof CONTINENTS)[number];

/**
 * Нормализация русского текста для проверки ответа пользователя
 */
export function normalizeRussian(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ё]/g, 'е')
    .replace(/[^a-zа-я0-9]/g, '')
    .trim();
}

/**
 * Проверка правильности введенного пользователем ответа
 */
export function checkAnswerRussian(
  userInput: string,
  target: Country,
  mode: 'DIRECT' | 'REVERSE'
): boolean {
  const normalizedUser = normalizeRussian(userInput);
  if (!normalizedUser) return false;

  if (mode === 'DIRECT') {
    // Прямой режим: был вопрос про столицу, пользователь отвечает название страны
    const normalizedTargetName = normalizeRussian(target.name);
    const normalizedTargetEn = normalizeRussian(target.nameEn);
    if (normalizedUser === normalizedTargetName || normalizedUser === normalizedTargetEn) {
      return true;
    }
    // Проверка псевдонимов
    return target.aliases.some((alias) => normalizeRussian(alias) === normalizedUser);
  } else {
    // Обратный режим: был вопрос про страну, пользователь отвечает столицу
    const normalizedTargetCapital = normalizeRussian(target.capital);
    const normalizedTargetCapitalEn = normalizeRussian(target.capitalEn);
    if (normalizedUser === normalizedTargetCapital || normalizedUser === normalizedTargetCapitalEn) {
      return true;
    }
    // Проверка совпадения без приставок
    if (normalizedUser.includes(normalizedTargetCapital) || normalizedTargetCapital.includes(normalizedUser)) {
      if (normalizedUser.length >= 3 && Math.abs(normalizedUser.length - normalizedTargetCapital.length) <= 2) {
        return true;
      }
    }
    return false;
  }
}

/**
 * Генерация вариантов ответа (3 или 5)
 */
export function generateOptions(
  correctCountry: Country,
  mode: 'DIRECT' | 'REVERSE',
  optionCount: number = 3
): { id: string; label: string; isCorrect: boolean }[] {
  // Выбираем похожие страны (желательно из того же континента)
  const poolSame = COUNTRIES.filter(
    (c) => c.continent === correctCountry.continent && c.id !== correctCountry.id
  );
  const poolOther = COUNTRIES.filter(
    (c) => c.continent !== correctCountry.continent && c.id !== correctCountry.id
  );

  const shuffledSame = [...poolSame].sort(() => Math.random() - 0.5);
  const shuffledOther = [...poolOther].sort(() => Math.random() - 0.5);
  const distractors = [...shuffledSame, ...shuffledOther].slice(0, optionCount - 1);

  const choices = [correctCountry, ...distractors].sort(() => Math.random() - 0.5);

  return choices.map((c) => {
    const isCorrect = c.id === correctCountry.id;
    const label =
      mode === 'DIRECT'
        ? `${c.flag} ${c.name}` // Пользователь выбирает страну
        : c.capital; // Пользователь выбирает столицу
    return {
      id: c.id,
      label,
      isCorrect,
    };
  });
}
