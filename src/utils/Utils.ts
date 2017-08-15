export function loading(cb: Promise<any>) {
  let load = document.createElement('div');
  load.className = 'global-loding';
  load.innerHTML = '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1.8rem" height="1.8rem" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">'
                  +'<path fill="rgba(255, 152, 0, 0.6)" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">'
                  +'<animateTransform attributeType="xml"'
                  +'  attributeName="transform"'
                  +'  type="rotate"'
                  +'  from="0 25 25"'
                  +'  to="360 25 25"'
                  +'  dur="0.6s"'
                  +'  repeatCount="indefinite"/>'
                  +'</path>'
                  +'</svg>';
  document.body.appendChild(load);
  return cb.then(arr => {
    document.body.removeChild(load);
    return arr;
  })
}