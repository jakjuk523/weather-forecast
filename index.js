/* ========================================
   1. ОСНОВНАЯ СТРАНИЦА
======================================== */

body {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #111827;
    color: #cbd5e1;

    padding: 20px;
    margin: 0;

    font-family: Arial, sans-serif;
    font-size: 20px;
    text-align: center;

    box-sizing: border-box;
}


/* ========================================
   2. СООБЩЕНИЕ ОБ ОШИБКЕ
======================================== */

.p1_style {
    color: #f87171;

    font-family: Arial, sans-serif;
    font-size: 26px;

    margin: 15px auto;

    width: 90%;
    max-width: 700px;
    box-sizing: border-box;
}

#p9 {
    color: #f87171;

    font-family: Arial, sans-serif;
    font-size: 20px;

    margin: 15px auto;
}


/* ========================================
   3. ПОЛЕ ПОИСКА ГОРОДА
======================================== */

.input1_style {
    display: block;

    background-color: #1f2937;
    color: #e2e8f0;

    padding: 16px 20px;
    margin: 15px auto;

    border: 2px solid #4b5563;
    border-radius: 12px;

    font-family: Arial, sans-serif;
    font-size: 22px;

    width: 90%;
    max-width: 500px;

    box-sizing: border-box;
}


/* ========================================
   4. ОСНОВНЫЕ КНОПКИ
======================================== */

.button1_style,
.button2_style {
    display: block;

    background-color: #334155;
    color: #e2e8f0;

    padding: 16px 20px;
    margin: 15px auto;

    border: 2px solid #475569;
    border-radius: 14px;

    font-family: Arial, sans-serif;
    font-size: 22px;

    width: 90%;
    max-width: 500px;

    box-sizing: border-box;

    cursor: pointer;
    transition: transform 0.2s ease;
}

.button1_style:hover,
.button2_style:hover {
    background-color: #40536a;
    transform: scale(1.02);
}

.button1_style:active,
.button2_style:active {
    background-color: #263548;
    transform: scale(0.98);
}


/* ========================================
   5. КОНТЕЙНЕР ДНЕЙ И ПОГОДЫ
======================================== */

.div2_style {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    background-color: #111827;
    color: #cbd5e1;

    padding: 20px;
    margin: 25px auto;

    border: 2px solid #374151;
    border-radius: 20px;

    width: 95%;
    max-width: 1400px;

    box-sizing: border-box;
}


/* ========================================
   6. КОНТЕЙНЕР КНОПОК ДНЕЙ
======================================== */

.div3_style {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    justify-content: center;
    align-items: center;

    background-color: #1f2937;
    color: #cbd5e1;

    padding: 15px;
    margin: 10px 0 20px 0;

    border: 1px solid #374b60;
    border-radius: 15px;

    width: 100%;
    box-sizing: border-box;
}


/* ========================================
   7. КНОПКИ ВЫБОРА ДНЯ
======================================== */

.buttonDays_style {
    display: inline-block;

    background-color: #293548;
    color: #cbd5e1;

    padding: 12px 16px;
    margin: 5px;

    border: 1px solid #475569;
    border-radius: 12px;

    font-family: Arial, sans-serif;
    font-size: 20px;

    cursor: pointer;
    transition: transform 0.2s ease;
}

.buttonDays_style:hover {
    background-color: #3b4b60;
    transform: scale(1.02);
}

.buttonDays_style:active {
    background-color: #263548;
    transform: scale(0.98);
}

.buttonDays_style.active {
    background-color: #36536d;
    color: #f1f5f9;

    border: 1px solid #7dd3fc;
}


/* ========================================
   8. ОСНОВНАЯ КАРТОЧКА ПОГОДЫ
======================================== */

.div1_style {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;

    background-color: #172334;
    color: #cbd5e1;

    padding: 20px;
    margin: 10px 0;

    border: 2px solid #374b60;
    border-radius: 20px;

    font-family: Arial, sans-serif;
    font-size: 20px;

    width: 100%;
    box-sizing: border-box;
}


/* ========================================
   9. ОБЩИЕ НАСТРОЙКИ ТЕКСТА ПОГОДЫ
======================================== */

.div1_style p {
    color: #d1dbe8;

    font-family: Arial, sans-serif;
    font-size: 20px;

    margin: 10px 0;
}


/* ========================================
   10. ОСНОВНАЯ ИНФОРМАЦИЯ
   div4_style:
   p5  — дата
   p2  — время
   p3  — город
   p18 — координаты
======================================== */

.div4_style {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 5px;

    background-color: #26384b;
    color: #d1dbe8;

    padding: 15px;
    margin: 0;

    border: 1px solid #40536a;
    border-radius: 14px;

    width: 100%;
    box-sizing: border-box;
}


/* ========================================
   11. ТЕМПЕРАТУРА
   div5_style:
   p4  — средняя температура
   p10 — диапазон температур
   p16 — ощущаемая температура
======================================== */

.div5_style {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 5px;

    background-color: #203c50;
    color: #d1dbe8;

    padding: 15px;
    margin: 0;

    border: 1px solid #376079;
    border-radius: 14px;

    width: 100%;
    box-sizing: border-box;
}

.div5_style p {
    color: #7dd3fc;
}


/* ========================================
   12. ПОГОДНЫЕ УСЛОВИЯ
   div6_style:
   p11 — код погоды
   p8  — облачность
======================================== */

.div6_style {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 5px;

    background-color: #29374b;
    color: #d1dbe8;

    padding: 15px;
    margin: 0;

    border: 1px solid #46566c;
    border-radius: 14px;

    width: 100%;
    box-sizing: border-box;
}


/* ========================================
   13. ВЕТЕР
   div7_style:
   p7  — скорость ветра
   p12 — направление ветра
======================================== */

.div7_style {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 5px;

    background-color: #253b43;
    color: #d1dbe8;

    padding: 15px;
    margin: 0;

    border: 1px solid #3d5a61;
    border-radius: 14px;

    width: 100%;
    box-sizing: border-box;
}


/* ========================================
   14. ОСАДКИ И ВЛАЖНОСТЬ
   div8_style:
   p13 — осадки
   p17 — влажность
======================================== */

.div8_style {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 5px;

    background-color: #30364a;
    color: #d1dbe8;

    padding: 15px;
    margin: 0;

    border: 1px solid #4b526b;
    border-radius: 14px;

    width: 100%;
    box-sizing: border-box;
}


/* ========================================
   15. ВОСХОД И ЗАКАТ
   div9_style:
   p14 — восход солнца
   p15 — закат солнца
======================================== */

.div9_style {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 5px;

    background-color: #3a3548;
    color: #d1dbe8;

    padding: 15px;
    margin: 0;

    border: 1px solid #5a506a;
    border-radius: 14px;

    width: 100%;
    box-sizing: border-box;
}