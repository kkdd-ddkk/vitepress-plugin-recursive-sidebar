Recursive sidebar generator for [Vitepress](https://github.com/vuejs/vitepress) based on file and directory structure.

# Install

```shell
npm install -D vitepress-plugin-recursive-sidebar
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

# Usage

Go to `config.ts` and do the following:

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


## Generator sidebar

- [x] Then `getSideBar` will return sidebar data like this. It will work well for vitepress.
- [x] Sidebar will order by file path.

- [x] Number in the file path will be removed.


```json
[
    {
        "text":"Introduction",
        "items":[
            {
                "text":"START",
                "link":"01.Introduction/START"
            }
        ]
    },
    {
        "text":"Utils",
        "items":[
            {
                "text":"dateUtil",
                "link":"02.Utils/dateUtil"
            },
            {
                "text":"storeUtil",
                "link":"02.Utils/storeUtil"
            }
        ]
    },
    {
        "text":"Index",
        "items":[
            {
                "text":"Index",
                "link":"index"
            }
        ]
    }
]
```

[The configuration for the sidebar in Vitepress](https://vitepress.vuejs.org/config/theme-configs#sidebar)

