Recursive sidebar generator for [Vitepress](https://github.com/vuejs/vitepress) based on file and directory structure.

# Install

```shell
npm install -D vitepress-plugin-recursive-sidebar
```


# API

## getSideBar

```javascript
getSideBar(rootDir = './', options?: Options)
```

- **rootDir**:  `string` Directory to get configuration for
- **options**: `Options` Option to create configuration

Returns `sidebar` configuration for VitePress calculated using structrue of directory and files in given path.

Type of Options:

```typescript
interface Options {
  ignoreMDFiles?: Array<string>, // File path to ignore from being captured.
}
```




# How it works

You directory may be like this.

```shell
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.ts
│  ├─ big_site_section
│  │  └─ index.md
│  │  └─ START.md
│  ├─ another_big_site_section
│  │  └─ index.md
│  │  └─ dateUtil.md
│  │  └─ storeUtil.md
│  └─ index.md
```

Go to `config.ts` and add the following:

```typescript
import { getSideBar } from 'vitepress-plugin-recursive-sidebar'

module.exports = {
  // ...
  themeConfig: {
    // ...
    sidebar: {
      '/big_site_section/':             getSideBar( "./docs", "big_site_section", {}),
      '/another_big_site_section/':     getSideBar( "./docs","another_big_site_section", {}),
      '/yet_another_big_site_section/': getSideBar( "./docs","yet_another_big_site_section", {}),
    }, 
  },
};
```

Your site sections can be pretty deep, you can have subsections and subsubsections. The sidebar will be built recursively, either till there are no subsections left, or till it sees a page which is marked as a 'sidebar root', so that you can have independent sidebars in yet another subsubsubsections of your site. To achieve this, put `isSidebarRoot: true` in the index.md font matter (on top of the page), for every such page (including the top ones, just in case), like this:

```yaml
---
title: Something something
isSidebarRoot: true
---
```

You should do this for each page, so in our case for:

- `big_site_section/index.md`
- `another_big_site_section/index.md`
- `yet_another_big_site_section/index.md`

