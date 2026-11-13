Lazzat — sotuvchi paneli (birinchi demo versiya)

OCHISH
dist/index.html faylini zamonaviy Chrome yoki Edge brauzerida oching.
O‘rnatish va build kerak emas. Internet bo‘lmasa Arial shrifti ishlaydi.
Ma’lumotlar faqat ochilgan brauzer profilida saqlanadi. Sozlamalar > Zaxira nusxa orqali JSON nusxa oling.

9 BO‘LIM
1. Buyurtmalar: yangi / tayyorlanmoqda / tayyor / tarix; qabul, rad etish sababi, tayyorlash vaqti, demo buyurtma va ovoz, brauzer orqali demo chek chiqarish.
2. Menyu: kategoriya yaratish/nomlash/o‘chirish, mahsulot qo‘shish/tahrirlash/o‘chirish, modifikatorlar, narx, rasm, stop-list, XLSX/CSV import va tekshirilgan oldindan ko‘rish.
3. Ish vaqti: har filial uchun 7 kunlik jadval, filial qo‘shish/tahrirlash/ochish/yopish, barcha filiallar uchun band rejimi.
4. Aksiyalar: chegirma, promokod, kombo konfiguratsiyasi, muddat, minimal buyurtma, yoqish/o‘chirish. Mijoz checkoutiga hali ulanmagan.
5. Moliya: yakunlangan demo buyurtmalar savdosi, komissiya, sof tushum, davr filtri, CSV hisobot, bo‘sh to‘lovlar tarixi. Haqiqiy pul o‘tkazish yo‘q.
6. Analitika: haqiqiy saqlangan demo buyurtmalar asosida 7/14 kunlik savdo, top mahsulotlar, gavjum soatlar. Sun’iy o‘sish ko‘rsatkichlari yo‘q.
7. Sharhlar: baholar, javob yozish/tahrirlash, filtrlash, shikoyat belgilash. Shikoyat moderatorga yuborilmaydi.
8. Xodimlar: xodimlar, rollar, bo‘lim ruxsatlari konfiguratsiyasi, faol holati. Login, SMS va serverdagi ruxsat nazorati yo‘q.
9. Sozlamalar: profil, logotip, aloqa, tayyorlash vaqti, demo komissiya stavkasi, ovoz/bildirishnoma, JSON zaxira va tekshirilgan tiklash.

CHEGARALAR
Bu frontend prototip. Bir nechta foydalanuvchi/qurilma uchun sinxronlash, autentifikatsiya va RBAC, mijoz ilovasi, jonli buyurtmalar, to‘lovlar, fiskal chek, kuryer, SMS/push va moderator serveri hali ulanmagan.
"Kuryerga berildi" demo savdoni yakunlaydi; yetkazib berish kuzatuvi yo‘q.
Excel import: .xlsx, birinchi varaq, birinchi qator ustun nomlari. Kerakli ustunlar: nomi, kategoriya, narx. Qo‘shimcha: tavsif, mavjud (1/0). 2 MB / 2000 mahsulot gacha. Brauzer deflate-raw qo‘llamasa CSV ishlating. Eski .xls format qo‘llanmaydi.
Rasmlar: PNG/JPG/WebP, 1 MB gacha; umumiy hajm brauzer localStorage kvotasiga bog‘liq.

TEKSHIRISH
verify.cjs: Node.js 22+ bilan `node verify.cjs`.
Buyurtma holatlari, tushum, komissiya, saqlash, CSV, noto‘g‘ri nusxa va kvota xatolari tekshiriladi.
Brauzer vizual tekshiruvi va native XLSX importi ushbu muhitda tekshirilmagan.
Internet hostingga Git ulanishi muhitda bloklangan, shuning uchun sayt nashr qilinmagan.

2-BOSQICH: BIZNES EGASI DEMOSI
Ochish: dist/owner.html yoki lokal serverda http://localhost:8000/owner.html
6 bo‘lim: umumiy ko‘rinish, filiallar, buyurtmalar, moliya, jamoa, biznes sozlamalari.
Filial va davr filtrlari, kunlik savdo grafigi, buyurtma tafsilotlari va CSV eksporti mavjud.
Filial qo‘shish/tahrirlash/ochish/yopish, xodim qo‘shish/tahrirlash/faollashtirish va biznes profilini saqlash ishlaydi.
Sotuvchi va biznes egasi paneli bir xil manzil/brauzerda teztaom-seller-v1 ma’lumotlaridan foydalanadi.
Xarajatlar lazzat-owner-costs-v1 kalitida alohida saqlanadi; sotuvchi JSON zaxira nusxasi xarajatlar jurnalini o‘z ichiga olmaydi.
Hisoblangan qoldiq = yakunlangan savdo - demo komissiya - kiritilgan xarajatlar; bu haqiqiy bank balansi emas.
Login, server, qurilmalararo sinxronlash va kuryer paneli hali yaratilmagan.
Tekshirish: node verify.cjs (17 tekshiruv), node verify-owner.cjs (9 tekshiruv).
Brauzer boshqaruv xizmati mavjud bo‘lmagani uchun yangi panel vizual tekshirilmagan; lokal HTTP fayllar 200 javob qaytardi.
OWNER TAHLILLARI YANGILANISHI
Bosh sahifa: savdo, sof foyda, filiallar taqqoslashi va muhim ogohlantirishlar.
Taomlar tahlili: har mahsulotga bir dona tannarx, eng ko‘p/eng kam sotilgan va foydali taomlar.
Foyda = yakunlangan savdo - taom tannarxi - komissiya - ish haqi - boshqa xarajatlar.
Moliya > Xarajat kiritish: Ish haqi yoki Boshqa xarajat turini tanlang; taom tannarxini takror kiritmang.
Tannarx kiritilmasa foyda to‘liq emas deb belgilanadi. Eski buyurtmalar joriy tannarxda taxminiy hisoblanadi.
Yangi yakunlangan buyurtmalar tannarx va komissiyani o‘zida qayd etadi; keyingi narx o‘zgarishi ularni o‘zgartirmaydi.
Davrlar: bugun/kecha, bu hafta/o‘tgan haftaning shu qismi, bu oy/o‘tgan oyning shu qismi, 7/30 kun, barcha vaqt.
Savdo yakunlangan vaqt, rad etish rad qilingan vaqt bo‘yicha; ish haqi va xarajatlar kiritilgan sana bo‘yicha hisoblanadi.
Filial reytingi faqat buyurtma yoki filialga bog‘langan sharhlardan olinadi; bog‘lanmagan sharhlar filialga taxminan biriktirilmaydi.
Demo kirish: Jamoa > Tahrirlash orqali xodimga filial belgilang, so‘ng yuqoridagi Demo rol tanlovidan foydalaning.
Owner hammasini; menejer o‘z filiali natijalarini; sotuvchi o‘z filiali buyurtmalari va umumiy menyuni ko‘radi.
Menyu barcha filiallar uchun umumiy. Rollar brauzer filtri; haqiqiy autentifikatsiya va server ruxsat nazorati emas.
Kun yakuni: sanani tanlang va qisqa TXT hisobotni yuklang.
Qo‘shimcha tekshiruv: node verify-insights.cjs. Vizual brauzer tekshiruvi muhitdagi brauzer xizmati yo‘qligi sababli bajarilmadi.
3-BOSQICH: KURYER DEMOSI
Ochish: http://localhost:8000/courier.html yoki dist/courier.html.
Bo‘limlar: yangi takliflar, faol buyurtma, yetkazishlar tarixi, daromadlar va profil.
Tez sinash: Liniyaga chiqish > Demo buyurtma > Buyurtmani olish > Restorandan oldim > Yetkazdim.
Sotuvchi bilan sinash: buyurtma kartasidagi Yetkazish orqali manzil va kuryer haqini yozing, buyurtmani Tayyor qiling, so‘ng kuryer panelidan oling.
Sotuvchidagi Kuryerga berildi amali biriktirilgan kuryerning buyurtmasini Yetkazilmoqda holatiga o‘tkazadi.
Restoran savdosi kuryerga topshirilganda bir marta qayd etiladi; mijozga yetkazish alohida delivery holatida kuzatiladi.
Yetkazish haqi buyurtmani olish paytida qayd etiladi; kuryer daromadi faqat Yetkazdim tasdiqlangach hisoblanadi.
Naqd buyurtmada to‘lovni qabul qilganini tasdiqlash shart. Naqd buyurtma summasi kuryer daromadidan alohida.
Bir kuryer bir vaqtda bitta faol buyurtma oladi. Olib ketilmagan buyurtmani takliflarga qaytarish mumkin.
Muammo izohi sotuvchi va owner tafsilotlarida ko‘rinadi; dispetcherga yuborilmaydi.
Brauzer Web Locks mavjud bo‘lsa bir buyurtmaga parallel kuryer da’volari ketma-ket tekshiriladi; bu server tranzaksiyasi o‘rnini bosmaydi.
Kuryer tanlash demo uchun; haqiqiy autentifikatsiya, GPS, SMS, push, bank to‘lovi va qurilmalararo sinxronlash ulanmagan.
Xaritada ochish faqat foydalanuvchi bosganda manzilni Google Maps qidiruviga ochadi; jonli kuzatuv yo‘q.
Oldingi buyurtmalarga kuryer yoki yetkazish manzili sun’iy biriktirilmaydi; sotuvchi yetishmayotgan manzilni kiritadi.
Tekshirish: node verify.cjs; node verify-owner.cjs; node verify-insights.cjs; node verify-courier.cjs (jami 67 tekshiruv).
Lokal HTTP barcha uch panel va yangi resurslar uchun 200 qaytardi. Brauzer vizual tekshiruvi bajarilmagan.
KURYER PANELI: KENGAYTIRILGAN TUZILMA
10 bo‘lim: Bosh ekran, Yangi buyurtmalar, Faol yetkazma, Xarita va yo‘nalish, Daromad va hisob-kitob, Ish jadvali, Yetkazmalar tarixi, Natijalar, Yordam va muammolar, Profil va sozlamalar.
5 bosqich: Restoranga yo‘ldaman > Restorandaman > Buyurtmani oldim > Mijozga yetib keldim > Yetkazildi.
Bosh ekran: Ishdaman/Tanaffusdaman/Ishda emasman, faol yetkazma, bugungi haq+bonus+choychaqa va yetkazmalar soni.
Smenalar boshlanish/tugash va tanaffus vaqtlarini, hudud va transportni saqlaydi. Faol yetkazma bo‘lsa tanaffus/tugatish bloklanadi.
Sotuvchi kartasidagi Yetkazish formasi: manzil, paketlar soni, taxminiy km, taxminiy daqiqa, kirish eshigi, qavat, mo‘ljal va izoh. Haqiqiy marshrut masofasi hisoblanmaydi.
Taklifni rad qilish faqat shu kuryerdan yashiradi; boshqa kuryer taklifni qabul qilishi mumkin.
Bekor qilish va olib ketilmagan taklifni qaytarish tarixga nusxa yozadi; restoran buyurtmasi tayyor holda qoladi.
Olib ketilgan buyurtmani restoranga qaytarish alohida tasdiqlanadi; restoran savdosi/foydasidan chiqariladi, kuryer haqi yozilmaydi. Haqiqiy mijoz to‘lovi qaytarilmaydi.
Tarix: yakunlangan, bekor qilingan, restoranga/taklifga qaytarilgan va rad etilgan yozuvlar; sana oralig‘i, haq, holat va matn filtri; filtrlangan CSV.
Hisob-kitob: yetkazish haqi, bonus, choychaqa, daromad to‘lovi qaydi, naqd topshirish qaydi. Bonus va choychaqa faqat kuryerning yetkazilgan buyurtmasiga yoziladi.
Qo‘shimcha va to‘lov yozuvlari qo‘lda kiritiladigan DEMO jurnalidir. Daromad to‘lovi qoldiqdan, naqd topshirish olingan naqd puldan oshmaydi. Haqiqiy pul o‘tkazilmaydi.
Natijalar: qabul qilishdan yetkazishgacha o‘rtacha vaqt, muddati qayd etilgan buyurtmalarning o‘z vaqtida ulushi va alohida courierRating baholari. Restoran reytingi olinmaydi; yo‘q ma’lumot o‘rniga chiziq ko‘rsatiladi.
Muammolar: restoran kechikishi, mijoz javob bermasligi, noto‘g‘ri manzil, transport, shikastlangan buyurtma va boshqa; izoh owner/sotuvchida saqlanadi, tashqi xizmatga yuborilmaydi.
Profil: ism, telefon, transport. Sozlamalar: o‘zbekcha va ruscha asosiy boshqaruv, ovozni sinash va panel ichidagi yangi taklif bildirishnomalari.
Ruscha rejim asosiy menyu va amallarni tarjima qiladi; manzil, mijoz izohi va batafsil yordam matni asl holida qoladi. Brauzer push xizmati yo‘q.
Eski, bosqichi qayd etilmagan olib ketilgan buyurtma mijozga yo‘lda holatida davom etadi. Sotuvchi topshirish amali fizik olib ketish sifatida hisoblanadi.
Jami 77 avtomatik tekshiruv o‘tdi: 17 sotuvchi, 9 owner, 20 owner tahlili, 31 kuryer. Lokal HTTP 200. Vizual brauzer QA bajarilmagan.
YAGONA TIZIM
Asosiy kirish: http://localhost:8000/ (dist/index.html).
Sotuvchi: /seller.html. Biznes egasi: /owner.html. Kuryer: /courier.html.
Har kabinetda yuqoridagi umumiy menyu orqali boshqa kabinet yoki bosh sahifaga o‘tiladi.
Avvalgi index.html sotuvchi sahifasi endi seller.html manzilida; buyurtma va boshqa saqlangan ma’lumotlar ko‘chirilmaydi yoki tozalanmaydi, eski storage kalitlari saqlangan.
Bosh sahifadagi hisoblar tanlangan demo xodim filial ruxsatlarini hisobga oladi. Bosh sahifa ma’lumotlarga faqat o‘qish uchun murojaat qiladi.
Kabinet almashtirish demo identifikatsiyasini o‘zgartirmaydi. Owner ko‘rinishi kerak bo‘lsa kabinetdagi Demo rol tanlovidan Egani tanlang.
Brauzer Orqaga tugmasi bilan eski kabinetni qaytarsa, yangi buyurtma holatini o‘qish uchun qayta yuklanadi.
Bu yagona frontend demo; qurilmalararo backend, haqiqiy autentifikatsiya, GPS va to‘lov xizmati hali ulanmagan.
Tekshirish: node verify-suite.cjs. Jami 83 avtomatik tekshiruv o‘tdi. 4 sahifa va umumiy resurslar lokal HTTP 200 qaytardi; vizual brauzer QA bajarilmagan.
XARITA, GPS VA IKKI TOMONLAMA TOPSHIRISH
Kuryer > Xarita va yo‘nalish: Leaflet 1.9.4 va OpenStreetMap interaktiv xaritasi. Kutubxona unpkg CDNdan, xarita rasmlari tile.openstreetmap.org dan yuklanadi; internet kerak.
Sotuvchi > buyurtmadagi Yetkazish: xaritada restoran/mijozni tanlab bosing yoki lat/lng kiriting. Restoran nuqtasini bir martalik GPS bilan ham belgilash mumkin. Koordinatalar kiritilmagan manzil avtomatik geokodlanmaydi.
Kuryer smenani boshlaydi > xarita > GPSni yoqish va sotuvchiga ulashish. Browser geolocation ruxsati va HTTPS/localhost kerak. Qurilmada GPS/location xizmati mavjud bo‘lishi kerak.
GPS permission sahifa ochilganda avtomatik so‘ralmaydi. Oxirgi nuqta va aniqlik saqlanadi; to‘liq harakat tarixi saqlanmaydi. Saqlash ko‘pi bilan har 10 sekundda. 60 sekunddan eski nuqta sotuvchiga jonli deb ko‘rsatilmaydi.
GPSni o‘chirish, smenani tugatish, boshqa kuryerga o‘tish va sahifadan chiqish watch va ulashilgan nuqtani tozalaydi.
Xaritadagi chiziq nuqtalarni to‘g‘ri bog‘laydi, yo‘l hisoblash emas. Ko‘cha bo‘ylab navigatsiya tashqi xarita ilovasida ochiladi.
Topshirish oqimi:
1. Sotuvchi buyurtmani tayyorlaydi va Yetkazish orqali manzil/nuqtalar/paketlarni kiritadi.
2. Kuryer tayyor buyurtmani qabul qiladi; faol kartasida 6 xonali topshirish kodi chiqadi.
3. Kuryer Restorandaman deb belgilaydi va sotuvchiga shu kodni ko‘rsatadi.
4. Sotuvchi Kuryerga berildi tugmasidan kodni kiritib, paketlar topshirilishini tasdiqlaydi.
5. Kuryer Buyurtmani oldim deb tasdiqlaydi; restoran savdosi bir marta qayd etiladi va Yetkazilmoqda holatiga o‘tadi.
6. Kuryer mijozga yetib keladi va yetkazishni yakunlaydi.
Sotuvchi tasdig‘isiz pickup, noto‘g‘ri kod va boshqa filialdan tasdiqlash rad etiladi. Oldingi biriktirilgan buyurtmalar kuryer paneli ochilganda kod bilan moslashtiriladi.
Sotuvchida tayyor kartadagi Kuryer xaritasi va tarixdagi Kuryerni xaritada ko‘rish orqali ulashilgan GPS ko‘rinadi.
Bular bir brauzer/manzildagi umumiy localStorage bazasiga bog‘langan. Kuryer telefoni va restoran kompyuteri o‘rtasida jonli aloqa uchun backend va hosting hali kerak. Demo kod haqiqiy server autentifikatsiyasi emas.
Tekshirish: node verify-gps.cjs (16 yangi tekshiruv); jami 99 avtomatik tekshiruv o‘tdi. Lokal resurslar HTTP 200. Haqiqiy qurilma GPS ruxsati va xarita vizual QA bajarilmagan.