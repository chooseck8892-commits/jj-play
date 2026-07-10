/* G4 故障討伐｜故障設備怪資料（產品照裁自 WALRUS 原廠教材） */
/* zone: home 住宅區 | farm 農田區 | factory 工廠區 | tower 大樓區 */
/* actions：ok=正解（造成傷害），其餘會被反擊。note = 教學說明 */

const MONSTERS = [
  {
    id: "leaky", zone: "home", hp: 60,
    name: "滴水不停的加壓機", img: "../assets/img/models/tp8.webp",
    intro: "「半夜滴滴答答，全家睡不著！它在軸心附近滲水……」",
    actions: [
      { t: "更換機械軸封", ok: true, dmg: 35, note: "軸封老化正是軸心漏水主因，換新立刻止漏！" },
      { t: "用布把它包起來", hurt: 12, note: "包起來只是眼不見為淨，水照漏，還會悶壞馬達！" },
      { t: "加潤滑油", hurt: 10, note: "漏水不是缺油，亂加油只會弄髒水路！" },
      { t: "把水壓調更大", hurt: 15, note: "壓力加大，漏得更兇！反被噴一臉。" }
    ],
    catchQuote: "「軸封一換，服服貼貼。收工！」"
  },
  {
    id: "screamer", zone: "home", hp: 70,
    name: "夜半怪叫的抽水機", img: "../assets/img/models/gq.webp",
    intro: "「嘎嘎嘎——像貓頭鷹在叫，鄰居都來抗議了！」",
    actions: [
      { t: "檢查軸承與葉輪異物", ok: true, dmg: 35, note: "軸承磨損、葉輪卡異物是異音兩大元凶，清完就安靜！" },
      { t: "音樂開更大聲蓋過去", hurt: 10, note: "蓋得住耳朵，蓋不住故障。它越叫越大聲！" },
      { t: "拿鎚子敲兩下", hurt: 15, note: "敲下去外殼裂了！維修變換新，錢包受重傷。" },
      { t: "斷水器關小一點", hurt: 10, note: "進水變小反而容易空轉，叫得更慘！" }
    ],
    catchQuote: "「異物一清、軸承一換，安靜得像圖書館。」"
  },
  {
    id: "dryrun", zone: "farm", hp: 65,
    name: "空轉冒煙的抽水機", img: "../assets/img/models/tp3.webp",
    intro: "「田裡等著灌溉，它卻空轉發燙、一滴水都抽不上來！」",
    actions: [
      { t: "斷電引水、檢查底閥", ok: true, dmg: 35, note: "腔內沒水就是空轉，先斷電、灌滿引水，底閥漏了就換！" },
      { t: "讓它繼續轉，等水自己來", hurt: 18, note: "空轉會燒毀機械軸封！等下去直接報廢。" },
      { t: "澆水幫它降溫", hurt: 15, note: "馬達澆水？觸電加短路，雙倍傷害！" },
      { t: "換更大的馬達", hurt: 10, note: "問題在引水不在馬力，換大台一樣空轉！" }
    ],
    catchQuote: "「引水滿、底閥緊，田裡的水嘩啦啦。」"
  },
  {
    id: "fever", zone: "factory", hp: 80,
    name: "高燒燙手的泵浦", img: "../assets/img/models/wq.webp",
    intro: "「產線正忙，它卻燙得能煎蛋，還飄出焦味！」",
    actions: [
      { t: "立即斷電，查散熱與電壓", ok: true, dmg: 40, note: "先斷電防火災！再查風扇散熱、電壓是否過低過高。" },
      { t: "拿電扇對著吹", hurt: 12, note: "外面吹風，裡面照燒。治標不治本！" },
      { t: "繼續硬撐到下班", hurt: 20, note: "線圈燒毀＋產線停擺，老闆臉都綠了！" },
      { t: "澆冷水急救", hurt: 18, note: "高溫金屬遇冷水會變形，還可能觸電！" }
    ],
    catchQuote: "「斷電、查風扇、量電壓——三步降火，專業！」"
  },
  {
    id: "jumpy", zone: "tower", hp: 70,
    name: "壓力狂飆亂跳的加壓機", img: "../assets/img/models/tq.webp",
    intro: "「洗澡水忽冷忽熱，住戶抓狂！它的壓力表像心電圖。」",
    actions: [
      { t: "檢查壓力桶空氣量", ok: true, dmg: 35, note: "壓力桶沒氣就失去緩衝，補氣或換桶，壓力立穩！" },
      { t: "把開關全拆掉", hurt: 15, note: "拆掉保護開關？馬達直接過勞死給你看！" },
      { t: "請住戶忍耐一下", hurt: 10, note: "忍耐解決不了故障，客訴電話被打爆！" },
      { t: "水管綁緊一點", hurt: 10, note: "跟管子沒關係啦！壓力源頭在桶子。" }
    ],
    catchQuote: "「桶內有氣，水壓有底氣。」"
  },
  {
    id: "restless", zone: "tower", hp: 90,
    name: "頻繁啟停的恆壓系統", img: "../assets/img/models/waic.webp",
    intro: "「大樓機房裡它每分鐘起停十幾次，電表轉得比它還快！」",
    actions: [
      { t: "查管路洩漏與壓力桶", ok: true, dmg: 45, note: "微漏水讓壓力一直掉，泵浦被迫一直起動。抓漏＋補氣，根治！" },
      { t: "把它關掉省電", hurt: 15, note: "全棟沒水，管委會直接殺到機房！" },
      { t: "調高啟動壓力", hurt: 12, note: "沒抓漏就調壓力，起停照樣頻繁！" },
      { t: "多裝一台輪流跑", hurt: 10, note: "漏水不抓，兩台一起短命，加倍燒錢！" }
    ],
    catchQuote: "「抓到漏點，整棟大樓都安靜了。智慧系統值得智慧維修！」"
  }
];

const ZONES = {
  home:    { name: "住宅區", emo: "🏠", tile: "#2d4a35" },
  farm:    { name: "農田區", emo: "🌾", tile: "#4a4526" },
  factory: { name: "工廠區", emo: "🏭", tile: "#3d3244" },
  tower:   { name: "大樓區", emo: "🏢", tile: "#2b3d52" }
};
