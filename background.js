// chrome.runtime.onInstalled.addListener(() => {
//     chrome.action.setBadgeText({
//       text: "OFF",
//     });
//   });

// alert(document.title)
let a = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
let text = [];
for(let i=0;i<a.length;i++) text.push(a[i].innerText);
// console.log(text);

const url = "http://localhost:3300/predict";
const options = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: JSON.stringify({
    model: "CrowdflowerWithOversampling",
    arr: text,
  }),
};
fetch(url, options)
  .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   });
.then(resp=>{
    // if(resp.success==false) return alert('Error from backend.')
    let result = resp.predictions
    let count=0;
    for(let i=0;i<result.length;i++) if(result[i]!='Normal') count++;
    let body = document.querySelector('body')
    if(count>result.length/3+1) {
      body.innerHTML = '<div id="8968437500" style="z-index: 1000; position: absolute;left: 10%;top: 5%;width: 80%;border: #721c24 2px solid;color: #721c24;background-color: #f8d7da;padding: 0.75rem 1.25rem;border-radius: 0.25rem;">This webpage is not safe.</div>'+body.innerHTML
    }
    else {
      body.innerHTML = '<div id="8968437500" style="z-index: 1000; position: absolute; left: 10%; top: 5%; width: 80%; border: #155724 2px solid; color: #155724; background-color: #d4edda; padding: 0.75rem 1.25rem; border-radius: 0.25rem;">This webpage is safe.</div>'+body.innerHTML
    }
    setTimeout(()=>{
      document.getElementById('8968437500').style.display = 'none';
    }, 5000)
})
.catch(err=>{
    console.log(err);
})