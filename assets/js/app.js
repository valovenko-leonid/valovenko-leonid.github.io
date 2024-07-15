(()=>{var e={206:()=>{class e{constructor(e){let{handContainer:t,handBg:n,handMask:o,handImg:i,stickyMenuLink:l,burgerMenuBtn:s,burgerMenuBtnExit:d,popupMenu:a,menuStick:r,container:c,bodyContainer:h,btnOpenModal:u,btnCloseModal:m,modalCallback:g,modalInfo:y,modalForm:p}=e;this.elements={handContainer:document.querySelector("."+t),handBg:document.querySelector("."+n),handMask:document.querySelector("."+o),handImg:document.querySelector("."+i),stickyMenuLink:[...document.querySelectorAll("."+l+" a")],burgerMenuBtn:document.querySelector("."+s),burgerMenuBtnExit:document.querySelector("."+d),popupMenu:document.querySelector("."+a),menuStick:document.querySelector(r),container:document.querySelector(c),bodyContainer:document.querySelector(h),btnOpenModal:document.querySelectorAll(u),btnCloseModal:document.querySelectorAll(m)},this.modals={modalCallback:document.getElementById(g),modalInfo:document.getElementById(y),modalForm:document.getElementById(p)},this.handResizeBlocks(),this.handAnimation(),this.attachEventListeners(),this.handlerStickMenu()}toggleModal(e){const{bodyContainer:t}=this.elements;e&&("none"===e.style.display||""===e.style.display?(e.style.display="flex",t.style.overflow="hidden"):(e.style.display="none",t.style.overflow="auto"))}closeModal(e){const{bodyContainer:t}=this.elements;e&&(e.style.display="none",t.style.overflow="auto")}handAnimation(){const{handImg:e}=this.elements;if(!e)return;new IntersectionObserver(((t,n)=>{t.forEach((t=>{t.isIntersecting?e.style.transform="translateY(-40px)":e.style.transform="translateY(0px)"}))}),{root:null,rootMargin:"0px",threshold:.1}).observe(e)}handOpenMenu(){const{popupMenu:e}=this.elements;e&&e.classList.add("menu-active")}handCloseMenu(){const{popupMenu:e}=this.elements;console.log(e),e&&e.classList.remove("menu-active")}handResizeBlocks(){const{handContainer:e,handBg:t,handMask:n}=this.elements;if(!(e&&t&&n))return;const o=e.getBoundingClientRect(),i=window.scrollY+o.bottom,l=window.innerWidth-(window.scrollX+o.left)-20;t.style.height=`${i}px`,t.style.width=`${l}px`,n.style.height=`${i}px`,n.style.width=`${l}px`}handlerOpenModal(e){const t=e.target.dataset.modal,{[t]:n}=this.modals;this.toggleModal(n)}handlerCloseModal(e){const{...t}=this.modals;for(let e in t)this.closeModal(t[e])}handlerClickOutbounceModal(e){const{...t}=this.modals;for(let n in t)if(e.target==t[n])return void this.toggleModal(t[n])}handlerStickMenu(){const{container:e,menuStick:t}=this.elements,n=e.getBoundingClientRect();t.getBoundingClientRect();(window.pageYOffset||document.documentElement.scrollTop)>=140?t.classList.add("fixed"):t.classList.remove("fixed");const o=window.innerWidth-n.right-100;t.style.right=o+"px"}handlerAddSmoothScroll(e,t){t.preventDefault();const n=e.getAttribute("href");if(n){const e=document.querySelector(n);e&&e.scrollIntoView({behavior:"smooth"})}}handlerChangeContact(e){const t=document.querySelectorAll(".form_phone_container"),n=document.querySelectorAll(".form_email_container");console.log(t),"phone"===e.target.value?(t.forEach((e=>{e.classList.remove("input_hidden")})),n.forEach((e=>{e.classList.add("input_hidden")}))):"email"===e.target.value&&(n.forEach((e=>{e.classList.remove("input_hidden")})),t.forEach((e=>{e.classList.add("input_hidden")})))}handlerHighlightCurrentSection(){let e=document.querySelectorAll("section"),t=document.documentElement.scrollTop||document.body.scrollTop;(e||t)&&e.forEach((e=>{t>=e.offsetTop-e.offsetHeight/3&&t<e.offsetTop+e.offsetHeight-e.offsetHeight/3&&document.querySelectorAll(".sticky-menu-link").forEach((t=>{const n=t.querySelector("a");if(n){t.classList.remove("sticky-menu-link-active");e.getAttribute("id")===(n.getAttribute("href")?.substring(1)??"")&&t.classList.add("sticky-menu-link-active")}}))}))}attachEventListeners(){const{stickyMenuLink:e,burgerMenuBtn:t,burgerMenuBtnExit:n,btnOpenModal:o,btnCloseModal:i}=this.elements;t&&t.addEventListener("click",this.handOpenMenu.bind(this)),n&&n.addEventListener("click",this.handCloseMenu.bind(this)),o.forEach((e=>{e.addEventListener("click",this.handlerOpenModal.bind(this))})),i.forEach((e=>{e.addEventListener("click",this.handlerCloseModal.bind(this))})),window.addEventListener("click",this.handlerClickOutbounceModal.bind(this)),window.addEventListener("resize",this.handResizeBlocks.bind(this)),window.addEventListener("resize",this.handlerStickMenu.bind(this)),window.addEventListener("scroll",this.handlerHighlightCurrentSection.bind(this)),window.addEventListener("scroll",this.handlerStickMenu.bind(this)),e&&e.forEach((e=>{e.addEventListener("click",(t=>{this.handlerAddSmoothScroll(e,t)}))}));document.querySelectorAll(".contact_method").forEach((e=>{e.addEventListener("change",this.handlerChangeContact.bind(this))}))}}document.addEventListener("DOMContentLoaded",(()=>{new e({handContainer:"js-hand-img",handBg:"js-hand-img-bg",handMask:"hand-mask-container",handImg:"hand-img",stickyMenuLink:"sticky-menu-link",burgerMenuBtn:"burger-menu",burgerMenuBtnExit:"menu_exit img",popupMenu:"popup_menu",menuStick:".sticky-menu",container:".container",bodyContainer:"body",btnOpenModal:".js-openModalBtn",btnCloseModal:".close",modalCallback:"modalCallback",modalInfo:"modalInfo",modalForm:"modalForm"})}))}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,n),l.exports}(()=>{"use strict";n(206)})()})();