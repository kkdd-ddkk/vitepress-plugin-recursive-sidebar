import { startCase, sortBy } from 'lodash-es';
import { sep } from 'path';
import glob from 'glob';

// handle md file name
const getName = (path) => {
    let name = path.split(sep).pop() || path;
    const argsIndex = name.lastIndexOf('--');
    if (argsIndex > -1) {
        name = name.substring(0, argsIndex);
    }
    // "001.guide" or "001-guide" or "001_guide" or "001 guide" -> "guide"
    name = name.replace(/^\d+[.\-_ ]?/, '');
    return startCase(name);
};
// handle dir name
const getDirName = (path) => {
    let name = path.split(sep).shift() || path;
    name = name.replace(/^\d+[.\-_ ]?/, '');
    return startCase(name);
};
// Load all MD files in a specified directory
const getChildren = function (parentPath) {
    const pattern = '/**/*.md';
    const files = glob.sync(parentPath + pattern).map((path) => {
        const newPath = path.slice(parentPath.length + 1, -3);
        return { path: newPath };
    });
    // Return the ordered list of files, sort by 'path'
    return sortBy(files, ['path']).map(file => file.path);
};
// Return sidebar config for given baseDir.
function side(baseDir) {
    const mdFiles = getChildren(baseDir);
    console.log(mdFiles);
    const sidebars = [];
    // strip number of folder's name
    mdFiles.forEach((item) => {
        const dirName = getDirName(item);
        const mdFileName = getName(item);
        const sidebarItemIndex = sidebars.findIndex(sidebar => sidebar.text === dirName);
        if (sidebarItemIndex !== -1) {
            sidebars[sidebarItemIndex].items.push({
                text: mdFileName,
                link: item,
            });
        }
        else {
            sidebars.push({
                text: dirName,
                items: [{
                        text: mdFileName,
                        link: item,
                    }],
            });
        }
    });
    console.log(JSON.stringify(sidebars));
    return sidebars;
}
/**
 * Returns `sidebar` configuration for VitePress calculated using structrue of directory and files in given path.
 * @param   {String}    rootDir   - Directory to get configuration for.
 */
const getSideBar = (rootDir = './') => side(rootDir);

export { getSideBar };
