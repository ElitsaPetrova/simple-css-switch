function simpleCssSwitch(theme) {
    var scsssStyles = {
        "default" : {
            title: "themes",
            numbers: false,
            titles: true
        },
        "themes-numbers" : {
            title: "themes",
            numbers: true,
            titles: false
        },
        "themes-all" : {
            title: "themes",
            numbers: true,
            titles: true
        },
        "numbers" : {
            title: "undefined",
            numbers: true,
            titles: false
        },
        "titles" : {
            title: "undefined",
            numbers: false,
            titles: true
        }
    };
    var choosenStyle = "default";
    if (theme && scsssStyles[theme]) {
        choosenStyle = theme;
    }
    var stylesMenuContainer = document.getElementById('s-css-s--menu');
    stylesMenuContainer.classList.add('s-css-s-style--' + choosenStyle);
    var styleButtons = [];

    var menuTitle = document.createElement('div');
    menuTitle.setAttribute("id", "s-css-s--menu-title");
    menuTitle.innerText = 'Themes';
    stylesMenuContainer.appendChild(menuTitle);

    var menuWrap = document.createElement('div');
    menuWrap.classList.add('s-css-s--wrapper');

    var stylesAvailable = Array.prototype.slice.call(
        document.querySelectorAll('.s-css-s--style')
    );
    stylesAvailable.forEach(function(style, idx) {
        var cssFileAsClass = 's-css-s--' + style.href.split('/').pop().replace('.', '-');
        var styleOptionButton = document.createElement('button');
        styleOptionButton.setAttribute('title', style.title);
        styleOptionButton.classList.add('s-css-s--button', cssFileAsClass);
        styleOptionButton.innerHTML = '<span class="s-css-s--idx">' +  idx + '</span>';
        styleOptionButton.innerHTML += '<span class="s-css-s--title">' +  style.title + '</span>';
        styleOptionButton.addEventListener(
            'click', function(e) {
                chooseStyle(style.title);
                markActiveButton(e.target);
            });
        stylesMenuContainer.appendChild(menuWrap);
        styleButtons.push(styleOptionButton);
        menuWrap.appendChild(styleOptionButton);
    });

    menuTitle.addEventListener(
        'click', function() {
            menuWrap.classList.toggle("s-css-s--menu-visible");
        });

    var activeStyle = localStorage.getItem('s-css-s--active-style');
    if (activeStyle) {
        styleButtons.forEach(function(btn){
            if (btn.title === activeStyle) {
                btn.click();
            }
        });
    }

    function markActiveButton(clicked) {
        styleButtons.forEach(function(btn){
            btn.classList.remove('s-css-s--active-style');
        });
        clicked.classList.add('s-css-s--active-style');
    }

    function chooseStyle(styleTitle) {
        stylesAvailable.forEach(function(style){
            style.disabled = true;
            if (style.title === styleTitle) {
                style.disabled = false;
                localStorage.setItem('s-css-s--active-style', styleTitle);
            }
        });
    }

}
