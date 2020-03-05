var data = {
  newVar: []
}

var pencilSVG = '<svg height="10pt" viewBox="-15 -15 484.00019 484" width="10pt" xmlns="http://www.w3.org/2000/svg"><path d="m401.648438 18.234375c-24.394532-24.351563-63.898438-24.351563-88.292969 0l-22.101563 22.222656-235.269531 235.144531-.5.503907c-.121094.121093-.121094.25-.25.25-.25.375-.625.746093-.871094 1.121093 0 .125-.128906.125-.128906.25-.25.375-.371094.625-.625 1-.121094.125-.121094.246094-.246094.375-.125.375-.25.625-.378906 1 0 .121094-.121094.121094-.121094.25l-52.199219 156.96875c-1.53125 4.46875-.367187 9.417969 2.996094 12.734376 2.363282 2.332031 5.550782 3.636718 8.867188 3.625 1.355468-.023438 2.699218-.234376 3.996094-.625l156.847656-52.324219c.121094 0 .121094 0 .25-.121094.394531-.117187.773437-.285156 1.121094-.503906.097656-.011719.183593-.054688.253906-.121094.371094-.25.871094-.503906 1.246094-.753906.371093-.246094.75-.621094 1.125-.871094.125-.128906.246093-.128906.246093-.25.128907-.125.378907-.246094.503907-.5l257.371093-257.371094c24.351563-24.394531 24.351563-63.898437 0-88.289062zm-232.273438 353.148437-86.914062-86.910156 217.535156-217.535156 86.914062 86.910156zm-99.15625-63.808593 75.929688 75.925781-114.015626 37.960938zm347.664062-184.820313-13.238281 13.363282-86.917969-86.917969 13.367188-13.359375c14.621094-14.609375 38.320312-14.609375 52.945312 0l33.964844 33.964844c14.511719 14.6875 14.457032 38.332031-.121094 52.949218zm0 0"/></svg>'

function getVals () {
  var vals = []
  vals[0] = document.getElementById('ad-size')
  vals[1] = document.getElementById('no-questions')
  return vals
}

function questionNos (no, vars) {
  var wholeString = ''
  for (var i = 0; i < no; i++) {
    var string = `
        {
            question: '${vars === undefined ? `[%SurveyQuestion${i + 1}%]` : vars[i * 5 + 1]}',
            answers: ['${vars === undefined ? `[%Response${(i * 4) + 1}%]` : vars[i * 5 + 2]}', '${vars === undefined ? `[%Response${(i * 4) + 2}%]` : vars[i * 5 + 3]}', '${vars === undefined ? `[%Response${(i * 4) + 3}%]` : vars[i * 5 + 4]}', '${vars === undefined ? `[%Response${(i * 4) + 4}%]` : vars[i * 5 + 5]}'],
        }`

    if (i < (no - 1)) {
      string = string + ','
    }
    wholeString += string
  }
  return wholeString
}

function clearOutOfPage () {
  if (document.getElementById('surveyContainer')) {
    var fields = document.querySelectorAll('#surveyContainer')
    var fieldsArr = Array.prototype.slice.call(fields)
    fieldsArr.forEach(element => {
      element.style = 'display: none'
    })
  }
}

function clearVarList () {
  document.getElementById('var-list').innerHTML = ''
}

function createEventListeners () {
  document.getElementById('copy-code').addEventListener('click', copyFunction)
  document.getElementById('ad-size').addEventListener('change', function () {
    clearVarList()
    if (document.getElementById('ad-size').value === 'custom') {
      document.querySelector('.custom-input').style = 'display: block'
      document.querySelector('.submit').style = 'display: block'
    } else {
      document.querySelector('.custom-input').style = 'display: none'
      document.querySelector('.submit').style = 'display: none'
    }
    var vals = getVals()
    printer(vals[0].value, vals[1].value)
    findVariables()
    checkNewVariables()
    printer(vals[0].value, vals[1].value, data.newVar)
  })

  document.getElementById('no-questions').addEventListener('change', function () {
    clearVarList()
    clearOutOfPage()
    var vals = getVals()
    printer(vals[0].value, vals[1].value)
    findVariables()
    checkNewVariables()
  })

  document.getElementById('submit-btn').addEventListener('click', changeAdSize)
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
      changeAdSize()
    }
  })

  function changeAdSize () {
    var vals = getVals()
    printer(vals[0].value, vals[1].value)
    if (document.getElementById('ad-size').value === 'custom') {
      resizeIframe()
    }
  }
}

function returnAdSize () {
  var width = document.getElementById('width').value
  var height = document.getElementById('height').value
  if (isNaN(parseInt(width)) === true || isNaN(parseInt(height)) === true) {
    return false
  } else if (isNaN(parseInt(width)) === false && isNaN(parseInt(height)) === false) {
    return { height: height, width: width }
  }
}

function printer (val, quVal, vars) {
  var x = document.querySelector('iframe')
  if (val === 'out-of-page') {
    x.src = '/ad_surveys/out-of-page.html'
    var outOfPageCode = `
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">

</head>

<body>

    <script>
    
    var questions = [${questionNos(quVal)}
    ]

    function runQuestion (questionIndex){

        var pageDiv = parent.document.getElementById("page");
        if(pageDiv) {
            pageDiv.style = "position:relative; z-index:5";
        };
        
        var footerWrapperDiv = parent.document.getElementById("footer-wrapper");
        if(footerWrapperDiv){
            footerWrapperDiv.style = "position: relative; z-index:1;";
        };

        var Element = function(element, id, style, src){
            this.element = element,
            this.id = id,
            this.style = style,
            this.src = src
        } 
        
        Element.prototype.createSurveyElement = function(){
            var element = document.createElement(this.element)
            element.setAttribute("id", this.id)
            element.setAttribute("style", this.style)
            if(this.src){
                element.setAttribute("src", this.src)
            }
            return element
        }

        var surveyContainer = new Element("div", "surveyContainer", "position: fixed;width: 250px;height: auto;background-color: #fff;bottom: 25px;border-right:1px solid #F0EDEF;z-index: 6;").createSurveyElement()
        var surveyStyle = document.createElement("style");
        surveyStyle.innerHTML = ".surveyButton {float: left;width: 100%;height: 35px;margin-bottom: 15px; padding: 0; border-radius: 10px; color: #000; background-color:#fff; border:none; cursor:pointer; font-size:[%ButtonFontSize%]; font-family:verdana} .surveyButton:hover{color:#fff; background-color:#000;} @media only screen and (max-width:1780px){#surveyContainer {display:none;}}";
        var surveyContainerTop = new Element("div", "surveyContainerTop", "float:left; width: 100%; height: 50px; background-image:url('[%TopImage%]'); background-size: 100%;").createSurveyElement()
        var closeButton = new Element("div", "closeButton", "position: absolute; margin:-10px 0 0 240px; cursor: pointer; border-radius:50%; width: 20px; border: 1px solid #343434; height: 20px; background-image:url('https://res.cloudinary.com/do4cvpacv/image/upload/v1567161150/HP%20Windows%207%20Survey%20Creative%202019/hp-win-7-close-button_1.png')").createSurveyElement()
        var surveyContainerMiddle = new Element("div", "surveyContainerMiddle", "float:left; background-color: #fff; width: 100%; height: auto;").createSurveyElement()
        var surveyQuestion = new Element("p", "surveyQuestion", "font-size:1.1rem; font-family:verdana; padding: 15px 15px 0px 15px; text-align:center;").createSurveyElement()
        var surveyButtonDiv = new Element("div", "surveyButtonDiv", "width:95%;height: 100%;background-color: #fff ;margin: auto;text-align:center;").createSurveyElement()
        var surveyContainerBottom = new Element("div", "surveyContainerBottom", "float:left; background-image:url('[%BottomImage%]'); background-size: 100%; width: 100%; height: 50px; text-align: center;").createSurveyElement()
        var impressionTracker = new Element("img", "impressionTracker", "display: block; position: absolute; width: 1px; height: 1px", "").createSurveyElement()

        var item = questions[questionIndex]
        surveyQuestion.innerHTML = item.question;
        
        parent.document.body.appendChild(surveyContainer);
        surveyContainer.appendChild(surveyStyle);
        surveyContainer.appendChild(surveyContainerTop);
        surveyContainerTop.appendChild(closeButton);       
        closeButton.addEventListener("click", function(){
            surveyContainer.style = "display: none";
        });
        surveyContainer.appendChild(surveyContainerMiddle);
        surveyContainerMiddle.appendChild(surveyQuestion);
        surveyContainerMiddle.appendChild(surveyButtonDiv);

        var answers = item.answers.filter(function(answer){
            return answer.length > 0
        })
        
        answers.forEach(function(answer, ind) {
            eventButton(answer, ind)
        });

        if(answers.length === 0 || item.question.length === 0){
            nextQuestion (questions, questionIndex)
        }

        function lastQuestion(questions, questionIndex){
          if (questionIndex === questions.length - 1) {
              return true
          }else{
              return false
          }
        }

        function eventButton(answer, ind) {
            
            var button = document.createElement("button")
            button.setAttribute("class", "surveyButton");
            button.innerHTML = answer
            surveyButtonDiv.appendChild(button)
            
            button.addEventListener("click", function(){
                
                window.parent.permutive.track('SurveyResponse', { 
                    question: {
                        text: item.question
                    },
                    answer: {    
                        text: answer,
                        valid: true
                    },
                    survey: {
                        id: '[%SurveyCreativeId%]',
                        complete: lastQuestion (questions, questionIndex)
                    }
                })
                
                nextQuestion (questions, questionIndex)
            });
        }

        function nextQuestion (questions, questionIndex){
            if (questionIndex === questions.length - 1) {
                surveyQuestion.innerHTML = "${getThankYouMessage()}";
                surveyButtonDiv.style = "display:none";
            }else{
                surveyContainer.style = "display:none";
                runQuestion(questionIndex + 1)
            }
        } 
                    
        surveyContainer.appendChild(surveyContainerBottom);
        surveyContainerBottom.appendChild(impressionTracker);

    }
    runQuestion(0)

</script>

%%VIEW_URL_UNESC%%

</body>

</html>

    `
    document.querySelector('code').innerText = outOfPageCode
  } else if (val !== '') {
    clearOutOfPage()
    x.src = '/ad_surveys/500x150.html'
    var slotCode = `

<div id="surveyContainer" style="width: 100%; height: 100%; position: fixed; left: 0px; top: 0px; background-image:url('${vars === undefined ? '\'[%BackgroundImage%]' : vars[0]}'); background-position: center; background-repeat: no-repeat; background-size: cover; bottom: 25px; z-index: 6; border-radius: 10px;">
<p id="surveyQuestion" style="font-size:1.1rem; font-family:verdana; height: 61px; text-align:center; line-height: 370%; margin:auto;">Test Question 1</p>
<div id="buttonContainer" style="height: calc(100% - 80px);">
    <div id="surveyButtonDiv" style="width:95%; height: 100%; margin: auto; text-align:center;">
        <button class="surveyButton" id="button1">Response 1</button>
        <button class="surveyButton" id="button2">Response 2</button>
        <button class="surveyButton" id="button3">Response 3</button>
        <button class="surveyButton" id="button4">Response 4</button>
    </div>
</div>
</div>

<style>
    .surveyButton {
      height: 35px;
      width: calc(25% - 5px);
      margin: 2px;
      margin-bottom: 10px;
      padding: 0px;
      border-radius: 10px;
      color: #000;
      background-color: white;
      border: none;
      cursor: pointer;
      font-size: 12;
      font-family: verdana
    }

    @media (max-width: 720px) {
      .surveyButton {
          width: calc(50% - 11px);
          height: calc(50% - 2px);
          margin: 3px;
      }
      .surveyQuestion {
          margin-bottom: 3%;
      }
    }

    @media (max-width: 360px) {
      .surveyButton {
          width: calc(100% - 6px);
          height: calc(25% - 5px);
          margin: 4px;
      }
    }

    .surveyButton:hover {
      color: #fff;
      background-color: #000;
    }

</style> 

<script>

var questions = [${questionNos(quVal, vars)}
]

function runQuestion (questionIndex){
    var item = questions[questionIndex];
    var surveyButtonDiv = document.getElementById("surveyButtonDiv")
    var surveyQuestion = document.getElementById("surveyQuestion")
    surveyButtonDiv.innerHTML = ''
    surveyQuestion.innerHTML = item.question;
    
    var answers = item.answers.filter(function(answer){
        return answer.length > 0
    })
    
    answers.forEach(function(answer, ind) {
        eventButton(answer, ind)
    });

    if(answers.length === 0 || item.question.length === 0){
        nextQuestion (questions, questionIndex)
    }

    function lastQuestion(questions, questionIndex){
      if (questionIndex === questions.length - 1) {
          return true
      }else{
          return false
      }
    }

    function eventButton(answer, ind) {
        
        var button = document.createElement("button")
        button.setAttribute("class", "surveyButton");
        button.innerHTML = answer
        surveyButtonDiv.appendChild(button)
        
        button.addEventListener("click", function(){

            window.parent.permutive.track('SurveyResponse', { 
              question: {
                  text: item.question
              },
              answer: {    
                  text: answer,
                  valid: true
              },
              survey: {
                  id: '${vars === undefined ? '\'[%SurveyCreativeId%]' : vars[vars.length - 1]}',
                  complete: lastQuestion (questions, questionIndex)
              }
            })
            
            nextQuestion (questions, questionIndex)
        });
    }

    function nextQuestion (questions, questionIndex){
        if (questionIndex === questions.length - 1) {
            surveyQuestion.innerHTML = "${getThankYouMessage()}";
            surveyButtonDiv.style = "display:none";
        }else{
            runQuestion(questionIndex + 1)
        }
    } 
}

runQuestion(0)

</script>
        `
    document.querySelector('code').innerText = slotCode
  }
}

function resizeIframe (obj) {
  var size = returnAdSize()
  if (!obj) {
    obj = document.getElementById('ad-frame')
  }
  if (size === false) {
    size = obj.src.split('/')[4].split('.')[0].split('x')
    console.log(obj.src)
    if (!isNaN(parseInt(size[0])) && !isNaN(parseInt(size[1]))) {
      obj.style.width = `${size[0]}px`
      obj.style.height = `${size[1]}px`
    } else {
      obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px'
      obj.style.width = obj.contentWindow.document.documentElement.scrollWidth + 'px'
    }
  } else {
    obj.style.height = size.height + 'px'
    obj.style.width = size.width + 'px'
  }
}

function findVariables () {
  var code = document.querySelector('code').innerText
  var regex = /\[.*?\]/g
  var variables = code.match(regex)
  var list = document.getElementById('var-list')
  variables.forEach(element => {
    if (element.includes('%')) {
      if (element.includes('\'') === true) {
        var vars = element.split('\'')
        buttonCreate(list, vars[1])
      } else {
        buttonCreate(list, element)
      }
    }
  })
}

function editButtonText (e) {
  console.log(e)
  if (e.id === 'var-li') {
    editText(e)
  } else if (e.id === 'var-edit') {
    editText(e.parentNode)
  }

  function editText (e) {
    console.log(e)
    var varPlaceholder = e.innerText
    var input = document.createElement('input')
    input.style.width = '200px'
    input.value = varPlaceholder
    input.classList = 'var-input'
    e.innerHTML = ''
    e.appendChild(input)
    input.select()
    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13) {
        changeVarText(e, input)
        updateCode()
      }
    })
  }
}

function changeVarText (e, input) {
  var value = input.value
  e.innerHTML = ''
  e.id = 'var-li'
  var button = document.createElement('button')
  button.innerHTML = pencilSVG
  button.className = 'edit-btn'
  button.id = 'var-edit'
  button.addEventListener('click', function (e) {
    editButtonText(e.target.parentNode.parentNode)
  })
  e.appendChild(button)
  e.insertAdjacentText('beforeend', value)
}

function buttonCreate (list, el) {
  const li = document.createElement('li')
  li.id = 'var-li'
  var button = document.createElement('button')
  button.innerHTML = pencilSVG
  button.className = 'edit-btn'
  button.id = 'var-edit'
  button.addEventListener('click', function (e) {
    editButtonText(e.target.parentNode.parentNode)
  })
  li.appendChild(button)
  li.insertAdjacentText('beforeend', el)
  list.appendChild(li)
}

function getThankYouMessage () {
  var thankyouMessage = document.getElementById('thank').value
  if (thankyouMessage === '') {
    thankyouMessage = 'Thank you for your responses.'
  }
  return thankyouMessage
}

function copyFunction () {
  const copyText = document.querySelector('code').innerText
  const textArea = document.createElement('textarea')
  textArea.textContent = copyText
  document.body.append(textArea)
  textArea.select()
  document.execCommand('copy')
}

function updateCode () {
  var vals = getVals()
  checkNewVariables()
  printer(vals[0].value, vals[1].value, data.newVar)
}

function storeVars () {
  var els = document.querySelectorAll('#var-li')
  var elsArr = Array.prototype.slice.call(els)
  var result = elsArr.map(el => {
    return el.textContent
  })
  return result
}

function checkNewVariables () {
  data.newVar = storeVars()
}

createEventListeners()
