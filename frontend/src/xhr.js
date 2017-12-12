export function createRequest(method, url, callback) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = (e) => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      if (callback && xhr.responseText) {
        callback(xhr.responseText);
      }
    }
  };

  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else {
    xhr.open(method, url);
  }

  return xhr;
}
