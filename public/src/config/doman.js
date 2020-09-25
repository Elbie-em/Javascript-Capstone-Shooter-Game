const element = (id) => {
  const el = document.getElementById(id);
  return el;
};

const dismissComponent = (id) => {
  const el = document.getElementById(id);
  el.hidden = true;
};

const showComponent = (id) => {
  const el = document.getElementById(id);
  el.hidden = false;
}

export { element, dismissComponent, showComponent };