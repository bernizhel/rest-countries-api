import React from 'react'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
    namespace React {
        interface HTMLAttributes<T> extends DOMAttributes<T> {
            name?: any;
        }
    }
}