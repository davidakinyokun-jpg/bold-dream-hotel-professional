/* =========================================================
   BOLD DREAM HOTEL — script.js
   Complete frontend functionality
   ========================================================= */

   document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initStickyHeader();
    initBackToTop();
    initSmoothScroll();
    initGalleryLightbox();
    initGalleryFilter();
    initBookingForm();
    initContactForm();
    setActiveNavLink();
  });
  
  
  /* =========================================================
     HOTEL CONTACT DETAILS
     ========================================================= */
  
  const HOTEL = {
    phone: "07087417878",
    phoneInternational: "+2347087417878",
  
    whatsapp: "07087417878",
    whatsappInternational: "2347087417878",
  
    email: "Bolddream08@gmail.com",
  
    instagram:
      "https://www.instagram.com/bolddreamhotelsuite?igsi=MWJkbDNnbzVmbDc5Ng==",
  
    tiktok:
      "https://www.tiktok.com/@bold.dream.hotel?_r=1&_t=ZS-996GeX48AXE",
  
    address:
      "3 Imasayi Street, off Foursquare Street, Ota 112101, Ogun State, Nigeria",
  
    maps:
      "https://maps.app.goo.gl/adkkCmCDGXedQD1n6"
  };
  
  
  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */
  
  function initMobileNav() {
  
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");
    const scrim = document.querySelector(".nav-scrim");
  
    if (!toggle || !nav) return;
  
    const navLinks = nav.querySelectorAll("a");
  
    function openNav() {
  
      nav.classList.add("is-open");
  
      if (scrim) {
        scrim.classList.add("is-open");
      }
  
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close navigation");
  
      document.body.style.overflow = "hidden";
    }
  
    function closeNav() {
  
      nav.classList.remove("is-open");
  
      if (scrim) {
        scrim.classList.remove("is-open");
      }
  
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
  
      document.body.style.overflow = "";
    }
  
    toggle.addEventListener("click", () => {
  
      if (nav.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
  
    });
  
    if (scrim) {
      scrim.addEventListener("click", closeNav);
    }
  
    navLinks.forEach(link => {
      link.addEventListener("click", closeNav);
    });
  
    document.addEventListener("keydown", event => {
  
      if (
        event.key === "Escape" &&
        nav.classList.contains("is-open")
      ) {
        closeNav();
        toggle.focus();
      }
  
    });
  
    window.addEventListener("resize", () => {
  
      if (window.innerWidth > 900) {
        closeNav();
      }
  
    });
  
  }
  
  
  /* =========================================================
     STICKY HEADER
     ========================================================= */
  
  function initStickyHeader() {
  
    const header = document.querySelector(".site-header");
  
    if (!header) return;
  
    function updateHeader() {
  
      if (window.scrollY > 12) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
  
    }
  
    window.addEventListener(
      "scroll",
      updateHeader,
      { passive: true }
    );
  
    updateHeader();
  
  }
  
  
  /* =========================================================
     ACTIVE NAVIGATION
     ========================================================= */
  
  function setActiveNavLink() {
  
    const links =
      document.querySelectorAll(".nav-links a");
  
    if (!links.length) return;
  
    let currentPage =
      window.location.pathname
        .split("/")
        .pop();
  
    if (!currentPage) {
      currentPage = "index.html";
    }
  
    links.forEach(link => {
  
      const href =
        link.getAttribute("href");
  
      if (!href) return;
  
      link.removeAttribute("aria-current");
  
      if (
        href.startsWith("#") ||
        href.startsWith("http")
      ) {
        return;
      }
  
      const cleanHref =
        href
          .split("?")[0]
          .split("#")[0];
  
      if (cleanHref === currentPage) {
  
        link.setAttribute(
          "aria-current",
          "page"
        );
  
      }
  
    });
  
  }
  
  
  /* =========================================================
     BACK TO TOP
     ========================================================= */
  
  function initBackToTop() {
  
    const button =
      document.querySelector(".back-to-top");
  
    if (!button) return;
  
    function updateButton() {
  
      if (window.scrollY > 500) {
        button.classList.add("is-visible");
      } else {
        button.classList.remove("is-visible");
      }
  
    }
  
    window.addEventListener(
      "scroll",
      updateButton,
      { passive: true }
    );
  
    button.addEventListener("click", () => {
  
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
  
    });
  
    updateButton();
  
  }
  
  
  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */
  
  function initSmoothScroll() {
  
    const anchors =
      document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
      );
  
    anchors.forEach(anchor => {
  
      anchor.addEventListener(
        "click",
        event => {
  
          const targetId =
            anchor.getAttribute("href");
  
          if (!targetId) return;
  
          const target =
            document.querySelector(targetId);
  
          if (!target) return;
  
          event.preventDefault();
  
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
  
        }
      );
  
    });
  
  }
  
  
  /* =========================================================
     GALLERY LIGHTBOX
     ========================================================= */
  
  function initGalleryLightbox() {
  
    const items =
      Array.from(
        document.querySelectorAll(".gallery-item")
      );
  
    const lightbox =
      document.querySelector(".lightbox");
  
    if (!items.length || !lightbox) return;
  
    const image =
      lightbox.querySelector(
        ".lightbox-inner img"
      );
  
    const caption =
      lightbox.querySelector(
        ".lightbox-caption"
      );
  
    const closeButton =
      lightbox.querySelector(
        ".lightbox-close"
      );
  
    const previousButton =
      lightbox.querySelector(
        ".lightbox-prev"
      );
  
    const nextButton =
      lightbox.querySelector(
        ".lightbox-next"
      );
  
    if (
      !image ||
      !closeButton ||
      !previousButton ||
      !nextButton
    ) {
      return;
    }
  
    let currentIndex = 0;
    let lastFocusedElement = null;
  
    function updateLightbox(index) {
  
      const item = items[index];
  
      if (!item) return;
  
      const itemImage =
        item.querySelector("img");
  
      if (!itemImage) return;
  
      currentIndex = index;
  
      image.src =
        itemImage.currentSrc ||
        itemImage.src;
  
      image.alt =
        itemImage.alt || "";
  
      if (caption) {
  
        caption.textContent =
          item.dataset.caption ||
          itemImage.alt ||
          "Bold Dream Hotel";
  
      }
  
    }
  
    function openLightbox(index) {
  
      lastFocusedElement =
        document.activeElement;
  
      updateLightbox(index);
  
      lightbox.classList.add("is-open");
  
      lightbox.setAttribute(
        "aria-hidden",
        "false"
      );
  
      document.body.style.overflow =
        "hidden";
  
      closeButton.focus();
  
    }
  
    function closeLightbox() {
  
      lightbox.classList.remove(
        "is-open"
      );
  
      lightbox.setAttribute(
        "aria-hidden",
        "true"
      );
  
      document.body.style.overflow =
        "";
  
      if (
        lastFocusedElement &&
        typeof lastFocusedElement.focus ===
          "function"
      ) {
        lastFocusedElement.focus();
      }
  
    }
  
    function nextImage() {
  
      const next =
        (currentIndex + 1) %
        items.length;
  
      updateLightbox(next);
  
    }
  
    function previousImage() {
  
      const previous =
        (currentIndex - 1 + items.length) %
        items.length;
  
      updateLightbox(previous);
  
    }
  
    items.forEach((item, index) => {
  
      item.addEventListener(
        "click",
        () => openLightbox(index)
      );
  
      item.addEventListener(
        "keydown",
        event => {
  
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
  
            event.preventDefault();
  
            openLightbox(index);
  
          }
  
        }
      );
  
    });
  
    closeButton.addEventListener(
      "click",
      closeLightbox
    );
  
    nextButton.addEventListener(
      "click",
      nextImage
    );
  
    previousButton.addEventListener(
      "click",
      previousImage
    );
  
    lightbox.addEventListener(
      "click",
      event => {
  
        if (event.target === lightbox) {
          closeLightbox();
        }
  
      }
    );
  
    document.addEventListener(
      "keydown",
      event => {
  
        if (
          !lightbox.classList.contains(
            "is-open"
          )
        ) {
          return;
        }
  
        if (event.key === "Escape") {
          closeLightbox();
        }
  
        if (event.key === "ArrowRight") {
          nextImage();
        }
  
        if (event.key === "ArrowLeft") {
          previousImage();
        }
  
      }
    );
  
  }
  
  
  /* =========================================================
     GALLERY FILTER
     ========================================================= */
  
  function initGalleryFilter() {
  
    const buttons =
      document.querySelectorAll(
        ".gallery-filter button"
      );
  
    const items =
      document.querySelectorAll(
        ".gallery-grid .gallery-item"
      );
  
    if (!buttons.length || !items.length) {
      return;
    }
  
    buttons.forEach(button => {
  
      button.addEventListener(
        "click",
        () => {
  
          const filter =
            button.dataset.filter ||
            "all";
  
          buttons.forEach(item => {
  
            item.classList.remove(
              "is-active"
            );
  
            item.setAttribute(
              "aria-pressed",
              "false"
            );
  
          });
  
          button.classList.add(
            "is-active"
          );
  
          button.setAttribute(
            "aria-pressed",
            "true"
          );
  
          items.forEach(item => {
  
            const category =
              item.dataset.category ||
              "";
  
            const show =
              filter === "all" ||
              category === filter;
  
            const parent =
              item.closest(
                ".gallery-grid-cell"
              );
  
            if (parent) {
              parent.style.display =
                show ? "" : "none";
            } else {
              item.style.display =
                show ? "" : "none";
            }
  
          });
  
        }
      );
  
    });
  
  }
  
  
  /* =========================================================
     BOOKING FORM
     ========================================================= */
  
  function initBookingForm() {
  
    const form =
      document.querySelector(
        "#booking-form"
      );
  
    if (!form) return;
  
    const successPanel =
      document.querySelector(
        ".form-success"
      );
  
    const checkIn =
      form.querySelector("#check-in");
  
    const checkOut =
      form.querySelector("#check-out");
  
    const guests =
      form.querySelector("#guests");
  
  
    /* -----------------------------------------
       Prevent past dates
       ----------------------------------------- */
  
    const today =
      new Date();
  
    const year =
      today.getFullYear();
  
    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");
  
    const day =
      String(
        today.getDate()
      ).padStart(2, "0");
  
    const todayString =
      `${year}-${month}-${day}`;
  
    if (checkIn) {
      checkIn.min =
        todayString;
    }
  
    if (checkOut) {
      checkOut.min =
        todayString;
    }
  
  
    /* -----------------------------------------
       Check-in change
       ----------------------------------------- */
  
    checkIn?.addEventListener(
      "change",
      () => {
  
        if (!checkIn.value) return;
  
        if (checkOut) {
  
          checkOut.min =
            checkIn.value;
  
          if (
            checkOut.value &&
            checkOut.value <=
              checkIn.value
          ) {
  
            checkOut.value = "";
  
          }
  
        }
  
        validateDates(
          checkIn,
          checkOut
        );
  
      }
    );
  
  
    /* -----------------------------------------
       Check-out change
       ----------------------------------------- */
  
    checkOut?.addEventListener(
      "change",
      () => {
  
        validateDates(
          checkIn,
          checkOut
        );
  
      }
    );
  
  
    /* -----------------------------------------
       Live validation
       ----------------------------------------- */
  
    const fields =
      form.querySelectorAll(
        "input, select, textarea"
      );
  
    fields.forEach(field => {
  
      field.addEventListener(
        "blur",
        () => {
          validateField(field);
        }
      );
  
      field.addEventListener(
        "input",
        () => {
  
          const group =
            field.closest(
              ".form-group"
            );
  
          if (
            group &&
            group.classList.contains(
              "has-error"
            )
          ) {
            validateField(field);
          }
  
        }
      );
  
    });
  
  
    /* -----------------------------------------
       Guest limit
       ----------------------------------------- */
  
    guests?.addEventListener(
      "input",
      () => {
  
        if (!guests.value) return;
  
        let number =
          parseInt(
            guests.value,
            10
          );
  
        if (number > 20) {
          guests.value = 20;
        }
  
        if (number < 1) {
          guests.value = 1;
        }
  
      }
    );
  
  
    /* -----------------------------------------
       Submit booking
       ----------------------------------------- */
  
    form.addEventListener(
      "submit",
      event => {
  
        event.preventDefault();
  
        const valid =
          validateBookingForm(form);
  
        if (!valid) {
  
          const firstError =
            form.querySelector(
              ".has-error input, .has-error select, .has-error textarea"
            );
  
          firstError?.focus();
  
          return;
        }
  
  
        /* ---------------------------------------
           Get booking information
           --------------------------------------- */
  
        const fullName =
          form.querySelector(
            "#full-name"
          )?.value.trim();
  
        const phone =
          form.querySelector(
            "#phone"
          )?.value.trim();
  
        const email =
          form.querySelector(
            "#email"
          )?.value.trim();
  
        const roomType =
          form.querySelector(
            "#room-type"
          )?.value;
  
        const checkInDate =
          checkIn?.value;
  
        const checkOutDate =
          checkOut?.value;
  
        const guestCount =
          guests?.value;
  
        const roomsNeeded =
          form.querySelector(
            "#rooms-needed"
          )?.value || "1";
  
        const specialRequests =
          form.querySelector(
            "#special-requests"
          )?.value.trim() ||
          "None";
  
  
        /* ---------------------------------------
           Convert room type to nice text
           --------------------------------------- */
  
        const roomNames = {
  
          standard:
            "Standard Room",
  
          deluxe:
            "Deluxe Room",
  
          suite:
            "Executive Suite",
  
          "family-suite":
            "Family Suite",
  
          "not-sure":
            "Not sure yet"
  
        };
  
        const niceRoom =
          roomNames[roomType] ||
          roomType;
  
  
        /* ---------------------------------------
           Create WhatsApp message
           --------------------------------------- */
  
        const message =
  `Hello Bold Dream Hotel,
  
  I would like to make a booking request.
  
  *GUEST DETAILS*
  Name: ${fullName}
  Phone: ${phone}
  Email: ${email}
  
  *BOOKING DETAILS*
  Room Type: ${niceRoom}
  Check-in: ${checkInDate}
  Check-out: ${checkOutDate}
  Number of Guests: ${guestCount}
  Number of Rooms: ${roomsNeeded}
  
  *SPECIAL REQUESTS*
  ${specialRequests}
  
  I understand that this is a booking request and that my reservation will only be confirmed after the hotel confirms availability and details.
  
  Thank you.`;
  
  
        const whatsappURL =
          `https://wa.me/${HOTEL.whatsappInternational}?text=${encodeURIComponent(message)}`;
  
  
        /* ---------------------------------------
           Show success message
           --------------------------------------- */
  
        form.hidden = true;
  
        if (successPanel) {
  
          const successText =
            successPanel.querySelector(
              "p"
            );
  
          if (successText) {
  
            successText.textContent =
              "Your booking request is ready. WhatsApp will open so you can send the request directly to Bold Dream Hotel.";
  
          }
  
          successPanel.classList.add(
            "is-visible"
          );
  
          successPanel.setAttribute(
            "tabindex",
            "-1"
          );
  
          successPanel.focus();
  
        }
  
  
        /* ---------------------------------------
           Open WhatsApp
           --------------------------------------- */
  
        setTimeout(() => {
  
          window.open(
            whatsappURL,
            "_blank"
          );
  
        }, 500);
  
      }
    );
  
  }
  
  
  /* =========================================================
     BOOKING VALIDATION
     ========================================================= */
  
  function validateBookingForm(form) {
  
    let valid = true;
  
    const requiredFields =
      form.querySelectorAll(
        "[required]"
      );
  
    requiredFields.forEach(field => {
  
      if (!validateField(field)) {
        valid = false;
      }
  
    });
  
  
    const checkIn =
      form.querySelector(
        "#check-in"
      );
  
    const checkOut =
      form.querySelector(
        "#check-out"
      );
  
    if (
      checkIn &&
      checkOut &&
      checkIn.value &&
      checkOut.value
    ) {
  
      if (
        !validateDates(
          checkIn,
          checkOut
        )
      ) {
        valid = false;
      }
  
    }
  
  
    const guests =
      form.querySelector(
        "#guests"
      );
  
    if (guests?.value) {
  
      const count =
        parseInt(
          guests.value,
          10
        );
  
      if (
        Number.isNaN(count) ||
        count < 1 ||
        count > 20
      ) {
  
        setFieldError(
          guests,
          "Please enter between 1 and 20 guests."
        );
  
        valid = false;
  
      }
  
    }
  
    return valid;
  
  }
  
  
  /* =========================================================
     FIELD VALIDATION
     ========================================================= */
  
  function validateField(field) {
  
    const group =
      field.closest(
        ".form-group"
      );
  
    if (!group) return true;
  
    const value =
      field.value.trim();
  
  
    /* Required */
  
    if (
      field.required &&
      value === ""
    ) {
  
      setFieldError(
        field,
        "This field is required."
      );
  
      return false;
  
    }
  
  
    /* Email */
  
    if (
      field.type === "email" &&
      value !== ""
    ) {
  
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (
        !emailPattern.test(value)
      ) {
  
        setFieldError(
          field,
          "Please enter a valid email address."
        );
  
        return false;
  
      }
  
    }
  
  
    /* Phone */
  
    if (
      field.type === "tel" &&
      value !== ""
    ) {
  
      const phonePattern =
        /^[0-9+()\-\s]{7,20}$/;
  
      if (
        !phonePattern.test(value)
      ) {
  
        setFieldError(
          field,
          "Please enter a valid phone number."
        );
  
        return false;
  
      }
  
    }
  
  
    clearFieldError(field);
  
    return true;
  
  }
  
  
  /* =========================================================
     DATE VALIDATION
     ========================================================= */
  
  function validateDates(
    checkIn,
    checkOut
  ) {
  
    if (
      !checkIn ||
      !checkOut ||
      !checkIn.value ||
      !checkOut.value
    ) {
      return true;
    }
  
  
    const checkInDate =
      new Date(
        `${checkIn.value}T00:00:00`
      );
  
    const checkOutDate =
      new Date(
        `${checkOut.value}T00:00:00`
      );
  
  
    if (
      checkOutDate <=
      checkInDate
    ) {
  
      setFieldError(
        checkOut,
        "Check-out must be after check-in."
      );
  
      return false;
  
    }
  
  
    clearFieldError(
      checkOut
    );
  
    return true;
  
  }
  
  
  /* =========================================================
     FORM ERROR HELPERS
     ========================================================= */
  
  function setFieldError(
    field,
    message
  ) {
  
    const group =
      field.closest(
        ".form-group"
      );
  
    if (!group) return;
  
    group.classList.add(
      "has-error"
    );
  
    const errorElement =
      group.querySelector(
        ".field-error"
      );
  
    if (errorElement) {
      errorElement.textContent =
        message;
    }
  
    field.setAttribute(
      "aria-invalid",
      "true"
    );
  
  }
  
  
  function clearFieldError(field) {
  
    const group =
      field.closest(
        ".form-group"
      );
  
    if (!group) return;
  
    group.classList.remove(
      "has-error"
    );
  
    const errorElement =
      group.querySelector(
        ".field-error"
      );
  
    if (errorElement) {
      errorElement.textContent =
        "";
    }
  
    field.removeAttribute(
      "aria-invalid"
    );
  
  }
  
  
  /* =========================================================
     CONTACT FORM
     ========================================================= */
  
  function initContactForm() {
  
    const form =
      document.querySelector(
        "#contact-form"
      );
  
    if (!form) return;
  
    const successPanel =
      form.parentElement?.querySelector(
        ".form-success"
      );
  
  
    /* Live validation */
  
    const fields =
      form.querySelectorAll(
        "input, textarea, select"
      );
  
    fields.forEach(field => {
  
      field.addEventListener(
        "blur",
        () => {
          validateField(field);
        }
      );
  
      field.addEventListener(
        "input",
        () => {
  
          const group =
            field.closest(
              ".form-group"
            );
  
          if (
            group &&
            group.classList.contains(
              "has-error"
            )
          ) {
            validateField(field);
          }
  
        }
      );
  
    });
  
  
    /* Submit */
  
    form.addEventListener(
      "submit",
      event => {
  
        event.preventDefault();
  
        let valid = true;
  
        const requiredFields =
          form.querySelectorAll(
            "[required]"
          );
  
        requiredFields.forEach(
          field => {
  
            if (
              !validateField(field)
            ) {
              valid = false;
            }
  
          }
        );
  
  
        if (!valid) {
  
          const firstError =
            form.querySelector(
              ".has-error input, .has-error textarea, .has-error select"
            );
  
          firstError?.focus();
  
          return;
  
        }
  
  
        /* ---------------------------------------
           Get contact information
           --------------------------------------- */
  
        const name =
          form.querySelector(
            "#contact-name"
          )?.value.trim();
  
        const email =
          form.querySelector(
            "#contact-email"
          )?.value.trim();
  
        const phone =
          form.querySelector(
            "#contact-phone"
          )?.value.trim() ||
          "Not provided";
  
        const subject =
          form.querySelector(
            "#contact-subject"
          )?.value.trim();
  
        const messageText =
          form.querySelector(
            "#contact-message"
          )?.value.trim();
  
  
        /* ---------------------------------------
           WhatsApp message
           --------------------------------------- */
  
        const message =
  `Hello Bold Dream Hotel,
  
  I have an enquiry from your website.
  
  *CONTACT DETAILS*
  Name: ${name}
  Email: ${email}
  Phone: ${phone}
  
  *SUBJECT*
  ${subject}
  
  *MESSAGE*
  ${messageText}
  
  Thank you.`;
  
  
        const whatsappURL =
          `https://wa.me/${HOTEL.whatsappInternational}?text=${encodeURIComponent(message)}`;
  
  
        /* ---------------------------------------
           Hide form
           --------------------------------------- */
  
        form.hidden = true;
  
  
        /* ---------------------------------------
           Show success
           --------------------------------------- */
  
        if (successPanel) {
  
          const successText =
            successPanel.querySelector(
              "p"
            );
  
          if (successText) {
  
            successText.textContent =
              "Your enquiry is ready. WhatsApp will open so you can send your message directly to Bold Dream Hotel.";
  
          }
  
          successPanel.classList.add(
            "is-visible"
          );
  
          successPanel.setAttribute(
            "tabindex",
            "-1"
          );
  
          successPanel.focus();
  
        }
  
  
        /* ---------------------------------------
           Open WhatsApp
           --------------------------------------- */
  
        setTimeout(() => {
  
          window.open(
            whatsappURL,
            "_blank"
          );
  
        }, 500);
  
      }
    );
  
  }
  
  
  /* =========================================================
     AUTO-CONNECT HOTEL CONTACT LINKS
     ========================================================= */
  
  function initHotelContactLinks() {
  
    /* Phone */
  
    document
      .querySelectorAll(
        '[data-hotel-phone]'
      )
      .forEach(element => {
  
        element.href =
          `tel:${HOTEL.phoneInternational}`;
  
      });
  
  
    /* WhatsApp */
  
    document
      .querySelectorAll(
        '[data-hotel-whatsapp]'
      )
      .forEach(element => {
  
        element.href =
          `https://wa.me/${HOTEL.whatsappInternational}`;
  
        element.target =
          "_blank";
  
        element.rel =
          "noopener noreferrer";
  
      });
  
  
    /* Email */
  
    document
      .querySelectorAll(
        '[data-hotel-email]'
      )
      .forEach(element => {
  
        element.href =
          `mailto:${HOTEL.email}`;
  
      });
  
  
    /* Instagram */
  
    document
      .querySelectorAll(
        '[data-hotel-instagram]'
      )
      .forEach(element => {
  
        element.href =
          HOTEL.instagram;
  
        element.target =
          "_blank";
  
        element.rel =
          "noopener noreferrer";
  
      });
  
  
    /* TikTok */
  
    document
      .querySelectorAll(
        '[data-hotel-tiktok]'
      )
      .forEach(element => {
  
        element.href =
          HOTEL.tiktok;
  
        element.target =
          "_blank";
  
        element.rel =
          "noopener noreferrer";
  
      });
  
  
    /* Google Maps */
  
    document
      .querySelectorAll(
        '[data-hotel-maps]'
      )
      .forEach(element => {
  
        element.href =
          HOTEL.maps;
  
        element.target =
          "_blank";
  
        element.rel =
          "noopener noreferrer";
  
      });
  
  }
  
  
  /* =========================================================
     INITIALISE CONTACT LINKS
     ========================================================= */
  
  initHotelContactLinks();
  
  
  /* =========================================================
     END OF SCRIPT
     ========================================================= */