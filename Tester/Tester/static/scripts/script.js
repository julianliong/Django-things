function getToken(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0,name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
   }
var csrftoken = getToken('csrftoken')

async function potato(){
    let body = {password:document.getElementById("password").value}
    let result = await fetch('/check-password',
    {
        method: "POST",
        headers:
        {
            "Content-Type":"application/json",
            "X-CSRFToken":csrftoken
        },
        body:JSON.stringify(body)
    })
    if (result.body === 'success'){
        alert("password is good")
    }
    
    let message = document.getElementById("message")
    message.innerText = await result.text()
    
    if (message.innerText === 'success'){
      message.classList.add("green")
      message.classList.remove("red")

    }
    else{
      message.classList.add('red')
      message.classList.remove('green')
    }
}
