# redbirdracing.github.io

This is my version of the website

> [!IMPORTANT]
> readme

> [!CAUTION]
> **Tasks not completed**
> - There is no event
>   * what tf is that
> - There is no news
>   * using 2022 news instead
> - The introduction
>   * revise if you want
> - What does the selected pictures mean
>   * there is no alt text or description
> - Current sponsors
>   * using old sponsors instead

## Potential Improvement
**If we can use a (meta)framework**, then the website performance and our workflow could potentially be improved. Currently, I am using Web Component to avoid having to copy and paste *every single time* when we change the page layout. However, because for code reusability, I used JavaScript is used to `fetch` the component's source code (e.g. `page-layout.html`) at runtime, there will be a visible layout shift when the component is loaded.

Using a framework, such as SvelteKit (with the static renderer) or Astro, we can use layouts/components without worrying about JavaScript, because everything is prerendered. Also, I am not *entirely* sure, but a static renderer could in theory prerender static json imports for us. In other words, instead of populating the news/sponsors page in the browser, the page is rendered at build time.

>[!NOTE]
> This is not SSR, a server is not needed.

Using a framework also allow us to write the website declaratively. For example, instead of 
```js
for (const sponsor of sponsors) {
	const el = document.createElement('a');
	el.href = sponsor.link;
	el.textContent = sponsor.name;
	el.classList.add('image');
	container.appendChild(el);
}
```
We can just write 
```svelte
{#each sponsors as sponsor}
	<a class="image" href="{sponsor.link}">{sponsor.name}</a>
{/each}
```

Of course, this is just my opinion and you can disagree. JavaScript frameworks are usually opinioned, and you might think that requiring NodeJS to write a simple website like this is overkill. And not everyone want to learn a new technology that isn't even that popular (because React is, annoyingly, still the most popular option due to existing adoption). Also, switching frameworks is difficult, and if in the future we realized a framework is not suitable to us, it will be incredibly frustrating to switch. I also don't want to force everyone to do things in my way. That's why I didn't use a framework here.

## Rant
Why is the image folder 146MB? No one needs 8k images for a website.

## Error Handling
Currently the JavaScript relies heavily on the JSDoc type system. However, given that this is JavaScript not TypeScript, this is extremely unsafe. It also does not handle potential parse errors or network errors at all. This should be changed in future revisions.