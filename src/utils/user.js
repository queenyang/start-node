const setUserInfo = userInfo => {
  localStorage.setItem("userInfo", userInfo);
};
const deleteUserInfo = () => {
  localStorage.remove("userInfo");
};

export { setUserInfo, deleteUserInfo };
