export const handlePrint = () => {
  const curURL = window.location.href;
  history.replaceState(history.state, '', '/');
  window.print();
  history.replaceState(history.state, '', curURL);
};
