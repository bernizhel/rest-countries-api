export default interface IContainerProps {
    ai?: string;
    ac?: string;
    jc?: string;
    display?: string;
    w?: string;
    maxw?: string;
    minw?: string;
    h?: string;
    maxh?: string;
    minh?: string;
    type?: 'ul' | 'ol' | 'div' | 'nav' | 'section' | 'main' | 'header';
    children?: React.ReactChild | React.ReactNode;
}