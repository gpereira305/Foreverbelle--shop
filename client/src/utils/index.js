export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split("/");

  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};

export const rerender = async (component) => {
  document.getElementById("main-container").innerHTML =
    await component.render();
  await component.switch_render();
};

export const showLoading = () => {
  document.getElementById("loading__overlay").classList.add("active");
};

export const hideLoading = () => {
  document.getElementById("loading__overlay").classList.remove("active");
};

export const showMessage = (message, callback) => {
  const messageOverlay = document.getElementById("message__overlay");

  messageOverlay.innerHTML = `
    <div class="overlay__content d-flex al-center jc-center">
       <div>
            <h3 id="message__overlay--content">${message}</h3>
            <button 
              type="button" 
              class="main-btn filled"
              id="message__overlay--close-btn"
            >
              Ok
            </button>
       </div>
    </div>
  `;
  const closeBtn = document.getElementById("message__overlay--close-btn");

  messageOverlay.classList.add("active");
  closeBtn.onclick = () => {
    messageOverlay.classList.remove("active");
    callback && callback();
  };
};
