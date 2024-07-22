class Landing {
    constructor({
        handContainer,
        handBg,
        handMask,
        handImg,
        stickyMenuLink,
        burgerMenuBtn,
        burgerMenuBtnExit,
        popupMenu,
        menuStick,
        container,
        bodyContainer,
        btnOpenModal,
        btnCloseModal,
        modalCallback,
        modalInfo,
        modalForm,
        modalPersonalData,
        modalOffer,
        modalPolicy
    }) {
        this.elements = {
            handContainer: document.querySelector('.' + handContainer),
            handBg: document.querySelector('.' + handBg),
            handMask: document.querySelector('.' + handMask),
            handImg: document.querySelector('.' + handImg),
            stickyMenuLink: [...document.querySelectorAll('.' + stickyMenuLink + ' a')],
            burgerMenuBtn: document.querySelector('.' + burgerMenuBtn),
            burgerMenuBtnExit: document.querySelector('.' + burgerMenuBtnExit),
            popupMenu: document.querySelector('.' + popupMenu),
            menuStick: document.querySelector(menuStick),
            container: document.querySelector(container),
            bodyContainer: document.querySelector(bodyContainer),
            btnOpenModal: document.querySelectorAll(btnOpenModal),
            btnCloseModal: document.querySelectorAll(btnCloseModal),
            headerBlock: document.querySelector('header'),

            btnSend: document.querySelectorAll('.js-button-send'),
        };

        this.modals = {
            modalCallback: document.getElementById(modalCallback),
            modalInfo: document.getElementById(modalInfo),
            modalForm: document.getElementById(modalForm),
            modalPersonalData: document.getElementById(modalPersonalData),
            modalOffer: document.getElementById(modalOffer),
            modalPolicy: document.getElementById(modalPolicy),
        }

        this.selectsSelector = document.querySelectorAll('.contact_method'),

        this.selects = [];

        this.selectsSelector.forEach((select)=>{
            let el = new SlimSelect({
                select: select,
                settings: {
                  showSearch: false,
                }
              });

              this.selects.push(el);
        });

        
        this.handAnimation();
        this.attachEventListeners();
        this.handlerStickMenu();
    }

    toggleModal(modal) {
        const { bodyContainer } = this.elements;

        if (modal) {
            if (modal.style.display === 'none' || modal.style.display === '') {
                modal.style.display = 'flex';
                bodyContainer.style.overflow = "hidden";
            } else {
                modal.style.display = 'none';
                bodyContainer.style.overflow = "auto";
            }
        }
    }

    closeModal(modal) {
        const { bodyContainer } = this.elements;


        const inputs = modal.querySelectorAll('input');
        const inputsEmail = modal.querySelectorAll('.email_container');
        const inputsPhone = modal.querySelectorAll('.phone_container');
        const inputsAnother = modal.querySelectorAll('.another_container');

        const form = modal.querySelector('form');
        const success = modal.querySelector('.success_form');
        
        inputsEmail.forEach((input)=>{
            if(!input.classList.contains('input_hidden')){
                input.classList.add("input_hidden");
            }
        });
        inputsPhone.forEach((input)=>{
            if(!input.classList.contains('input_hidden')){
                input.classList.add("input_hidden");
            }
    
        });
        inputsAnother.forEach((input)=>{
            if(!input.classList.contains('input_hidden')){
                input.classList.add("input_hidden");
            }

        });
        inputs.forEach((input)=>{
            input.value = '';
    
        });
        //phone_container email_container another_container
        this.selects.forEach((select)=>{
            select.setSelected('');
        })
        // selects.forEach((select)=>{
        //     select.value = '';
        // });
        


        if (modal) {
            if(success){
                success.style.display = 'none';
                form.style.display = '';
            }
            
            modal.style.display = 'none';
            bodyContainer.style.overflow = "auto";
        }
    }

    handAnimation() {
        const { handImg } = this.elements;
        if (!handImg) { return }

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    handImg.style.transform = 'translateY(-40px)';
                } else {

                    handImg.style.transform = 'translateY(0px)';
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(handImg);
    }

    handOpenMenu() {
        const { popupMenu } = this.elements;



        if (popupMenu) {
            popupMenu.classList.add('menu-active');

        }
    }
    handCloseMenu() {
        const { popupMenu } = this.elements;


        if (popupMenu) {
            popupMenu.classList.remove('menu-active');
        }
    }
    
    handResizeBlocks() {

        const { handContainer, handBg, handMask } = this.elements;

        if (!(handContainer && handBg && handMask)) { return }

        const rect = handContainer.getBoundingClientRect();

        const blockBottomToTop = window.scrollY + rect.bottom;

        const blockLeftToRight = window.innerWidth - (window.scrollX + rect.left) - 20;

        handBg.style.height = `${blockBottomToTop}px`;
        handBg.style.width = `${blockLeftToRight}px`;

        handMask.style.height = `${blockBottomToTop}px`;
        handMask.style.width = `${blockLeftToRight}px`;
    }
    handlerOpenModal(event) {
        const modal = event.target.dataset.modal;
        const { [modal]: currentModal } = this.modals;
        this.toggleModal(currentModal);
    }

    handlerCloseModal(event) {
        const { ...models } = this.modals;
        
        const currentModal = event.target.closest('.modal').id;

        this.closeModal(models[currentModal]);
    }
    handlerClickOutbounceModal(event) {
        const { ...models } = this.modals;

        for (let model in models) {

            if (event.target == models[model]) {
                this.closeModal(models[model]);
                return;
            }
        }
    }

    handlerStickMenu() {

        const { container, menuStick } = this.elements;
        const rectContainer = container.getBoundingClientRect();

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const initialOffsetTop = 140;

        if (scrollTop >= initialOffsetTop) {

            menuStick.classList.add('fixed');
        } else {
            menuStick.classList.remove('fixed');
        }

        const distanceFromRight = window.innerWidth - rectContainer.right - 116; 

        menuStick.style.right = distanceFromRight + 'px';
    }
    sendForm(e){
        let modal = e.target.closest('.modal');
        if(!modal){ modal = e.target.closest('.section_callback');}
        const form = modal.querySelector('form');
        const success = modal.querySelector('.success_form');

        const data = new FormData(form);
        //data send to bitrix24 for lead

        success.style.display = 'flex';
        form.style.display = 'none';

        setTimeout(()=>{
            if(modal.classList.contains("modal") && modal.style.display != 'none' && success.style.display != 'none'){
                this.closeModal(modal);
            }
        },2100);

    }
    handlerAddSmoothScroll(btn,event) {
        event.preventDefault();
        const href = btn.getAttribute('href');

        if(href){
            const elementToScroll = document.querySelector(href);
            if (elementToScroll) {
                elementToScroll.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }

    handlerChangeContact(e){
            const form = e.target.closest('form');
            const codeField = e.target.dataset.code;


            const phoneContainer = form.querySelector('.phone_container[data-code='+codeField+']');
            const emailContainer = form.querySelector('.email_container[data-code='+codeField+']');
            const anotherContainer = form.querySelector('.another_container[data-code='+codeField+']');



            if (e.target.value === 'phone') {
                phoneContainer.classList.remove('input_hidden');
                anotherContainer.classList.add('input_hidden');
                emailContainer.classList.add('input_hidden');

            } else if (e.target.value === 'email') {
                emailContainer.classList.remove('input_hidden');
                anotherContainer.classList.add('input_hidden');
                phoneContainer.classList.add('input_hidden');
            }else if (e.target.value === 'another') {
                anotherContainer.classList.remove('input_hidden');
                emailContainer.classList.add('input_hidden');
                phoneContainer.classList.add('input_hidden');
            }
    }
    handlerHighlightCurrentSection() {
        let sections = document.querySelectorAll('section');
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        if (!sections && !scrollPosition) { return }
        sections.forEach(section => {
            if (
                scrollPosition >= section.offsetTop - section.offsetHeight / 3 &&
                scrollPosition < section.offsetTop + section.offsetHeight - section.offsetHeight / 3
            ) {
                document.querySelectorAll('.sticky-menu-link').forEach(link => {
                    const a = link.querySelector('a');
                    if (a) {
                        link.classList.remove('sticky-menu-link-active');

                        const sectionId = section.getAttribute('id');
                        const href = a.getAttribute('href')?.substring(1) ?? '';

                        if (sectionId === href) {
                            link.classList.add('sticky-menu-link-active');
                        }
                    }

                });
            }
        });
    }
    setFixedMenu(){
        const { headerBlock,bodyContainer } = this.elements;

        const rect = headerBlock.getBoundingClientRect();

        if (window.scrollY > 30) {
            headerBlock.classList.add('header_scrolled');

            const fullheight = rect.height + 30

            bodyContainer.style.paddingTop = fullheight + 'px';
        } else {
            headerBlock.classList.remove('header_scrolled');
            bodyContainer.style.paddingTop = '0px';
        }
    }

    attachEventListeners() {
        const { stickyMenuLink, burgerMenuBtn, burgerMenuBtnExit, btnOpenModal, btnCloseModal,btnSend,popupMenu} = this.elements;

        const menuItemsMobile = popupMenu.querySelectorAll(".grid-template .item");

        menuItemsMobile.forEach((item)=>{
            item.addEventListener('click', this.handCloseMenu.bind(this))
        });


        btnSend.forEach((btn)=>{
            btn.addEventListener('click', this.sendForm.bind(this));
        })
        

        if (burgerMenuBtn) {
            burgerMenuBtn.addEventListener('click', this.handOpenMenu.bind(this));
        }
        if (burgerMenuBtnExit) {
            burgerMenuBtnExit.addEventListener('click', this.handCloseMenu.bind(this));
        }


        btnOpenModal.forEach((btn) => {
            btn.addEventListener('click', this.handlerOpenModal.bind(this));
        });

        btnCloseModal.forEach((btn) => {
            btn.addEventListener('click', this.handlerCloseModal.bind(this));
        });

        window.addEventListener('click', this.handlerClickOutbounceModal.bind(this));


        window.addEventListener('scroll', this.setFixedMenu.bind(this));

        window.addEventListener('scroll', this.handlerHighlightCurrentSection.bind(this));

        window.addEventListener('resize', this.handlerStickMenu.bind(this));
        window.addEventListener('scroll', this.handlerStickMenu.bind(this));


        if (stickyMenuLink) {
            stickyMenuLink.forEach(btn => {
                btn.addEventListener('click', (event)=>{this.handlerAddSmoothScroll(btn,event)});
            });
        }

        const contactMethod = document.querySelectorAll('.contact_method');

        contactMethod.forEach((contMethod)=>{
            contMethod.addEventListener('change', this.handlerChangeContact.bind(this));
        });

    }

}

document.addEventListener('DOMContentLoaded', () => {

    new Landing({
        handContainer: 'js-hand-img',
        handBg: 'js-hand-img-bg',
        handMask: 'hand-mask-container',
        handImg: 'hand-img',
        stickyMenuLink: 'sticky-menu-link',
        burgerMenuBtn: 'burger-menu',
        burgerMenuBtnExit: 'menu_exit img',
        popupMenu: 'popup_menu',
        menuStick: '.sticky-menu',
        container: '.container',
        bodyContainer: 'body',
        btnOpenModal: '.js-openModalBtn',
        btnCloseModal: '.close',
        modalCallback: "modalCallback",
        modalInfo: "modalInfo",
        modalForm: "modalForm",
        modalPersonalData: "modalPersonalData",
        modalOffer: "modalOffer",
        modalPolicy: "modalPolicy"
    })

});
