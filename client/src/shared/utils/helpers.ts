export const scrollTo = (id: string, offset = 0) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: "smooth",
    });
  }
}