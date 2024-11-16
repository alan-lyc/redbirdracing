# redbirdracing.github.io

This is my version of the website.
Except the content, it is basically completed. I completely rewrote the website, but the site structure is not changed.

Notes:
1. **I did NOT update the content because I have no idea what events, photos, or news I can put on the website, except the 8 selected photos**
2. ⁠I didn’t place the photos anywhere except the gallery and the header, because I don’t know what are those photos about 
3. ⁠ ⁠I didn’t reserve space for “events” because I have absolutely no idea what it will be about 
4. ⁠i wrote the introductions for the sub-teams but not sure if it’s ok. 
5. ⁠The about us page might look better if there are more photos
6. ⁠The home page might be a bit too short

Completed:
UI update (with same theme)
news.json
sponsors.json
gallery.json

## Project Structure
- Everything other than the pages themselves are inside `assets/`
- `assets` contains `js`, `images`, and `css`
- `js` also contains the json files
- `images` contains other images and the 8 original photos (re-encoded with ffmpeg), as well as the 720p, 1080p, and 1440p versions of those photos. Currently, for photos that are loaded with the page, only the 720p version is used. This ***significantly*** reduces download size.

## HTML Template
- Each html starts from a template containint `<head>` and `<body>`. Except the title and other `<script>`s, this should be the same for every page.
- The `<body>` contains a `<page-layout>`, which contains the page content
- The page content contains a `<style>`, which is the style for that page. I decided *against* using another CSS file for per-page styles for performance, because it leads to another network request, and therefore another 150-300ms of latency (according to lighthouse).
- The page content contains a `<span name=title>` and `<span name=description>`, which is the title and description rendered in the header (not to be confused with the `page-layout-header`, which is just the top menu bar).

## Todo
> [!CAUTION]
> if this version is used:
> - There is no news
>   * using 2022 news for now
> - Current sponsors
>   * using 2022 sponsors for now
> - Contact
>   * what is the Whatsapp of PIC
> - There is no event
> - The introduction
>   * check to see if it looks ok
> - What does the selected pictures mean (when is the photo take etc.)
>   * there is no alt text or description

## Potential Improvement
**If we can use a (meta)framework**, then the website performance and our workflow could potentially be improved. Currently, I am using Web Component to avoid having to copy and paste *every single time* when we change the page layout. However, for code reusability, I used JavaScript to `fetch` the component's source code (e.g. `page-layout.html`) at runtime. This causes a visible layout shift when the component is loaded.

Using a (meta)framework, such as SvelteKit (with the static renderer) or Astro, we can use layouts/components without worrying about JavaScript, because everything is prerendered. Also, I am not *entirely* sure, but a static renderer could in theory prerender static json imports for us. In other words, instead of populating the news/sponsors page in the browser, the page is already rendered at build time, and users get a static html.

>[!NOTE]
> This is not SSR, a server is not needed.

Using a framework also allows us to write the website declaratively. For example, instead of 
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
Why is the image folder 146MB? We don't need 8k lossless images for a website.

## Error Handling
Currently the JavaScript relies heavily on the JSDoc type system. However, given that this is JavaScript not TypeScript, this is extremely unsafe. It also does not handle potential parse errors or network errors at all. This should be changed in future revisions.