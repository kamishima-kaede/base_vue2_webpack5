import _ from 'lodash';
import './style/index.css';
import './style/index.less';
import print from './print';

function component() {
  const create = document.createElement;
  const element = create.call(document, 'div');
  element.innerText = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('mystyle');
  const btn = create.call(document, 'button');
  btn.onclick = print;
  btn.innerText = '点我';
  element.appendChild(btn);
  return element;
}

document.body.appendChild(component());
