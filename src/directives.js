import Vue from "vue";

/*
* Dynamicky prida atributy elementu na zaklade objektu.
*/
function attr(el, binding) {
  const attrs = binding.value;
  const elementAttrs = el.attributes;

  // Vymazanie neaktualnych atributoch
  for (let i = 0; elementAttrs.length - 1 >= i; i += 1) {
    const attrName = elementAttrs[i].name;
    if (Object.keys(attrs).every((attribute) => attribute !== attrName)) {
      if (attrName !== "type") {
        el.removeAttribute(attrName);
      }
    }
  }

  // Pridanie/Upravenie atributu
  Object.entries(attrs).forEach((attribute) => {
    const [key, value] = attribute;
    if (key !== "type") {
      el.setAttribute(key, value);
    }
  });
}

Vue.directive("attr", {
  bind: attr,
  update: attr,
});
