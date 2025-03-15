(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document
    .querySelectorAll(".carousel-indicators")
    .forEach((carouselIndicator) => {
      carouselIndicator
        .closest(".carousel")
        .querySelectorAll(".carousel-item")
        .forEach((carouselItem, index) => {
          if (index === 0) {
            carouselIndicator.innerHTML += `<li data-bs-target="#${
              carouselIndicator.closest(".carousel").id
            }" data-bs-slide-to="${index}" class="active"></li>`;
          } else {
            carouselIndicator.innerHTML += `<li data-bs-target="#${
              carouselIndicator.closest(".carousel").id
            }" data-bs-slide-to="${index}"></li>`;
          }
        });
    });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

function sendMail(event) {
  event.preventDefault();
  console.log("task cheskthunna");
  const getValue = (id) => {
    return document.getElementById(id).value;
  };

  const emptyValue = (id) => {
    document.getElementById(id).value = "";
  };

  const idList = ["name", "email", "subject", "message"];

  let params = {};
  idList.forEach((id) => {
    params[id] = getValue(id);
  });

  const serviceId = "service_24kj1bd";
  const templateId = "template_sojlfyj";

  const loadingDiv = document.querySelector(".loading");
  const errorDiv = document.querySelector(".error-message");
  const successDiv = document.querySelector(".sent-message");
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;

  // Show loading state
  loadingDiv.style.display = "block";
  errorDiv.style.display = "none";
  successDiv.style.display = "none";

  // Validate fields
  if (!params.name || !params.email || !params.subject || !params.message) {
    loadingDiv.style.display = "none";
    errorDiv.style.display = "block";
    errorDiv.innerText = "Please fill in all fields.";
    submitBtn.disabled = false; // Re-enable button
    return;
  }

  emailjs
    .send(serviceId, templateId, params)
    .then((response) => {
      loadingDiv.style.display = "none";
      successDiv.style.display = "block";
      console.log("Email sent successfully!", response);
      idList.forEach((id) => emptyValue(id));
    })

    .catch((error) => {
      loadingDiv.style.display = "none";
      errorDiv.innerText = "Your message could not be sent. Please try again.";
      errorDiv.style.display = "block";
      console.error("Failed to send email", error);
    })
    .finally(() => {
      submitBtn.disabled = false; // Re-enable button after success/failure
    });
}

function sendMail() {
  event.preventDefault();

  const getValue = (id) => {
    return document.getElementById(id).value;
  };
  const emptyValue = (id) => {
    document.getElementById(id).value = "";
  };

  const idList = ["name", "email", "subject", "message"];

  let params = {};
  idList.forEach((id) => {
    params[id] = getValue(id);
  });

  const serviceId = "service_6v6n2oa";
  const templateId = "template_ge7fuqi";

  const loadingDiv = document.querySelector(".loading");
  const errorDiv = document.querySelector(".error-message");
  const successDiv = document.querySelector(".sent-message");
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;

  // Show loading state
  loadingDiv.style.display = "block";
  errorDiv.style.display = "none";
  successDiv.style.display = "none";

  // Validate fields
  if (!params.name || !params.email || !params.subject || !params.message) {
    loadingDiv.style.display = "none";
    errorDiv.style.display = "block";
    errorDiv.innerText = "Please fill in all fields.";
    submitBtn.disabled = false; // Re-enable button
    return;
  }

  emailjs
    .send(serviceId, templateId, params)
    .then((response) => {
      loadingDiv.style.display = "none";
      successDiv.style.display = "block";
      console.log("Email sent successfully!", response);
      idList.forEach((id) => emptyValue(id));
    })
    .catch((error) => {
      loadingDiv.style.display = "none";
      errorDiv.innerText = "Your message could not be sent. Please try again.";
      errorDiv.style.display = "block";
      console.log("Failed to send email", error);
    })
    .finally(() => {
      submitBtn.disabled = false; // Re-enable button after success/failure
    });
}
