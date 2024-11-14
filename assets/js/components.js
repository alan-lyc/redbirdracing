import dialogPolyfill from "./dialog-polyfill.esm.js";

// https://developer.mozilla.org/en-US/docs/Web/API/Web_components
// 
// Web Component is a way to make custom elements without using a framework.
// You define a components using a class that inherits `HTMLElement`.
// In the connectedCallback of the class, you modify the elment's DOM tree to make it look like how you want it to be.
// Usually, you use a shadow DOM (read the MDN article for more).
// If the custom element contains a <slot>, children of the custom element is rendered inside it.
//
// For example, if this is the custom element's DOM (you use an open shadow dom):
// <div>
//     <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=GYnAxwkqnuHHNVNE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
//     <slot></slot>
// </div>
// 
// And you write:
// <custom-element>
//     <button>Click Me</button>
// </custom-element>
//
// Then you something like this:
// <custom-element>
//     #shadow-root (open)
//     |   <div>
//     |       <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=GYnAxwkqnuHHNVNE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
//     |       <slot>
//     |           <!-- this is in the normal DOM -->
//     |           <button>Click Me</button>
//     |       </slot>
//     |   </div>
// </custom-element>
//
// You can also fetch an html file and put the content inside the custom element.

class PageLayout extends HTMLElement {
	constructor() {
		super()
	}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: "open" });
		fetch("/assets/templates/page-layout.html")
			.then(res => res.text())
			.then(res => {
				shadow.innerHTML = res;
			})
	}
}
customElements.define("page-layout", PageLayout);

class PageLayoutHeader extends HTMLElement {
	static observedAttributes = ["home-page"];

	constructor() {
		super()
	}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: "open" });
		fetch("/assets/templates/page-layout-header.html")
			.then(res => res.text())
			.then(res => {
				shadow.innerHTML = res;

				// replace the link to the current page with a highlighted <span>
				/** @type {HTMLAnchorElement[]} */
				const links = [...shadow.getElementById("header-sitemap")?.getElementsByTagName("a")];
				const currentPageLink = links.find(v => v.href == document.location.href);
				if (currentPageLink) {
					const span = document.createElement('span');
					span.textContent = currentPageLink.textContent;
					currentPageLink.replaceWith(span)
				}

				// do the same thing with the links inside the <dialog> sidebar
				const links2 = [...shadow.querySelector("#sidebar-sitemap > nav")?.getElementsByTagName("a")];
				const currentPageLink2 = links2.find(v => v.href == document.location.href);
				if (currentPageLink2) {
					const span = document.createElement('span');
					span.textContent = currentPageLink2.textContent;
					span.style.fontWeight = "600";
					currentPageLink2.replaceWith(span)
				}

				/** @type {HTMLDialogElement} */
				const dialog = shadow.getElementById("sidebar-sitemap");
				dialogPolyfill.registerDialog(dialog);
				const showDialog = () => {
					// dialog.style.top = `${this.shadowRoot.host.ownerDocument.documentElement.scrollTop}px`;
					dialog.showModal();
					setTimeout(() => {
						dialog.style.left = '0px'
					}, 50);
				};
				const closeDialog = () => {
					dialog.style.left = `-${dialog.style.width}`;
					setTimeout(() => dialog.close(), +getComputedStyle(dialog).transitionDuration.replace('ms', '').replace('s', 'e3'))
				};
				shadow.getElementById("header-hamburger").addEventListener('click', () => {
					console.log('hi')
					showDialog()
				});
				shadow.getElementById("sidebar-back-button").addEventListener('click', closeDialog);
				dialog.addEventListener('click', (event) => {
					// the <nav> inside the dialog fills the entire visible dialog
					// if the event target is the dialog, and not the <nav> element,
					// then the event is fired because the dialog's backdrop received the click,
					// not the dialog itself
					// therefore, the click is outside the actual sidebar, so we can close it
					//
					// might not work for the polyfill, but that isn't a big deal
					if (event.target == dialog) {
						closeDialog();
					}
				});

				this.applyHomePageStyle();
			})
	}

	applyHomePageStyle() {
		// the element is not yet loaded
		if (!this.shadowRoot) return;

		if (this.hasAttribute('home-page')) {
			this.shadowRoot.getElementById('header').setAttribute('data-is-home-page', '')
		} else {
			this.shadowRoot.getElementById('header').removeAttribute('data-is-home-page')
		}
	}

	attributeChangedCallback() {
		this.applyHomePageStyle()
	}

	get height() {
		return this.shadowRoot.getElementById('header').offsetHeight;
	}
}
customElements.define("page-layout-header", PageLayoutHeader);

class PageLayoutFooter extends HTMLElement {
	constructor() {
		super()
	}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: "open" });
		fetch("/assets/templates/page-layout-footer.html")
			.then(res => res.text())
			.then(res => shadow.innerHTML = res)
	}
}
customElements.define("page-layout-footer", PageLayoutFooter);

class ChevronRight extends HTMLElement {
	constructor() {
		super()
	}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: "open" });
		fetch("/assets/templates/chevron-right.html")
			.then(res => res.text())
			.then(res => shadow.innerHTML = res);
	}
}
customElements.define("chevron-right", ChevronRight);