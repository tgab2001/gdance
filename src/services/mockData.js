// Initial rich mock data for G Dance Dance Studio & Community Platform

export const initialUsers = [
  {
    id: "usr_admin_1",
    email: "admin@gdance.hu",
    name: "Kovács Zoltán",
    nickname: "Zoli Mester",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    phone: "+36 30 123 4567",
    groupIds: ["grp_gforce", "grp_junior", "grp_mini"],
    groupNames: ["G-Force Felnőtt", "Junior Elite", "Mini Stars"],
    ageGroup: "Felnőtt (30+)",
    joinedDate: "2018-09-01",
    membershipActive: true,
    attendanceRate: 98,
    bio: "Alapító és művészeti vezető, 3x magyar bajnok koreográfus."
  },
  {
    id: "usr_instructor_1",
    email: "viki@gdance.hu",
    name: "Nagy Viktória",
    nickname: "Viki",
    role: "instructor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    phone: "+36 20 987 6543",
    groupIds: ["grp_gforce", "grp_junior"],
    groupNames: ["G-Force Felnőtt", "Junior Elite"],
    ageGroup: "Felnőtt (27)",
    joinedDate: "2020-02-15",
    membershipActive: true,
    attendanceRate: 96,
    bio: "Vezető koreográfus, a Magyar Táncművészeti Egyetem végzett növendéke."
  },
  {
    id: "usr_dancer_1",
    email: "anna@gdance.hu",
    name: "Tóth Anna",
    nickname: "Panna",
    role: "dancer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    phone: "+36 70 333 4455",
    groupIds: ["grp_gforce"],
    groupNames: ["G-Force Felnőtt"],
    ageGroup: "18-25 év",
    joinedDate: "2022-09-10",
    membershipActive: true,
    attendanceRate: 94,
    emergencyContact: "Tóth Gábor (Apa) - +36 30 555 1234",
    bio: "Fő táncstílusom a contemporary és experimental hip-hop."
  },
  {
    id: "usr_parent_1",
    email: "szulo@gdance.hu",
    name: "Kiss Beatrix",
    nickname: "Bea",
    role: "parent",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    phone: "+36 30 777 8899",
    groupIds: ["grp_mini"],
    groupNames: ["Mini Stars"],
    ageGroup: "Szülő",
    joinedDate: "2023-01-12",
    membershipActive: true,
    attendanceRate: 100,
    childrenUserIds: ["usr_dancer_child_1"],
    children: [
      {
        id: "usr_dancer_child_1",
        name: "Kiss Lili",
        nickname: "Lili",
        group: "Mini Stars",
        groupId: "grp_mini",
        attendanceRate: 91,
        age: 8
      }
    ]
  }
];

export const initialGroups = [
  {
    id: "grp_gforce",
    name: "G-Force Felnőtt Versenyző",
    category: "Profi Versenyző",
    ageRange: "16+ év",
    instructor: "Kovács Zoltán & Nagy Viktória",
    instructorId: "usr_instructor_1",
    scheduleDescription: "Kedd: 18:00 - 20:00 | Csütörtök: 18:00 - 20:30 | Szombat: 10:00 - 13:00",
    memberCount: 18,
    description: "Az iskola elit versenycsapata, országos és nemzetközi versenyek állandó dobogós formációja.",
    image: "/images/crew-stage.jpg",
    tags: ["Hip-Hop", "Urban Dance", "Versenycsapat"]
  },
  {
    id: "grp_junior",
    name: "Junior Modern Elite",
    category: "Junior Versenyző",
    ageRange: "11-15 év",
    instructor: "Nagy Viktória",
    instructorId: "usr_instructor_1",
    scheduleDescription: "Hétfő: 16:30 - 18:00 | Szerda: 16:30 - 18:00 | Péntek: 17:00 - 19:00",
    memberCount: 16,
    description: "Kortárs és modern tánctechnikák, hajlítások, forgások, akrobatikus elemek és színpadi jelenlét fejlesztése.",
    image: "/images/hero-dancer.jpg",
    tags: ["Kortárs", "Modern", "Koreográfia"]
  },
  {
    id: "grp_mini",
    name: "Mini Stars Gyerek Tánccsoport",
    category: "Gyermek",
    ageRange: "6-10 év",
    instructor: "Szabó Eszter",
    instructorId: "usr_instructor_2",
    scheduleDescription: "Kedd: 16:30 - 17:30 | Csütörtök: 16:30 - 17:30",
    memberCount: 14,
    description: "Játékos ritmuskészség fejlesztés, zenei érzékenység és alap hip-hop mozgáselemek a legfiatalabb tehetségeknek.",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&auto=format&fit=crop&q=80",
    tags: ["Gyermek", "Ritmus", "Alapozó"]
  },
  {
    id: "grp_beginner",
    name: "Kezdő Showtánc & Girly Hip-Hop",
    category: "Hobbi Táncos",
    ageRange: "16+ év",
    instructor: "Balogh Márk",
    instructorId: "usr_instructor_3",
    scheduleDescription: "Hétfő: 19:00 - 20:30 | Péntek: 18:30 - 20:00",
    memberCount: 22,
    description: "Felszabadító táncórák mindenkinek, aki szeretné fejleszteni az önbizalmát, állóképességét és ritmusérzékét.",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    tags: ["Hobbi", "Felnőtt", "Girly Style"]
  }
];

export const initialTrainings = [
  {
    id: "trn_101",
    title: "G-Force Főpróba & Kondicionálás",
    groupId: "grp_gforce",
    groupName: "G-Force Felnőtt Versenyző",
    instructor: "Kovács Zoltán",
    instructorId: "usr_admin_1",
    date: "2026-10-22",
    startTime: "18:00",
    endTime: "20:30",
    location: "A Terem - Tükrös Főstúdió (Bp. V. kerület)",
    notes: "Kérünk mindenkit, hozza a fekete melegítőt és fellépő cipőt! Formáció pontozás lesz.",
    status: "upcoming"
  },
  {
    id: "trn_102",
    title: "Junior Modern Technika & Forgások",
    groupId: "grp_junior",
    groupName: "Junior Modern Elite",
    instructor: "Nagy Viktória",
    instructorId: "usr_instructor_1",
    date: "2026-10-23",
    startTime: "16:30",
    endTime: "18:00",
    location: "B Terem - Balett Terem",
    notes: "Rugalmas talpú zokni vagy balettcipő ajánlott. Nyújtásra 20 percet szánunk az elején.",
    status: "upcoming"
  },
  {
    id: "trn_103",
    title: "Mini Stars Ritmika & Koreó",
    groupId: "grp_mini",
    groupName: "Mini Stars",
    instructor: "Kovács Zoltán",
    instructorId: "usr_admin_1",
    date: "2026-10-24",
    startTime: "16:30",
    endTime: "17:30",
    location: "A Terem - Tükrös Főstúdió",
    notes: "A szülők az utolsó 10 percben bejöhetnek megnézni a heti koreográfiát!",
    status: "upcoming"
  },
  {
    id: "trn_104",
    title: "G-Force Akrobatika & Emelések",
    groupId: "grp_gforce",
    groupName: "G-Force Felnőtt Versenyző",
    instructor: "Nagy Viktória",
    instructorId: "usr_instructor_1",
    date: "2026-10-25",
    startTime: "10:00",
    endTime: "13:00",
    location: "A Terem - Tükrös Főstúdió",
    notes: "Hétvégi intenzív felkészülés a bajnokságra.",
    status: "upcoming"
  }
];

export const initialEvents = [
  {
    id: "evt_201",
    title: "Országos Hip-Hop Bajnokság 2026",
    category: "Verseny",
    date: "2026-11-14",
    time: "09:00 - 19:00",
    location: "Budapest, Tüskecsarnok",
    image: "/images/crew-stage.jpg",
    description: "Az év legnagyobb hazai táncversenye, ahol a G-Force és a Junior Elite is megvédi bajnoki címét. Részletek a menedzsmentnél.",
    affectedGroupIds: ["grp_gforce", "grp_junior"],
    affectedGroups: "G-Force Felnőtt, Junior Elite",
    rsvpDeadLine: "2026-11-01",
    rsvps: {
      "usr_dancer_1": "going",
      "usr_instructor_1": "going"
    }
  },
  {
    id: "evt_202",
    title: "G Dance Téli Gála & Karácsonyi Show",
    category: "Fellépés",
    date: "2026-12-19",
    time: "17:00 - 21:00",
    location: "MOM Kulturális Központ, Budapest",
    image: "/images/hero-dancer.jpg",
    description: "Az akadémia összes csoportja színpadra lép a nagyszabású gálaesten. Vendégünk a Nemzeti Balett szólistája.",
    affectedGroupIds: ["grp_gforce", "grp_junior", "grp_mini", "grp_beginner"],
    affectedGroups: "Minden tánccsoport",
    rsvpDeadLine: "2026-11-20",
    rsvps: {
      "usr_dancer_1": "going",
      "usr_dancer_child_1": "going"
    }
  },
  {
    id: "evt_203",
    title: "Los Angeles Street Mesterkurzus",
    category: "Workshop",
    date: "2026-11-28",
    time: "14:00 - 18:00",
    location: "G Dance Központi Stúdió",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&auto=format&fit=crop&q=80",
    description: "Exkluzív 4 órás kurzus egyenesen Kaliforniából érkező vendégkoreográfussal. Limitált létszám!",
    affectedGroupIds: ["grp_gforce", "grp_junior", "grp_beginner"],
    affectedGroups: "Junior & Felnőtt táncosok",
    rsvpDeadLine: "2026-11-15",
    rsvps: {}
  }
];

export const initialAttendance = {
  "trn_101": [
    { userId: "usr_dancer_1", name: "Tóth Anna", status: "present", notes: "Kiváló forma" },
    { userId: "usr_dancer_2", name: "Molnár Bence", status: "present", notes: "" },
    { userId: "usr_dancer_3", name: "Varga Dóra", status: "excused", notes: "Iskolai vizsga" },
    { userId: "usr_dancer_4", name: "Horváth Kevin", status: "absent", notes: "Nem jelzett előre" }
  ]
};

export const initialNotifications = [
  {
    id: "notif_1",
    title: "Edzésidőpont módosítás csütörtökön",
    message: "A csütörtöki G-Force edzés 18:00 helyett 17:30-kor kezdődik a közelgő verseny miatt.",
    targetType: "group",
    targetGroupId: "grp_gforce",
    createdAt: "2026-10-18T14:30:00Z",
    readBy: ["usr_dancer_1"],
    type: "schedule"
  },
  {
    id: "notif_2",
    title: "Szombaton fellépés a Városligeti Fesztiválon!",
    message: "Gyülekező 13:00-kor a nagyszínpad mögötti sátorban. Kérjük az arany-fekete kosztümöket felvenni.",
    targetType: "all",
    createdAt: "2026-10-17T09:15:00Z",
    readBy: [],
    type: "performance"
  },
  {
    id: "notif_3",
    title: "Új gyakorlóvideó feltöltve a privát videótárba",
    message: "Nézd meg a 3. felvonás szinkronrészletét és gyakorolj otthon a csütörtöki próbára!",
    targetType: "group",
    targetGroupId: "grp_gforce",
    createdAt: "2026-10-16T18:45:00Z",
    readBy: ["usr_dancer_1"],
    type: "video"
  }
];

export const initialGallery = [
  {
    id: "alb_1",
    title: "Országos Hip-Hop Bajnokság Aranyérem",
    category: "Versenyek",
    year: "2026",
    cover: "/images/crew-stage.jpg",
    photoCount: 14,
    photos: [
      { id: "p1", url: "/images/crew-stage.jpg", caption: "G-Force formáció a döntőben - 1. helyezés" },
      { id: "p2", url: "/images/hero-dancer.jpg", caption: "Kortárs szóló ugrás" },
      { id: "p3", url: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&auto=format&fit=crop&q=80", caption: "Színpadi energiák és szurkolótábor" },
      { id: "p4", url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80", caption: "Díjátadó ünnepség" }
    ]
  },
  {
    id: "alb_2",
    title: "Évzáró Táncgála a Nemzeti Táncszínházban",
    category: "Fellépések",
    year: "2025",
    cover: "/images/hero-dancer.jpg",
    photoCount: 22,
    photos: [
      { id: "p5", url: "/images/hero-dancer.jpg", caption: "Fények és mozdulatok a nagyszínpadon" },
      { id: "p6", url: "/images/director.jpg", caption: "Művészeti igazgató megnyitó beszéde" }
    ]
  },
  {
    id: "alb_3",
    title: "Balatonfüredi Intenzív Nyári Tánctábor",
    category: "Táborok",
    year: "2025",
    cover: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&auto=format&fit=crop&q=80",
    photoCount: 30,
    photos: [
      { id: "p7", url: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&auto=format&fit=crop&q=80", caption: "Naplementés edzés a part mellett" }
    ]
  },
  {
    id: "alb_4",
    title: "Kulisszák Mögött & Próbatermi pillanatok",
    category: "Kulisszák mögött",
    year: "2026",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    photoCount: 18,
    photos: [
      { id: "p8", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80", caption: "Koreográfia kidolgozása lépésről lépésre" }
    ]
  }
];

export const initialVideos = [
  {
    id: "vid_1",
    title: "G-Force | 'Gold Reign' Versenykoreográfia 2026",
    category: "Fellépések",
    duration: "3:45",
    isPublic: true,
    thumbnail: "/images/crew-stage.jpg",
    youtubeEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "14.2k",
    description: "A 2026-os Országos Bajnokság aranyérmes fellépése."
  },
  {
    id: "vid_2",
    title: "Lírai Kortárs Szóló - 'Golden Whispers'",
    category: "Koreográfiák",
    duration: "2:50",
    isPublic: true,
    thumbnail: "/images/hero-dancer.jpg",
    youtubeEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "8.5k",
    description: "Koreografálta Nagy Viktória."
  },
  {
    id: "vid_3",
    title: "[TAGOKNAK] Bajnoksági 3. Részlet - Lassított Taktika & Lépések",
    category: "Gyakorlóvideók",
    duration: "12:30",
    isPublic: false,
    thumbnail: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&auto=format&fit=crop&q=80",
    youtubeEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "142",
    description: "Kizárólag G-Force tagoknak! Kérjük a szinkronpontosságot gyakorolni!"
  },
  {
    id: "vid_4",
    title: "[TAGOKNAK] Hip-Hop Isolations & Footwork Mesterkurzus",
    category: "Oktatóvideók",
    duration: "18:15",
    isPublic: false,
    thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80",
    youtubeEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "98",
    description: "Alapozó technikai tréning testrészek függetlenítésére és ritmustartásra."
  }
];

export const initialResults = [
  {
    id: "res_1",
    year: "2026",
    badge: "🥇 1. hely",
    category: "Felnőtt Formáció Hip-Hop",
    competition: "Magyar Látványtánc Bajnokság",
    group: "G-Force Felnőtt",
    details: "100/98 pontszám, a zsűri különdíjával jutalmazva."
  },
  {
    id: "res_2",
    year: "2026",
    badge: "🏆 Grand Prix Különdíj",
    category: "Legjobb Koreográfia Díj",
    competition: "European Dance Open Masters",
    group: "Nagy Viktória & G-Force",
    details: "Az összes nemzetközi induló közül elnyert nagydíj."
  },
  {
    id: "res_3",
    year: "2025",
    badge: "🥈 2. hely",
    category: "Junior Kortárs Csoport",
    competition: "World Dance Trophy - Pula",
    group: "Junior Modern Elite",
    details: "14 nemzetközi csapat között szerzett ezüst minősítés."
  },
  {
    id: "res_4",
    year: "2025",
    badge: "🥇 1. hely",
    category: "Gyerek Duó Streetdance",
    competition: "Országos Diák Tánckupa",
    group: "Mini Stars",
    details: "Kiss Lili & Varga Mira aranyérmes bemutatója."
  },
  {
    id: "res_5",
    year: "2024",
    badge: "🏆 Zsűri Különdíj",
    category: "Kreatív Színpadi Látvány",
    competition: "Dance Universum Hungary",
    group: "G-Force",
    details: "A fekete-arany kosztüm és fénytechnika különdíja."
  }
];

export const initialNews = [
  {
    id: "news_1",
    title: "Történelmi siker: Dupla aranyérem az Országos Bajnokságon!",
    date: "2026-10-12",
    author: "Kovács Zoltán",
    category: "Sikereink",
    image: "/images/crew-stage.jpg",
    excerpt: "Fantasztikus hétvégét zártunk a Tüskecsarnokban: a G-Force és a Junior Elite is a dobogó legfelső fokára állhatott.",
    content: "Több hónapos kőkemény munka és felkészülés érett be a hétvégén. A zsűri egyhangú döntéssel jutalmazta a 'Gold Reign' című új produkciónkat a maximális technikai pontszámmal. Büszkék vagyunk minden táncosunkra, a szülői háttérre és a koreográfusokra!"
  },
  {
    id: "news_2",
    title: "Elindult az őszi jelentkezés a G Dance csoportjaiba!",
    date: "2026-09-01",
    author: "Menedzsment",
    category: "Felhívás",
    image: "/images/hero-dancer.jpg",
    excerpt: "Nyílt próbaórák gyerekeknek és felnőtteknek egyaránt. Csatlakozz Magyarország egyik legdinamikusabban fejlődő táncközösségéhez!",
    content: "Akár hobbi szinten szeretnél mozogni és önbizalmat építeni, akár profi versenyzői karrierről álmodsz, a G Dance-nél megtalálod a helyed. Jelentkezz még ma az ingyenes próbaórára a weboldalon!"
  },
  {
    id: "news_3",
    title: "Nemzetközi mesterkurzus Los Angeles-i koreográfussal",
    date: "2026-08-20",
    author: "Nagy Viktória",
    category: "Esemény",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&auto=format&fit=crop&q=80",
    excerpt: "Novemberben stúdiónkba látogat Jason Reed, aki több világsztár videóklipjének vezető táncosa és alkotója.",
    content: "Hatalmas megtiszteltetés számunkra, hogy idén Jason Reed elfogadta meghívásunkat. A kurzus nyitott a haladó és profi táncosok előtt. Részvételi helyek limitált számban elérhetők!"
  }
];
