declare module '*.css';
declare module '*.scss';
declare module '*.less';
declare module '*.ts';
declare module 'react/jsx-runtime';
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.css';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}