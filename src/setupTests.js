// npm install --save-dev @wojtekmaj/enzyme-adapter-react-17
// npm install --save-dev enzyme
// npm install --save-dev enzyme-to-json
// npm install --save-dev @testing-library/react-hooks
// npm install redux-mock-store --save-dev

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

// // Solucion al error del scroll en la consola
// const noScroll = () => {};
// Object.defineProperty(window, 'scrollTo', {value: noScroll, writable: true})