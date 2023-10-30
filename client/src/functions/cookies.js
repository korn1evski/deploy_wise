function setCookie(name, value, exp) {
  const expirationDate = new Date(exp);
  const expires = `expires=${expirationDate.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

function setCookieForMinutes(name, value, minutesToExpire) {
  const date = new Date();
  date.setTime(date.getTime() + minutesToExpire * 60 * 1000); // Convert minutes to milliseconds
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

function deleteCookie(name) {
  const expirationDate = new Date("Thu, 01 Jan 1970 00:00:00 UTC");
  const expires = `expires=${expirationDate.toUTCString()}`;
  document.cookie = `${name}=; ${expires}; path=/`;
}

function getCookie(name) {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return null;
}

export { setCookie, getCookie, setCookieForMinutes, deleteCookie };
