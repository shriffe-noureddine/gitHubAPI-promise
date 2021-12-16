let result = document.getElementById("result");
let selectID = document.getElementById("selectID");
let username = document.getElementById("username");
let submit = document.getElementById("submit");
let url = `https://api.github.com/users/`;
let selectedOption;


let options = {
  repos_url: 'Repos',
  followers_url: 'Followers',
  subscriptions_url: 'Subscriptions',
  organizations_url: 'Organizations',
};
// create a new `Option` element for each item in the `options` array 
// with text and value, and then add that element to`select` 
selectID.add(new Option("", ""));
for (let i in options) {
let element = new Option(options[i], i);
  selectID.add(element);
}
// when change the selection, give its value to the variable 'selectedOption'
selectID.addEventListener('change', function() {
  selectedOption = selectID.value;
});

// create a 'Promis' object, and create http request with 'GET' method and the 'url' provided
function request(url) {
    let promise = new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
      xhr.responseType = 'json';
      xhr.onload = function () {
        // returns a Promise object that is resolved with a given value then,
        // remove 'invalid' class and add 'valid' class for styling.
          result.classList.remove('invalid');
          result.classList.add('valid');
            resolve(xhr.response);
        };
      xhr.onerror = function () {
        // Handle error
        //returns a Promise object that is rejected with a given reason then,
        // remove 'valid' class and add 'invalid' class for styling.
        result.classList.remove('valid');
        result.classList.add('invalid');
        reject(result.value = `STATUS ${this.status} SOMETHING WENT WRONG TRY AGAIN LATER...`)
      };
        xhr.send();
    });
    return promise;
};
// add whatever username provided to the url, then 'preventDefault' in order not to submit the whole form in once
// get the promise value from first 'request' method and use it to adopt its eventual state and get 
// a newURL, finally fetch the result and display it in the result box.
submit.addEventListener("click", function (e) {
  let completeUrl = url + `${username.value}`;
  e.preventDefault();
    request(completeUrl)
      .then(function (data) {
      return data[selectedOption];
      }).then(function (newURL) {
        return request(newURL);
      }).then(function (showResult) {
        result.value = JSON.stringify(showResult, undefined, 4);
      });
});
