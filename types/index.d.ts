interface SidebarGroup {
    text: string;
    items: SidebarItem[];
    collapsible?: boolean;
    collapsed?: boolean;
}
interface SidebarItem {
    text: string;
    link: string;
}
interface Options {
    ignoreMDFiles?: Array<string>;
}
/**
 * Returns `sidebar` configuration for VitePress calculated using structrue of directory and files in given path.
 * @param   {String}    rootDir   - Directory to get configuration for.
 * @param   {Options}    options   - Option to create configuration.
 */
export declare const getSideBar: (rootDir?: string, options?: Options) => SidebarGroup[];
export {};
