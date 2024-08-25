function initMenuDropdown() {
    document.querySelectorAll('.nav__list-item').forEach(li => {
        if (li.querySelector('.nav__dropdown')) {
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                li.querySelector('.nav__dropdown').classList.toggle('active');
            })
            document.addEventListener('click', (e) => {
                if (li.querySelector('.active')) {
                    li.querySelector('.nav__dropdown').classList.remove('active');
                }
            })
        }
    })
}
initMenuDropdown();



function initBurgerMenu() {
    const hamburger = document.querySelector(".hamburger"),
          menu = document.querySelector(".nav"),
          menuItem = document.querySelectorAll(".nav__list-item"),
          dropdownLinks = document.querySelectorAll(".nav__dropdown-link");
    hamburger.addEventListener("click", () => {
        if (hamburger.classList.contains("hamburger_active")) {
            hideMenu()
        } else {
            menu.style.left = "0";
            hamburger.classList.add("hamburger_active");
            menuItem.forEach(item => {
                item.addEventListener("click", () => {
                    if(!item.classList.contains("nav__item-dropdown")) {
                        hideMenu()
                    } else {
                        dropdownLinks.forEach(link => {
                            link.addEventListener("click", hideMenu)
                        })
                    }
                });
            })
        }
    })
    function hideMenu() {
        menu.style.left = "-100%";
        hamburger.classList.remove("hamburger_active"); 
    }
}
initBurgerMenu();




function initSlider() {
    const slider = document.querySelector('#slider-square');
    let sliderValue;
    noUiSlider.create(slider, {
        start: 68,
        connect: 'lower',
        step: 1,
        range: {
            min: 1,
            max: 200
        }
    });
    const squareValue = document.getElementById("sliderValue");
    sliderValue = parseInt(slider.noUiSlider.get());
    squareValue.innerHTML = sliderValue + `м&sup2;`;
    slider.noUiSlider.on('slide', function() {
        sliderValue = parseInt(slider.noUiSlider.get());
        squareValue.innerHTML = sliderValue + `м&sup2;`;
    });
}
initSlider();




function scrollBgImage() {
    const bgImage = document.querySelector('.main__bg-image');
    const html = document.documentElement;
    const body = document.body;     // Safari
    const bgImageRight = parseInt(window.getComputedStyle(bgImage).getPropertyValue("right"));

    function moveToRight(el, space, startRight) {
        el.style.right = `${startRight - space}px`;
    }
      
      // Код будет срабатывать раз в 0.2 секунд
    document.addEventListener('scroll', throttle(function() {
        moveToRight(bgImage, html.scrollTop, bgImageRight);
        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
            moveToRight(bgImage, body.scrollTop, bgImageRight);     //Safari
        }
    }, 200))

    // ограничение операций scroll
    function throttle (func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan))
            }
        }
    }
}
scrollBgImage()



// prevent.default
const formBtns = document.querySelectorAll('form .btn');
formBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
    });
});




// showModal
document.querySelector(".modal-trigger").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "flex";
});
document.querySelector(".modal__close").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
});
