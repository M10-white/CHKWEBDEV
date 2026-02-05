<?php
$maintenance_end = strtotime('2026-04-01 08:00:00');
$site_title = 'Site Maintenance';
$contact_link = 'https://www.linkedin.com/company/chkwebdev/';
$logo_path = 'assets/img/favicon.svg';
$logo_link = 'https://www.chkwebdev.com';
$github_link = 'https://github.com/M10-white';
$linkedin_link = 'https://www.linkedin.com/company/chkwebdev/';
$legal_info = 'CHKWEBDEV (c) 2026';
$redirect_url = 'https://www.chkwebdev.com';
$gears_gif_path = 'assets/img/loading.gif';

if (strpos($contact_link, '@') !== false) {
    $contact_href = 'mailto:' . $contact_link;
} elseif (strpos($contact_link, 'http') === 0) {
    $contact_href = $contact_link;
} else {
    $contact_href = 'http://' . $contact_link;
}

$languages = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? 'en');

$lang = 'en';

foreach ($languages as $language) {
    $language = strtolower(substr($language, 0, 2));
    if (in_array($language, array('en', 'ar', 'fr', 'de', 'es', 'zh', 'pt'))) {
        $lang = $language;
        break;
    }
}

header("Content-Language: $lang");

$logo_exists = !empty($logo_path) && file_exists(__DIR__ . '/' . $logo_path);

$translations = array(
    'en' => array(
        'title' => 'Site Maintenance',
        'heading' => 'We\'ll be back soon!',
        'text' => 'We\'re just sprucing things up a bit! In the meantime, feel free to <a href="' . $contact_href . '">join us on our LinkedIn</a> for a chat or to get any assistance you need. We\'ll be up and running in just a moment, and the page will automatically refresh at the end of the countdown below.',
        'team' => '&mdash; The Team',
        'day' => 'Days',
        'hour' => 'Hours',
        'minute' => 'Minutes',
        'second' => 'Seconds',
    ),
    'ar' => array(
        'title' => 'صيانة الموقع',
        'heading' => 'سنعود قريبا!',
        'text' => 'نحن نعمل على تحسين الموقع لك! في هذه الأثناء، لا تتردد في <a href="' . $contact_href . '">الانضمام إلينا على LinkedIn الخاص بنا</a> للدردشة أو للحصول على المساعدة التي تحتاجها. سنعود للعمل في لحظات قليلة، وسيتم تحديث الصفحة تلقائياً عند انتهاء العد التنازلي أدناه.',
        'team' => '&mdash; فريق العمل',
        'day' => 'أيام',
        'hour' => 'ساعات',
        'minute' => 'دقائق',
        'second' => 'ثواني',
    ),
    'fr' => array(
        'title' => 'Maintenance du site',
        'heading' => 'Nous reviendrons bientôt!',
        'text' => 'Nous apportons juste quelques améliorations! En attendant, n\'hésitez pas à <a href="' . $contact_href . '">nous rejoindre sur notre LinkedIn</a> pour discuter ou obtenir l\'aide dont vous avez besoin. Nous serons de retour en un instant, et la page se rafraîchira automatiquement à la fin du compte à rebours ci-dessous.',
        'team' => '&mdash; L\'équipe',
        'day' => 'Jours',
        'hour' => 'Heures',
        'minute' => 'Minutes',
        'second' => 'Secondes',
    ),
    'de' => array(
        'title' => 'Wartung der Website',
        'heading' => 'Wir sind bald zurück!',
        'text' => 'Wir verbessern gerade ein paar Dinge für dich! In der Zwischenzeit kannst du dich gerne <a href="' . $contact_href . '">uns auf LinkedIn anschließen</a>, um zu chatten oder um die Hilfe zu erhalten, die du benötigst. Wir sind in Kürze wieder da, und die Seite wird am Ende des Countdowns unten automatisch aktualisiert.',
        'team' => '&mdash; Das Team',
        'day' => 'Tage',
        'hour' => 'Stunden',
        'minute' => 'Minuten',
        'second' => 'Sekunden',
    ),
    'es' => array(
        'title' => 'Mantenimiento del sitio',
        'heading' => '¡Volveremos pronto!',
        'text' => '¡Estamos mejorando algunas cosas para ti! Mientras tanto, siéntete libre de <a href="' . $contact_href . '">unirte a nosotros en nuestro LinkedIn</a> para charlar o para obtener la asistencia que necesitas. Estaremos operativos en un instante, y la página se recargará automáticamente al final de la cuenta regresiva a continuación.',
        'team' => '&mdash; El equipo',
        'day' => 'Días',
        'hour' => 'Horas',
        'minute' => 'Minutos',
        'second' => 'Segundos',
    ),
    'zh' => array(
        'title' => '网站维护',
        'heading' => '我们很快就会回来！',
        'text' => '我们正在为您改善一些事物！同时，欢迎您<a href="' . $contact_href . '">加入我们的 LinkedIn</a>进行交流或获取您所需的帮助。我们将很快恢复运行，页面将在下方倒计时结束时自动刷新。',
        'team' => '&mdash; 团队',
        'day' => '天',
        'hour' => '小时',
        'minute' => '分钟',
        'second' => '秒',
    ),
    'pt' => array(
        'title' => 'Manutenção do Site',
        'heading' => 'Voltaremos em breve!',
        'text' => 'Estamos aprimorando algumas coisas para você! Enquanto isso, sinta-se à vontade para <a href="' . $contact_href . '">se juntar a nós no nosso LinkedIn</a> para conversar ou obter a ajuda que precisa. Estaremos de volta num piscar de olhos, e a página será recarregada automaticamente ao final da contagem abaixo.',
        'team' => '&mdash; O time',
        'day' => 'Dias',
        'hour' => 'Horas',
        'minute' => 'Minutos',
        'second' => 'Segundos',
    ),
);

header('HTTP/1.1 503 Service Unavailable');
header('Content-Type: text/html; charset=utf-8');
?>

<!doctype html>
<html lang="en">
<head>
    <title><?php echo $site_title . ' - ' . $translations[$lang]['title']; ?></title>
    <meta charset="utf-8">
    <meta name="robots" content="noindex">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="assets/img/favicon.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
    * {
        box-sizing: border-box;
    }

    html, body {
        height: 100%;
    }

    body {
        font-family: 'Roboto', sans-serif;
        background: radial-gradient(circle at top, #11151b, #0d0f12);
        color: #e6e6e6;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .container {
        padding: 0 40px;
        border-radius: 16px;
        max-width: 620px;
        width: 100%;
        animation: fadeIn 0.8s ease;
    }

    img.logo {
        width: clamp(200px, 20vw, 400px);
        height: auto;
    }

    h1 {
        font-size: 36px;
        margin-bottom: 16px;
        letter-spacing: 0.5px;
    }

    p {
        font-size: 16px;
        line-height: 1.6;
        color: #cfd3da;
        margin: 16px 0;
    }

    a {
        color: #00e5ff;
        text-decoration: none;
        font-weight: 500;
    }

    a:hover {
        text-decoration: underline;
    }

    .countdown {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 32px;
    }

    .countdown div {
        min-width: 90px;
    }

    .countdown span {
        display: block;
        font-size: 34px;
        font-weight: 700;
        color: #ffffff;
    }

    .countdown label {
        font-size: 14px;
        color: #8a8f98;
        margin-top: 4px;
    }

    .social-icons {
        margin-top: 32px;
    }

    .social-icons a {
        margin: 0 12px;
        font-size: 26px;
        color: #8a8f98;
        transition: all 0.2s ease;
    }

    .social-icons a:hover {
        color: #00e5ff;
        transform: translateY(-2px);
    }

    footer {
        margin-top: 28px;
        font-size: 12px;
        color: #6c7078;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    </style>
</head>
<body>
    <div class="container">
        <?php if ($logo_exists): ?>
            <a href="<?php echo $logo_link; ?>"><img src="<?php echo $logo_path; ?>" alt="Logo" class="logo"></a>
        <?php endif; ?>
        <h1><?php echo $translations[$lang]['heading']; ?></h1>
        <div>
            <p><?php echo $translations[$lang]['text']; ?></p>
            <p><?php echo $translations[$lang]['team']; ?></p>
        </div>
        <div class="countdown">
            <div>
                <span class="day"></span>
                <label><?php echo $translations[$lang]['day']; ?></label>
            </div>
            <div>
                <span class="hour"></span>
                <label><?php echo $translations[$lang]['hour']; ?></label>
            </div>
            <div>
                <span class="minute"></span>
                <label><?php echo $translations[$lang]['minute']; ?></label>
            </div>
            <div>
                <span class="second"></span>
                <label><?php echo $translations[$lang]['second']; ?></label>
            </div>
        </div>
        <?php if ($github_link || $linkedin_link): ?>
            <div class="social-icons">
                <?php if ($github_link): ?>
                    <a href="<?php echo $github_link; ?>" target="_blank"><i class="fab fa-github"></i></a>
                <?php endif; ?>
                <?php if ($linkedin_link): ?>
                    <a href="<?php echo $linkedin_link; ?>" target="_blank"><i class="fab fa-linkedin"></i></a>
                <?php endif; ?>
            </div>
        <?php endif; ?>
        <footer>
            <?php echo $legal_info; ?>
        </footer>
    </div>
    <script>
        const maintenanceEnd = <?php echo $maintenance_end * 1000; ?>;

        const countDown = () => {
            const now = Date.now();
            const counter = maintenanceEnd - now;

            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

            const textDay = Math.floor(counter / day);
            const textHour = Math.floor((counter % day) / hour);
            const textMinute = Math.floor((counter % hour) / minute);
            const textSecond = Math.floor((counter % minute) / second);

            if (counter <= 0) {
                window.location.href = '<?php echo $redirect_url; ?>';
                return;
            }

            document.querySelector(".day").innerText = textDay;
            document.querySelector(".hour").innerText = textHour;
            document.querySelector(".minute").innerText = textMinute;
            document.querySelector(".second").innerText = textSecond;
        };

        countDown();
        setInterval(countDown, 1000);
</script>
</body>
</html>