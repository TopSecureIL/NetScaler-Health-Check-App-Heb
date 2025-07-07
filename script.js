document.addEventListener('DOMContentLoaded', function() {
    const healthCheckData = [
        {
            category: "1. Citrix NetScaler ADC - הגדרות כלליות ואבטחה",
            items: [
                "עדכוני אבטחה: מנהלי המערכת רשומים לקבלת התראות אבטחה מ-Citrix.",
                "גרסת קושחה (Firmware): גרסת ה-ADC מעודכנת וכוללת את כל תיקוני האבטחה הרלוונטיים.",
                "הגנה מ-CVE-2019-19781: סורק ה-Indicator of Compromise לא מראה סימני פריצה.",
                "הגנת Relay State: אם נעשה שימוש ב-SAML, הוגדר Relay State Rule.",
                "סקריפט rc.netscaler: מכיל תיקונים (remediation) נדרשים.",
                "רוחב פס יוצא: ה-Dashboard אינו מציג שימוש חריג ברוחב פס יוצא (שעלול להעיד על התקפת DTLS Amplification DDoS).",
                "סביבת בדיקות (Test): קיימת סביבת בדיקות נפרדת לשדרוגי גרסה.",
                "סיסמת nsroot: אינה ברירת המחדל, מנוהלת בכלי PIM, ומנהלים אינם משתמשים בה.",
                "חשבונות משתמש מקומיים: לא קיימים חשבונות מקומיים מלבד `nsroot`.",
                "אותנטיקציה לניהול: מוגדרת מול שרת חיצוני (רצוי LDAPS).",
                "הגדרות LDAPS: החיבור מוצפן (פורט 636), חשבון ה-Bind הוא Service Account.",
                "נעילת חשבון nsroot: האפשרות לאותנטיקציה חיצונית עבור `nsroot` כבויה.",
                "מדיניות (Policies): נעשה שימוש ב-Advanced Expressions במקום Classic Expressions.",
                "NTP ו-Time Zone מוגדרים נכון.",
                "Syslog: שליחת לוגים מוגדרת לשרת SIEM חיצוני.",
                "SNMP Traps נשלחים ל-Citrix ADM. ספים (Thresholds) עבור CPU ו-Memory מוגדרים.",
                "CEIP/CUXIP: תוכנית שיפור חווית הלקוח מבוטלת.",
                "הגדרות TCP: מוגדר פרופיל TCP מומלץ.",
                "`Drop Invalid HTTP requests` מאופשר בהגדרות הגלובליות.",
                "`Secure Access Only` מאופשר על כל כתובות ה-NSIP וה-SNIP הניהוליות.",
                "תעודת ניהול (Management Certificate) תקינה וללא שגיאות.",
                "ממשקי רשת שאינם בשימוש מבוטלים. כל VLAN מחובר לממשק יחיד.",
                "ניתוב (Routing): קיים Default Route יחיד. אם קיימת רשת ניהול ייעודית, הוגדרו PBRs.",
                "שרתי DNS: כתובת שרת ה-Root DNS מעודכנת.",
                "הוסרו הגדרות ישנות שאינן בשימוש (Server Objects, Policies וכו').",
                "המערכת מנוטרת ומגובה על ידי Citrix ADM.",
                "ה-Dashboard מראה שאין חריגה ממשאבי CPU, זיכרון או רישוי.",
                "הספריות `/var/core` ו-`/var/crash` אינן מכילות קבצים מהזמן האחרון."
            ]
        },
        {
            category: "2. NetScaler ADC בתצורת High Availability (HA)",
            items: [
                "אחידות גרסה: גרסת הקושחה זהה בשני הצמתים (nodes).",
                "אחידות רישוי: הרישיונות המותקנים זהים בשני הצמתים.",
                "סנכרון זמן: NTP ו-Time Zone מוגדרים וזהים בשני הצמתים.",
                "מצב HA: הסנכרון עובד ללא שגיאות. שני הצמתים במצב `ENABLED`.",
                "Fail-safe Mode מאופשר.",
                "בדיקת Heartbeats: הפקודה `show ha node` מראה שמתקבלים Heartbeats בכל הממשקים.",
                "בדיקת Failover: בוצעה בדיקת Failover יזומה, כולל בדיקת אימות RADIUS.",
                "Sync VLAN: מוגדר VLAN ייעודי לסנכרון כדי לאפשר ISSU (בגרסה 13.0 ומעלה)."
            ]
        },
        {
            category: "3. NetScaler ADC SDX",
            items: [
                "חיבור LOM: פורט ה-LOM מחובר ומוגדר, וסיסמת ה-nsroot שונתה מברירת המחדל.",
                "תקינות חומרה: ה-Dashboard ב-SDX SVM אינו מציג בעיות חומרה.",
                "גרסת קושחה (SDX): גרסת ה-SDX עדכנית.",
                "אבטחת SVM: סיסמת `nsroot` של ה-SVM מורכבת ואינה ברירת המחדל. הגישה לניהול מאובטחת באמצעות LDAPS.",
                "גישה לניהול: מוגדרת גישה מאובטחת (HTTPS) בלבד לניהול ה-SVM.",
                "רישוי: מספר רישיונות ה-SDX תואם לכמות שנרכשה.",
                "גיבויים: גיבויי ה-SVM מוגדרים עם העברה חיצונית (External Transfer)."
            ]
        },
        {
            category: "4. איזון עומסים (Load Balancing) ו-SSL",
            items: [
                "תיעוד: תצורת איזון העומסים מתועדת.",
                "מוניטורים (Monitors): המוניטורים מבצעים בדיקה אפליקטיבית ולא רק בדיקת Telnet.",
                "אבטחת שרתים: נעשה שימוש ב-Rewrite policies להסתרת כותרות מידע של שרתי הווב.",
                "דירוג SSL: כל שרתי ה-SSL הפונים לאינטרנט מקבלים ציון A או A+ במבחן SSL Labs.",
                "הצפנה (Ciphers): צופנים מותאמים אישית משויכים לכל SSL vServer.",
                "פרוטוקולים ישנים: SSLv3, TLS 1.0 ו-TLS 1.1 מבוטלים בכל SSL vServer.",
                "תוקף תעודות: התעודות בתוקף. ADM שולח התראות על תעודות שעומדות לפוג."
            ]
        }
        // Add other categories here in the same format
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

    // Insert after the client details section
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
    // Give browser time to render before printing
    setTimeout(() => {
        reportWindow.print();
    }, 500);
}