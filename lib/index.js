(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSideBar = void 0;
  
    var tslib_1 = require("tslib");
    var startCase_1 = tslib_1.__importDefault(require("lodash/startCase"));
    var sortBy_1 = tslib_1.__importDefault(require("lodash/sortBy"));
    var remove_1 = tslib_1.__importDefault(require("lodash/remove"));
    var path_1 = require("path");
    var glob_1 = tslib_1.__importDefault(require("glob"));
    // handle md file name
    const { readdirSync, readFileSync } = require("fs");
    const matter = require("gray-matter");
    
    function getFrontMatterSync(filepath) {
        const { data: frontMatter, content } = matter( readFileSync(filepath));
        return frontMatter;
    }
    
    
    function sideSync(dir, isRoot=true)
    {
        var filenames = readdirSync(dir,{ withFileTypes: true });
    
        if (!filenames)
        {
            return {};
        }
        var sidebar={};
    
        var frontMatter = getFrontMatterSync(`${dir}/index.md`);
        sidebar.text= frontMatter.title;
        // sidebar.collapsible = isRoot;
        // sidebar.collapsed = isRoot;
        sidebar.items = []
        if (frontMatter.isSidebarRoot) {
            sidebar.items.push ( { 'text': 'Home', 'link':`${dir}/`});
        }


    
        for (const f of filenames.filter((e) => e.name !== 'index.md' )) // .filter((f) => f.name.endsWith(".md") || (!f.name.startsWith(".") && f.isDirectory())))
        {
            var fname = `${dir}/${f.name}`;
            if (f.name.endsWith(".md") )
            {
                sidebar.items.push( { 'text':  getFrontMatterSync(`${fname}`).title, 'link': `${fname}` });
            }
            else if (!f.name.startsWith(".") && f.isDirectory())
            {
                sidebar.items.push (sideSync(`${fname}`));
            }
        }

        return sidebar;
    }
    






    /**
     * Returns `sidebar` configuration for VitePress calculated using structrue of directory and files in given path.
     * @param   {String}    rootDir   - Directory to get configuration for.
     * @param   {Options}    options   - Option to create configuration.
     */
    var getSideBar = function (rootDir, subdir, options) {
        if (rootDir === void 0) { rootDir = './'; }
        
        process.chdir(rootDir);
        var sidebar =  sideSync(subdir);
        console.info (`RETURNING SIDEBAR FOR ${subdir}:`);
        console.log (sidebar);
        process.chdir("..");

        return [sidebar];
    };
    exports.getSideBar = getSideBar;

}));
