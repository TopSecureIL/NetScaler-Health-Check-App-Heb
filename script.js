document.addEventListener('DOMContentLoaded', function() {
    const healthCheckData = [
        // This replaces the previous simplified ADC section
        {
            category: "NetScaler ADC - כללי",
            items: [
                "מנהלי המערכת רשומים לקבלת התראות אבטחה של Citrix.",
                "גרסת הקושחה (firmware) מעודכנת לכל פגיעויות האבטחה האחרונות.",
                "בשימוש ב-SAML, כלל Relay State מוגדר למניעת חטיפת סשן.",
                "סורק Indicator of Compromise (IoC) עבור CVE-2019-19781 אינו מראה סימני פריצה.",
                "ה-Dashboard אינו מציג רוחב פס יוצא חריג (חשד להתקפת DTLS Amplification DDoS).",
                "שדרוגי קושחה נבדקים על רכיב ADC נפרד בסביבת 테스트 לפני הטמעה ב-Production.",
                "עבור VPX על vSphere: כרטיסי הרשת הם VMXNET3 (ולא E1000).",
                "עבור VPX על vSphere: מוגדר Anti-affinity ב-DRS Cluster עבור זוגות HA.",
                "עבור VPX על vSphere: משאבי CPU/Memory שמורים, או אם לא, האפשרות Yield CPU מבוטלת.",
                "רישיונות ה-ADC בנתיב /nsconfig/license/ אינם עומדים לפוג בקרוב.",
                "עבור ADC פיזי: פורט ה-LOM מחובר, מוגדר, וסיסמתו אינה ברירת המחדל.",
                "סיסמת 'nsroot' אינה ברירת המחדל, מנוהלת בכלי PIM, ואינה משמשת לכניסה שוטפת.",
                "פוליסות בנויות באמצעות Advanced Expressions, ולא Classic Expressions.",
                "אימות לניהול המערכת משתמש בשרת חיצוני (למשל, LDAPS).",
                "שירות ה-LDAP מאוזן עומסים, מוצפן (LDAPS 636), ומשתמש בחשבון שירות ייעודי.",
                "פילטר החיפוש ב-LDAP מגביל גישה לקבוצת AD ייעודית של מנהלי ה-ADC.",
                "לחשבון 'nsroot' מבוטלת האפשרות לאימות חיצוני.",
                "לא קיימים חשבונות משתמש מקומיים על ה-ADC מלבד 'nsroot'.",
                "NTP ואזור זמן (Time Zone) מוגדרים כראוי.",
                "Syslog מוגדר לשליחת לוגים לשרת SIEM חיצוני.",
                "התראות SNMP עבור ספי CPU וזיכרון מוגדרות ונשלחות ל-ADM.",
                "תוכנית שיפור חווית הלקוח (CUXIP) מבוטלת.",
                "מוגדר פרופיל TCP עם ההגדרות המומלצות.",
                "האפשרות 'Drop Invalid HTTP requests' מאופשרת בהגדרות ה-HTTP הגלובליות.",
                "האפשרות 'Secure Access Only' מאופשרת על כל כתובות ה-NSIP ו-SNIP הניהוליות.",
                "תעודת ה-SSL של ממשק הניהול תקינה וללא שגיאות.",
                "רשת: ממשקים שאינם בשימוש מבוטלים.",
                "רשת: כל VLAN מחובר לממשק או ערוץ (channel) יחיד.",
                "רשת: מוגדר ניתוב ברירת מחדל (Default Route) יחיד בלבד.",
                "הוסרו הגדרות שאינן בשימוש (אובייקטי שרת, פוליסות וכו').",
                "רכיב ה-ADC מנוטר ומגובה על ידי Citrix ADM.",
                "ה-Dashboard מראה שאין חריגה ממשאבי CPU, זיכרון או רוחב פס מעבר לקיבולת או לרישוי.",
                "הספריות /var/core ו-/var/crash אינן מכילות קבצי קריסה מהזמן האחרון."
            ]
        },
        {
            category: "NetScaler ADC - זוג High Availability (HA)",
            items: [
                "גרסת הקושחה והרישיונות המותקנים זהים בשני הצמתים.",
                "הגדרות NTP ואזור זמן זהות בשני הצמתים.",
                "מערך ה-HA מסתנכרן ללא שגיאות ושני הצמתים במצב ENABLED.",
                "האפשרות Fail-safe mode מאופשרת.",
                "הפקודה 'show ha node' מציגה heartbeats בכל הממשקים.",
                "בוצעה בהצלחה בדיקת העברה יזומה (Failover).",
                "מוגדר Sync VLAN כדי לאפשר שדרוג רציף (ISSU) בגרסאות ADC 13.0 ומעלה."
            ]
        },
        {
            category: "NetScaler ADC - SDX",
            items: [
                "פורט ה-LOM מוגדר וסיסמתו אינה ברירת המחדל.",
                "ה-Dashboard של ה-SDX SVM אינו מציג תקלות חומרה.",
                "גרסת הקושחה של ה-SDX עדכנית (זהה או חדשה יותר מגרסת ה-VPX).",
                "סיסמת ה-nsroot של ה-SDX SVM אינה ברירת המחדל, והניהול משתמש באימות חיצוני (LDAPS).",
                "גישת הניהול ל-SVM נאכפת ב-HTTPS בלבד והתעודה תקינה.",
                "אגרגציית קישורים (Channels) נוצרת ברמת ה-SDX SVM ולא בתוך כל VPX.",
                "ל-VPX Instances מוקצים המשאבים המתאימים (רישיון Platinum, שבבי SSL, מעבד ייעודי לסביבת ייצור).",
                "הגדרות VLAN מבוצעות בתוך ה-VPX Instances כדי למנוע אתחולים בעת שינוי."
            ]
        },
        {
            category: "NetScaler ADC - איזון עומסים ו-SSL",
            items: [
                "תצורות איזון העומסים מתועדות.",
                "המוניטורים מבצעים בדיקות ברמת האפליקציה (למשל שאילתת LDAP ספציפית) ולא רק פינג.",
                "נעשה שימוש ב-Rewrite policies להסתרת כותרות מידע של שרתי הווב (Server, X-Powered-By).",
                "כל שרתי ה-vServer של SSL הפונים לאינטרנט מקבלים ציון A או A+ במבחן SSL Labs.",
                "שרתי vServer להפניה (HTTP ל-HTTPS) נמצאים במצב UP (שיטת Responder) ולא DOWN (שיטת Backup URL).",
                "חבילות צופנים (cipher suites) מותאמות ומאובטחות משויכות לכל vServer של SSL.",
                "פרוטוקולי SSLv3 ו-TLSv1.0 מבוטלים בכל vServer של SSL.",
                "הגדרת SSL Renegotiation היא NONSECURE (גלובלית או דרך פרופילי SSL).",
                "תעודות Root אינן מקושרות לתעודות ביניים (intermediate) בשרשרת.",
                "התעודות בתוקף; ADM מספק התראות על תעודות שעומדות לפוג.",
                "שירות ADM Analytics (Web Insight) מופעל עבור Virtual Servers של HTTP.",
                "עבור רישיון Premium: מוגדר Bot Management או Web Application Firewall (WAF)."
            ]
        },
        {
            category: "Citrix NetScaler ADM",
            items: [
                "קיימת מערכת ADM המנהלת את כל רכיבי ה-ADC.",
                "גרסת הקושחה של ה-ADM עדכנית.",
                "ה-ADM פרוס בתצורת High Availability עם כתובת IP צפה (Floating IP).",
                "האפשרות 'Prompt credentials for instance login' מופעלת להבטחת רישום ביקורת (audit) תקין.",
                "סיסמת ה-nsroot של ה-ADM אינה ברירת המחדל, והניהול משתמש באימות חיצוני (LDAPS).",
                "ל-ADM מוקצים מספיק שטח דיסק, CPU וזיכרון.",
                "מוגדרים חוקי אירועים (Event Rules) לשליחת אימייל למנהלים על התראות קריטיות/חשובות מה-ADC.",
                "גיבויי ה-ADC ב-ADM מוגדרים להעברה לשרת חיצוני.",
                "רישוי ה-VIP ב-ADM מוגדר ומוקצה כראוי.",
                "עבור HDX Insight: שירות AppFlow מופעל על vServers של Gateway ומקושר ל-Director דרך HTTPS."
            ]
        },
        {
            category: "NetScaler Citrix Gateway (ICA Proxy)",
            items: [
                "שרת ה-vServer של ה-Gateway מקבל ציון A או A+ במבחן SSL Labs.",
                "מוגדר פרופיל TCP עם ההגדרות המומלצות.",
                "האפשרות DTLS מופעלת על ה-vServer לתמיכה בפרוטוקול EDT.",
                "התקשורת ל-StoreFront היא באמצעות HTTPS ומאוזנת עומסים.",
                "הגדרות ה-STA ב-Gateway תואמות להגדרות ב-StoreFront.",
                "עבור אימות דו-שלבי (RADIUS), נבדקה העברה יזומה (failover) משני צמתי ה-HA.",
                "עבור אימות SAML, מוגדר 'relaystateRule' למניעת חטיפת סשן.",
                "בשימוש ב-Native OTP, תכונת ה-AD ושדות הכניסה ב-nFactor מוצפנים."
            ]
        },
        {
            category: "NetScaler ADC - GSLB",
            items: [
                "רשומות ה-DNS עבור דומיינים של GSLB מואצלות (delegated) כראוי לשירותי ה-ADNS של ה-ADC.",
                "לכל צמתי ה-ADC המשתתפים ב-GSLB יש תצורת GSLB זהה.",
                "תקשורת Metric Exchange Protocol (MEP) בין אתרים מאובטחת ומוגנת בחומת אש.",
                "בשימוש ב-Static Proximity, בסיס הנתונים עדכני וקיימות רשומות מותאמות לרשתות פנימיות.",
                "שמירת אתר (Site persistence) פועלת כראוי בפריסות GSLB של Active/Active.",
                "אפשרויות אבטחת DNS מוגדרות למניעת התקפות מניעת שירות (DoS) על ADNS."
            ]
        }
    ];

    const form = document.getElementById('healthCheckForm');
    let formHtml = '';

    healthCheckData.forEach(section => {
        formHtml += `<div class="form-section"><h2>${section.category}</h2>`;
        formHtml += '<table><thead><tr><th>בדיקה</th><th>סטטוס</th><th>הערות</th></tr></thead><tbody>';
        
        section.items.forEach(item => {
            formHtml += `
                <tr>
                    <td>${item}</td>
                    <td>
                        <select>
                            <option value="">בחר סטטוס</option>
                            <option value="תקין">תקין</option>
                            <option value="דורש טיפול">דורש טיפול</option>
                            <option value="לא רלוונטי">לא רלוונטי</option>
                        </select>
                    </td>
                    <td><input type="text" placeholder="הערות..."></td>
                </tr>
            `;
        });

        formHtml += '</tbody></table></div>';
    });

    const clientDetails = form.querySelector('.client-details');
    clientDetails.insertAdjacentHTML('afterend', formHtml);
});

function generateReport() {
    const clientName = document.getElementById('clientName').value;
    const checkDate = document.getElementById('checkDate').value;
    const checkedBy = document.getElementById('checkedBy').value;
    const adcVersion = document.getElementById('adcVersion').value;

    let reportHtml = `
        <!DOCTYPE html>
        <html lang="he" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>דוח בדיקת תקינות - ${clientName}</title>
            <style>
                body { font-family: Arial, sans-serif; direction: rtl; }
                h1, h2 { color: #005696; }
                h1 { text-align: center; border-bottom: 2px solid #ccc; padding-bottom: 10px; }
                h2 { border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;}
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: right; }
                th { background-color: #f2f2f2; }
                .status-ok { color: green; font-weight: bold; }
                .status-issue { color: red; font-weight: bold; }
                .client-details-table { border: none; width: auto; margin-bottom: 30px; }
                .client-details-table td { border: none; padding: 5px; }
                .client-details-table td:first-child { font-weight: bold; padding-left: 15px; }
                 @media print {
                    button { display: none; }
                 }
            </style>
        </head>
        <body>
            <h1>דוח בדיקת תקינות (Health Check) - Citrix NetScaler ADC</h1>
            <table class="client-details-table">
                <tr><td>שם הלקוח:</td><td>${clientName}</td></tr>
                <tr><td>תאריך הבדיקה:</td><td>${new Date(checkDate).toLocaleDateString('he-IL')}</td></tr>
                <tr><td>נבדק על ידי:</td><td>${checkedBy}</td></tr>
                <tr><td>גרסת ADC:</td><td>${adcVersion}</td></tr>
            </table>
            <hr>
    `;

    const sections = document.querySelectorAll('.form-section:not(.client-details)');
    sections.forEach(section => {
        const title = section.querySelector('h2').innerText;
        reportHtml += `<h2>${title}</h2>`;
        reportHtml += '<table><thead><tr><th>בדיקה</th><th>סטטוס</th><th>הערות</th></tr></thead><tbody>';
        
        const rows = section.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const check = row.cells[0].innerText;
            const status = row.cells[1].querySelector('select').value;
            const notes = row.cells[2].querySelector('input').value;
            
            let statusClass = '';
            if (status === 'תקין') statusClass = 'status-ok';
            if (status === 'דורש טיפול') statusClass = 'status-issue';

            reportHtml += `
                <tr>
                    <td>${check}</td>
                    <td class="${statusClass}">${status}</td>
                    <td>${notes}</td>
                </tr>
            `;
        });
        reportHtml += '</tbody></table>';
    });
    
    reportHtml += `<p style="margin-top: 40px; text-align: center; color: #555;">-- סוף הדוח --</p></body></html>`;

    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(reportHtml);
    reportWindow.document.close();
    setTimeout(() => {
        reportWindow.print();
    }, 500);
}
