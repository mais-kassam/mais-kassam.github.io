var propertyData = {}
var projectData = {}
var projectSchemaData = {}
var propertyDataArr = []
var domainsArr = []
var space = ""
var objString = []
var jsonObj = []
var tempKey 
var amp =  {"vars": {"namespace": "<NAMESPACE>","key": "<PUBLIC_API_KEY>"},"extraUrlParams": {}}
var java =  {}
var keysTracker = []
var projKeysTracker = []
var javaKeysTracker = []

var propertiesList = document.getElementById('properties-propertyData')
var typeCheck = document.getElementById('type')
var contentCheck = document.getElementById('content')
var articleCheck = document.getElementById('article')
var userCheck = document.getElementById('user')

var trashSvg = function(string){return `<button id="delete-btn-${string}" class="delete"></button><svg enable-background="new 0 0 512 512" id="trash-svg" class="trash-svg" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M444.852,66.908h-99.339V47.04c0-21.943-17.792-39.736-39.736-39.736h-99.339   c-21.944,0-39.736,17.793-39.736,39.736v19.868H67.363v19.868h20.47l19.887,377.489c0,21.944,17.792,39.736,39.736,39.736h218.546   c21.944,0,39.736-17.792,39.736-39.736l19.538-377.489h19.577V66.908z M186.57,47.04c0-10.962,8.926-19.868,19.868-19.868h99.339   c10.962,0,19.868,8.906,19.868,19.868v19.868H186.57V47.04z M385.908,463.236l-0.039,0.505v0.524   c0,10.943-8.906,19.868-19.868,19.868H147.455c-10.942,0-19.868-8.925-19.868-19.868v-0.524l-0.019-0.523L107.72,86.776h297.669   L385.908,463.236z" fill="#8792a1"/><rect fill="#8792a1" height="317.885" width="19.868" x="246.173" y="126.511"/><polygon fill="#8792a1" points="206.884,443.757 186.551,126.493 166.722,127.753 187.056,445.017  "/><polygon fill="#8792a1" points="345.649,127.132 325.82,125.891 305.777,443.776 325.606,445.017  "/></g></svg>`} 



var saArr = [
  "Mais Kassam (maisam@permutive.com)",
  "Mitch Welzen (mitch@permutive.com)",
  "David Reischer (david@permutive.com)",
  "Jane Usoskina (jane@permutive.com)",
  "Michal Kucharz (michal@permutive.com)"
]

var csmArr = [
  "Gen Simpson (gen@permutive.com)",
  "Aarti Suri (aarti@permutive.com)",
  "Michael Ogunjobi (michael@permutive.com)",
  "Glenn Baker (glenn@permutive.com)",
  "Laurie van Dalm (laurie@permutive.com)",
  "Morika Georgieva (morika@permutive.com)",
  "John Chen (john@permutive.com)",
  "Rico Rosa (rico@permutive.com)",
  "Chris Gwynne (chris@permutive.com)",
  "Becky Dutta (Becky@permutive.com)"
]

var propetyType = function(string){
  return `                
  <select class="custom-select" id="property-type">
    <option value="string">String</option>
    <option value="integer">Integer</option>
    <option value="float">Float</option>
    <option value="object">Object</option>
    <option value="date">Date/Time</option>
    <option value="boolean">Boolean</option>
    <option value="lostring">List of Strings</option>
    <option value="lointegers">List of Integers</option>
    <option value="lofloats">List of Floats</option>
  </select><button id="delete-btn-${string}" class="delete"></button><svg enable-background="new 0 0 512 512" id="trash-svg" class="trash-svg" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M444.852,66.908h-99.339V47.04c0-21.943-17.792-39.736-39.736-39.736h-99.339   c-21.944,0-39.736,17.793-39.736,39.736v19.868H67.363v19.868h20.47l19.887,377.489c0,21.944,17.792,39.736,39.736,39.736h218.546   c21.944,0,39.736-17.792,39.736-39.736l19.538-377.489h19.577V66.908z M186.57,47.04c0-10.962,8.926-19.868,19.868-19.868h99.339   c10.962,0,19.868,8.906,19.868,19.868v19.868H186.57V47.04z M385.908,463.236l-0.039,0.505v0.524   c0,10.943-8.906,19.868-19.868,19.868H147.455c-10.942,0-19.868-8.925-19.868-19.868v-0.524l-0.019-0.523L107.72,86.776h297.669   L385.908,463.236z" fill="#8792a1"/><rect fill="#8792a1" height="317.885" width="19.868" x="246.173" y="126.511"/><polygon fill="#8792a1" points="206.884,443.757 186.551,126.493 166.722,127.753 187.056,445.017  "/><polygon fill="#8792a1" points="345.649,127.132 325.82,125.891 305.777,443.776 325.606,445.017  "/></g></svg>`
}

var typeElement = `
<li class="property-item" id="item-type" style="width: 400px;">Type                
<select class="custom-select" id="property-type-item-type" style="float: right;">
  <option value="string" selected>String</option>
  <option value="integer">Integer</option>
  <option value="float">Float</option>
  <option value="object">Object</option>
  <option value="date">Date/Time</option>
  <option value="boolean">Boolean</option>
  <option value="lostring">List of Strings</option>
  <option value="lointegers">List of Integers</option>
  <option value="lofloats">List of Floats</option>
</select>${trashSvg('type')}</li>`

var contentElement = `
<li class="property-item" id="item-content" style="width: 400px;">Content                
<select class="custom-select" id="property-type-item-content" style="float: right;">
  <option value="string">String</option>
  <option value="integer">Integer</option>
  <option value="float">Float</option>
  <option value="object" selected>Object</option>
  <option value="date">Date/Time</option>
  <option value="boolean">Boolean</option>
  <option value="lostring">List of Strings</option>
  <option value="lointegers">List of Integers</option>
  <option value="lofloats">List of Floats</option>
</select>${trashSvg('content')}<ul id="properties-content"><li class="property-item" id="item-content-categories" style="width: 400px;">Categories                
<select class="custom-select" id="property-type-item-content-categories" style="float: right;">
  <option value="string">String</option>
  <option value="integer">Integer</option>
  <option value="float">Float</option>
  <option value="object">Object</option>
  <option value="date">Date/Time</option>
  <option value="boolean">Boolean</option>
  <option value="lostring" selected>List of Strings</option>
  <option value="lointegers">List of Integers</option>
  <option value="lofloats">List of Floats</option>
</select>${trashSvg('content-categories')}</li></ul><button id="add-sub-property-content" class="add-sub-property">+ Add Property</button></li>`

var articleElement = `
<li class="property-item" id="item-article" style="width: 400px;">Article                
<select class="custom-select" id="property-type-item-article" style="float: right;">
  <option value="string">String</option>
  <option value="integer">Integer</option>
  <option value="float">Float</option>
  <option value="object" selected>Object</option>
  <option value="date">Date/Time</option>
  <option value="boolean">Boolean</option>
  <option value="lostring">List of Strings</option>
  <option value="lointegers">List of Integers</option>
  <option value="lofloats">List of Floats</option>
</select>${trashSvg('article')}<ul id="properties-article"><li class="property-item" id="item-article-properties" style="width: 400px;">Id                
<select class="custom-select" id="property-type-item-article-properties" style="float: right;">
  <option value="string" selected>String</option>
  <option value="integer">Integer</option>
  <option value="float">Float</option>
  <option value="object">Object</option>
  <option value="date">Date/Time</option>
  <option value="boolean">Boolean</option>
  <option value="lostring">List of Strings</option>
  <option value="lointegers">List of Integers</option>
  <option value="lofloats">List of Floats</option>
</select>${trashSvg('article-properties')}</li><li class="property-item" id="item-article-title" style="width: 400px;">Title                
<select class="custom-select" id="property-type-item-article-title" style="float: right;">
  <option value="string" selected>String</option>
  <option value="integer">Integer</option>
  <option value="float">Float</option>
  <option value="object">Object</option>
  <option value="date">Date/Time</option>
  <option value="boolean">Boolean</option>
  <option value="lostring">List of Strings</option>
  <option value="lointegers">List of Integers</option>
  <option value="lofloats">List of Floats</option>
</select>${trashSvg('article-title')}</li><li class="property-item" id="item-article-description" style="width: 400px;">Description                
<select class="custom-select" id="property-type-item-article-description" style="float: right;">
  <option value="string" selected>String</option>
  <option value="integer">Integer</option>
  <option value="float">Float</option>
  <option value="object">Object</option>
  <option value="date">Date/Time</option>
  <option value="boolean">Boolean</option>
  <option value="lostring">List of Strings</option>
  <option value="lointegers">List of Integers</option>
  <option value="lofloats">List of Floats</option>
</select>${trashSvg('article-description')}</li><li class="property-item" id="item-article-authors" style="width: 400px;">Authors                
<select class="custom-select" id="property-type-item-article-authors" style="float: right;">
  <option value="string">String</option>
  <option value="integer">Integer</option>
  <option value="float">Float</option>
  <option value="object">Object</option>
  <option value="date">Date/Time</option>
  <option value="boolean">Boolean</option>
  <option value="lostring" selected>List of Strings</option>
  <option value="lointegers">List of Integers</option>
  <option value="lofloats">List of Floats</option>
</select>${trashSvg('article-authors')}</li><li class="property-item" id="item-article-tags" style="width: 400px;">Tags                
<select class="custom-select" id="property-type-item-article-tags" style="float: right;">
  <option value="string">String</option>
  <option value="integer">Integer</option>
  <option value="float">Float</option>
  <option value="object">Object</option>
  <option value="date">Date/Time</option>
  <option value="boolean">Boolean</option>
  <option value="lostring" selected>List of Strings</option>
  <option value="lointegers">List of Integers</option>
  <option value="lofloats">List of Floats</option>
</select>${trashSvg('article-tags')}</li><li class="property-item" id="item-article-modified" style="width: 400px;">Modified at                
<select class="custom-select" id="property-type-item-article-modified" style="float: right;">
  <option value="string">String</option>
  <option value="integer">Integer</option>
  <option value="float">Float</option>
  <option value="object">Object</option>
  <option value="date" selected>Date/Time</option>
  <option value="boolean">Boolean</option>
  <option value="lostring">List of Strings</option>
  <option value="lointegers">List of Integers</option>
  <option value="lofloats">List of Floats</option>
</select>${trashSvg('article-modified')}</li><li class="property-item" id="item-article-published" style="width: 400px;">Published at                
<select class="custom-select" id="property-type-item-article-published" style="float: right;">
  <option value="string">String</option>
  <option value="integer">Integer</option>
  <option value="float">Float</option>
  <option value="object">Object</option>
  <option value="date" selected>Date/Time</option>
  <option value="boolean">Boolean</option>
  <option value="lostring">List of Strings</option>
  <option value="lointegers">List of Integers</option>
  <option value="lofloats">List of Floats</option>
</select>${trashSvg('article-published')}</li><li class="property-item" id="item-article-premium" style="width: 400px;">Premium                
<select class="custom-select" id="property-type-item-article-premium" style="float: right;">
  <option value="string">String</option>
  <option value="integer">Integer</option>
  <option value="float">Float</option>
  <option value="object">Object</option>
  <option value="date">Date/Time</option>
  <option value="boolean" selected>Boolean</option>
  <option value="lostring">List of Strings</option>
  <option value="lointegers">List of Integers</option>
  <option value="lofloats">List of Floats</option>
</select>${trashSvg('article-premium')}</li></ul><button id="add-sub-property-article" class="add-sub-property">+ Add Property</button></li>`

var userElement = `
<li class="property-item" id="item-user" style="width: 400px;">User                
<select class="custom-select" id="property-type-item-user" style="float: right;">
  <option value="string">String</option>
  <option value="integer">Integer</option>
  <option value="float">Float</option>
  <option value="object" selected>Object</option>
  <option value="date">Date/Time</option>
  <option value="boolean">Boolean</option>
  <option value="lostring">List of Strings</option>
  <option value="lointegers">List of Integers</option>
  <option value="lofloats">List of Floats</option>
</select>${trashSvg('user')}<ul id="properties-user"><li class="property-item" id="item-user-type" style="width: 400px;">Type                
<select class="custom-select" id="property-type-item-user-type" style="float: right;">
  <option value="string" selected>String</option>
  <option value="integer">Integer</option>
  <option value="float">Float</option>
  <option value="object">Object</option>
  <option value="date">Date/Time</option>
  <option value="boolean">Boolean</option>
  <option value="lostring">List of Strings</option>
  <option value="lointegers">List of Integers</option>
  <option value="lofloats">List of Floats</option>
</select>${trashSvg('user-type')}</li></ul><button id="add-sub-property-user" class="add-sub-property">+ Add Property</button></li>`

var strings = {
  intro: `This article documents the code changes you'll need to make to deploy Permutive. We strongly recommend deploying Permutive on a test site or test page first. When you have this test site or test page live please let us know. We will work with you to confirm the setup is correct, before code changes are made in a production environment.`,
  depolymentTools: function () { 
    return `## Deployment Tools

  - Install our [Chrome Extension](https://chrome.google.com/webstore/detail/permutive-extension/jbkoldmncaepofapfinnlbjmfmnabfpj) to validate events.
  - You can use our [documentation](https://support.permutive.com/hc/en-us/articles/360010090520-Deployment-testing-and-verification) here to test your deployment.
  - You can use [this](https://app.periscopedata.com/shared/${document.querySelector('#projectid-input').value}) [dashboard](https://app.periscopedata.com/shared/${document.querySelector('#projectid-input').value}) to see any schema rejections`},

  keys: function (){
    return `## Keys

  Below are the project and API keys for your project. You will need to use them for the various code snippets in this document.
  
  - **<PROJECT_ID>**: \`${document.querySelector('#projectid-input').value}\`
  - **<PUBLIC_API_KEY>**: \`${document.querySelector('#apikey-input').value}\`
  - **<NAMESPACE>**: \`${namespaceOutput(document.querySelector('#client-input').value)}\``
  },

  contacts: function (){
    return `## Contacts

  Please let us know if you have any questions.
  
  - **Support**: support@permutive.com
  - **Your Client Success Manager**: ${returnPerson(document.querySelector('#csm-input').value, csmArr)}
  - **Your Solutions Architect**: ${returnPerson(document.querySelector('#sa-input').value, saArr)}`
  },

  domains: function(){
    return `## Deployment Domains
  ${returnDomainList()}
  ---`
  },

  webDeployment: function(){
    return `## Web Deployment

  ### Main Tag
  
  Our main JavaScript tag should be deployed on every page in your web environment:
  \`\`\`javascript
    <script>  
    !function(n,e,o,r,i){if(!e){e=e||{},window.permutive=e,e.q=[],e.config=i||{},e.config.projectId=o,e.config.apiKey=r,e.config.environment=e.config.environment||"production";for(var t=["addon","identify","track","trigger","query","segment","segments","ready","on","once","user","consent"],c=0;c<t.length;c++){var f=t[c];e[f]=function(n){return function(){var o=Array.prototype.slice.call(arguments,0);e.q.push({functionName:n,arguments:o})}}(f)}}}(document,window.permutive,"<PROJECT_ID>","<PUBLIC_API_KEY>",{});  ${returnWebAdserver()}
    permutive.addon('web', { 
      page: ${returnJson(propertyData)}
    });
    </script>
    <script async src="https://cdn.permutive.com/<PROJECT_ID>-web.js"></script>
  \`\`\`
  - The main tag should be placed in between your pages' \`<head> </head>\` tags. Our tag will load Permutive JavaScript asynchronously, ensuring that the page is not blocked while Permutive is loading.
  - Please replace the \`<PROJECT_ID>\` and \`<PUBLIC_API_KEY>\` values in the above snippet
  - If a custom property is available, please fill it in dynamically and send it in the data format specified. **If a custom property is not available, please do not send it at all.**
  - The script has to be placed before a call to \`window.googletag.enableServices()\` is made.`
  },

  ampDeployment: function(){
    return `## AMP Deployment

  The nature of the AMP environment means that our deployment process for AMP is significantly different. Please see our [AMP integration guide](https://developer.permutive.com/docs/amp) for a full description of the deployment stages. 
  
  ### Data Collection
  
  Once you have included your \`amp-analytics\` tag, as usual, you can include any relevant properties from your event schema.

  - Custom properties for the AMP document can be passed in via the \`extraUrlParams\` object. Each property name should be prefixed with \`properties.\`, as shown in the below example.
  - As is the case with the web deployment, if a custom property is not available, please do not send it at all
  - If you want to send in a list property, you must suffix your property name with \`!list\` and pass in a comma-separated string as the property value.

  \`\`\`
    <amp-analytics type="permutive">
      <script type="application/json">
      {${JSON.stringify(amp, null, 5).substring(0, JSON.stringify(amp, null, 5).length - 9).substr(1)
        .replace("\"vars\"", "   \"vars\"")
        .replace("\"extraUrlParams\"", "   \"extraUrlParams\"")
        .replace("},", "   },")
        .replace(/": "\[<LIST>,<OF>,<INTEGERS>\]"/g, "!list[number]\": \"<CSV_LIST>\"")
        .replace(/": "\[<LIST>,<OF>,<FLOATS>\]"/g, "!list[number]\": \"<CSV_LIST>\"")}
        }
      }  
      </script>
    </amp-analytics>
  \`\`\`
      
  Please find detailed instructions for AMP targeting on our docs page:
  
  - **Segmentation**: [https://developer.permutive.com/docs/amp#section-segmentation](https://developer.permutive.com/docs/amp#section-segmentation)
  - **DFP Targeting**: [https://developer.permutive.com/docs/ad-manager-dfp#section-setup-amp](https://developer.permutive.com/docs/ad-manager-dfp#section-setup-amp)
  \n`
  },

  fiaDeployment: function(){
    return `## FIA Deployment

  ### Data Collection
  
  To implement Permutive data collection in the FIA environment, include the following tag within an \`<op-tracker>\`element:
  
  \`\`\`javascript
    <script>  
    !function(n,e,o,r,i){if(!e){e=e||{},window.permutive=e,e.q=[],e.config=i||{},e.config.projectId=o,e.config.apiKey=r,e.config.environment=e.config.environment||"production";for(var t=["addon","identify","track","trigger","query","segment","segments","ready","on","once","user","consent"],c=0;c<t.length;c++){var f=t[c];e[f]=function(n){return function(){var o=Array.prototype.slice.call(arguments,0);e.q.push({functionName:n,arguments:o})}}(f)}}}(document,window.permutive,"<PROJECT_ID>","<PUBLIC_API_KEY>",{});  
    permutive.addon('web', {
      page: ${returnJson(propertyData)}
    });
    </script>
    <script async src="https://cdn.permutive.com/<PROJECT_ID>-fia.js"></script>

  \`\`\`

  - Please replace the \`<PROJECT_ID>\` and \`<PUBLIC_API_KEY>\` values in the above snippet
  
  Please see our [FIA integration guide](https://developer.permutive.com/docs/instant-articles) for a full description of the deployment stages.
  
  Note that similar to our web deployment, custom metadata and properties can be passed into the
  
  \`page: { ... }\`object, if you would like them included on any \`Pageview\`and \`PageviewEngagement\` events tracked.
  
  ${returnFIAAdserver()}`
  }, 

  userIdentity: function(){
    return `## **User Identities**

    if (USER_ID_AVAILABLE) {  
      window.permutive.identify([
        {
          id: '<USER_ID>',
          tag: '<ID_TAG>'
        }
      ])
    }

  - Include the above if a user ID is available on the page. You should call this function just before \`window.permutive.addon(...)\`
  - Please ensure that \`USER_ID_AVAILABLE\` only returns true if a non-empty user ID is available on the page.
  - Simply omit the \`if (USER_ID_AVAILABLE) { ... }\` code block on pages or environments where a user ID is not available.
  - Calling the \`window.permutive.identify\` only when a user logs in is sufficient
  - You must **not** use any public IDs (e.g. **NO** public profile ID, cleartext email addresses or forum IDs)
  - Once an ID is mapped to a user, the relationship cannot be reversed. For that reason, please ensure the correct ID is mapped to each user, and if an ID is not available, nothing is mapped.
  - Please have a look at our [documents here](https://developer.permutive.com/page/the-permutive-javascript-sdk#section-identifying-users-identify-users) for more information`
  },
  
  consent: function(){
    return `# Consent token
    
  Please see our [Consent documentation](https://developer.permutive.com/page/privacy-and-gdpr) for a full explanation on how to implement.`
  },
  
  dfp: function(){
    return `# DFP Access

  In order to activate our DFP integration via our dashboard, you'll need to please give us DFP permissions. These permissions will also enable us to pull reports to check the performance of our integration. This can be done within the DFP UI - by assigning [dfp@permutive.com](mailto:dfp@permutive.com) a custom role with the below set of permissions:
  
  - **View and Edit ad units, placements and key values**
  Permutive needs to have this access so that Permutive can edit placements and key values so we can pass data to DFP for targeting. This will allow for automated syncing of Permutive segments within the DFP, making targeting easier and eliminating human error.
  - **Edit key-values values**
  Permutive passes segments to DFP as key-value pairs, so access is required to push segments to DFP.
  - **Access to DFP Inventory tab**
  Key values are under the DFP inventory tab, so this is needed so that we can help with support and also enable reporting for Permutive key values. Permutive also has alerting in place, allowing us to notify you if targetable inventory rates drop for some reason, ensuring smooth running of operations.
  - **Report creation**
  Permutive will create reports to check on the status of the deployment but also to help with support after go-live.
  
  Please let us know once you have given Permutive access to DFP.`
  },

  appNexus: function(){
    return `# AppNexus Access
  
  In order to activate our AppNexus integration via our dashboard, you'll need to please give us permissions. Please ensure that the following prerequisits have been made:
  
  - **AppNexus Installation**
  You must already have the AppNexus Seller Tag installed on your site and configured to serve your advertising campaigns.
  - **AppNexus User**
  You must create an AppNexus user account our integration can use. Please grant this account the "Network Observer" role, as Permutive will need permissions to manage your key-values and segments in AppNexus.
  - **API Access**
  You must have API access enabled on your AppNexus user. To get this enabled, please discuss this with your AppNexus account manager.
  
  Please let us know once you have given Permutive access to the AppNexus Ad Server.`
  },
  
  androidDeployment: function(){
    if(document.getElementById('java').checked == false && document.getElementById('kotlin').checked == false ){
    return `# Android Deployment

  Please see our [Android documentation](https://developer.permutive.com/docs/android) for a full description on the deployment.
  ${returnAndroidAdserver()}`
    }else{
    return `# Android Deployment

  Please see our [Android documentation](https://developer.permutive.com/docs/android) for a full description on the deployment. Below are examples of the \`Pageview\` tag needed:
  
  ${returnKotlin()}


  ${returnJava()}
  ${returnAndroidAdserver()}

  `
  }},

  iosDeployment: function(){
    if(document.getElementById('swift').checked == false && document.getElementById('objective-c').checked == false ){
    return `# iOS Deployment

  Please see our [iOS documentation](https://developer.permutive.com/docs/ios) for a full description on the deployment.
  ${returniOSAdserver()}`
    }else{ 
    return `# iOS Deployment

  Please see our [iOS documentation](https://developer.permutive.com/docs/ios) for a full description on the deployment. Below are examples of the \`Pageview\` tag needed:
  
  ${returnSwift()}
  ${returnObjectiveC()}
  ${returniOSAdserver()}
  `
  }
}}


function returnSwift(){
  if(document.getElementById('swift').checked == true){
    return `### Swift

  \`\`\`
  let context = PermutiveEventActionContext()
  context.title = "<STRING>"
  context.url = URL(string: "<URL STRING>")
  context.referrer = URL(string: "<REFERRER STRING>")
  Permutive.setContext(context)
  let iso8601DateFormatter = ISO8601DateFormatter();
  iso8601DateFormatter.formatOptions = [.withInternetDateTime, .withDashSeparatorInDate, .withColonSeparatorInTime, .withTimeZone];
  Permutive.permutive()?.eventTracker.track("Pageview", properties:[
 ${returnSwiftJson(propertyData)})
 ${returnSwiftAdserver()} 
  \`\`\`
  `
  }else return ""
}

function returnObjectiveC(){
  if(document.getElementById('objective-c').checked == true){
    return `### Objective C

  \`\`\`
  // Setting the Permutive Context
  PermutiveEventActionContext *context = [[PermutiveEventActionContext alloc] init];
  context.title = @"<STRING>";
  context.url = [[NSURL alloc] initWithString: @"<URL STRING>"];
  context.referrer = [[NSURL alloc] initWithString: @"<REFERRER STRING>"];
  [Permutive setContext:[[PermutiveEventActionContext alloc] init]];

  // Send a Pageview event
  NSDate *articlePublishDate = [NSDate date]; // Current date used for convenience.
  NSISO8601DateFormatter *iso8601DateFormatter = [[NSISO8601DateFormatter alloc] init];
  iso8601DateFormatter.formatOptions = NSISO8601DateFormatWithInternetDateTime | NSISO8601DateFormatWithDashSeparatorInDate | NSISO8601DateFormatWithColonSeparatorInTime | NSISO8601DateFormatWithTimeZone;
  NSDictionary *properties = @{
${returnObjectiveCJson(propertyData)};
 [Permutive.permutive.eventTracker track:@"Pageview" properties:properties];

 ${returnObjectiveCAdserver()} 
  \`\`\`
  `
  }else return ""
}

function returnKotlin(){
  if(document.getElementById('kotlin').checked == true){
  return `### Kotlin

  \`\`\`
  //To track Pageview event
  val pageTracker = permutive.trackPage(
    eventProperties = EventProperties.Builder()
 ${returnKotlinJson(propertyData)}
      .build(),
    title = "<STRING>",
    url = Uri.parse("<URL STRING>"),
    referrer = Uri.parse("<REFERRER STRING>")
  )
​
  //to track PageviewEngagementAggregate event
  pageTracker.close()
  \`\`\`
  `
  } else return ""
}

function returnJava(){
  if(document.getElementById('java').checked == true){
  return `### Java

  \`\`\`
  //To track Pageview event
  final PageTracker pageTracker = permutive.trackPage(
    new EventProperties.Builder()
 ${returnJavaJson(propertyData)}
      .build(),
    "<STRING>",
    Uri.parse("<URL STRING>"),
    Uri.parse("<REFERRER STRING>")
  )
​
  //to track PageviewEngagementAggregate event
  pageTracker.close()
  \`\`\`
  `
  } else return ""
}

function returnWebAdserver(){
  if(document.getElementById('appnexusas').checked == true && document.getElementById('googleas').checked == false){
  return `
    window.apntag=window.apntag||{};window.apntag.anq=window.apntag.anq||[];window.__permutive=window.__permutive||{};window.__permutive.appnexusEvents=window.__permutive.appnexusEvents||[];['adRequested','adAvailable','adBadRequest','adLoaded','adNoBid','adError','adCollapse'].forEach(function(eventType){window.apntag.anq.push(function(){window.apntag.onEvent(eventType,function(arg){window.__permutive.appnexusEvents.push({eventType:eventType,arg:arg})})})});window.apntag.anq.push(function(){var original=window.apntag.defineTag;window.apntag.defineTag=function(arg){original(arg);try{if(arg.targetId){var kvs=window.localStorage.getItem('_papns');window.apntag.setKeywords(arg.targetId,{"permutive":kvs?JSON.parse(kvs):[]},{overrideKeyValue:!0})}}catch(e){}}})`
  } else if (document.getElementById('googleas').checked == true && document.getElementById('appnexusas').checked == true){
    return `
    window.googletag=window.googletag||{},window.googletag.cmd=window.googletag.cmd||[],window.googletag.cmd.push(function(){if(0===window.googletag.pubads().getTargeting("permutive").length){var g=window.localStorage.getItem("_pdfps");window.googletag.pubads().setTargeting("permutive",g?JSON.parse(g):[])}});
    window.apntag=window.apntag||{};window.apntag.anq=window.apntag.anq||[];window.__permutive=window.__permutive||{};window.__permutive.appnexusEvents=window.__permutive.appnexusEvents||[];['adRequested','adAvailable','adBadRequest','adLoaded','adNoBid','adError','adCollapse'].forEach(function(eventType){window.apntag.anq.push(function(){window.apntag.onEvent(eventType,function(arg){window.__permutive.appnexusEvents.push({eventType:eventType,arg:arg})})})});window.apntag.anq.push(function(){var original=window.apntag.defineTag;window.apntag.defineTag=function(arg){original(arg);try{if(arg.targetId){var kvs=window.localStorage.getItem('_papns');window.apntag.setKeywords(arg.targetId,{"permutive":kvs?JSON.parse(kvs):[]},{overrideKeyValue:!0})}}catch(e){}}})`
  }else if(document.getElementById('googleas').checked == true && document.getElementById('appnexusas').checked == false){
  return `
    window.googletag=window.googletag||{},window.googletag.cmd=window.googletag.cmd||[],window.googletag.cmd.push(function(){if(0===window.googletag.pubads().getTargeting("permutive").length){var g=window.localStorage.getItem("_pdfps");window.googletag.pubads().setTargeting("permutive",g?JSON.parse(g):[])}});`
  } else return ""
}

function returnAndroidAdserver(){
  if(document.getElementById('appnexusas').checked == false && document.getElementById('googleas').checked == true){
  return `### DFP Targeting

  To pass Permutive targeting data into DFP on Android, please view the documentation [here](https://developer.permutive.com/docs/android#section-custom-targeting-with-google-ads):`
  } else if(document.getElementById('appnexusas').checked == true && document.getElementById('googleas').checked == false){
  return `### AppNexus Targeting

  To pass Permutive targeting data into AppNexus Ad Server on Android, please view the documentation [here](https://developer.permutive.com/docs/android#section-custom-targeting-with-app-nexus):`
  } else if(document.getElementById('appnexusas').checked == true && document.getElementById('googleas').checked == true){
    return `### DFP Targeting

  To pass Permutive targeting data into DFP on Android, please view the documentation [here](https://developer.permutive.com/docs/android#section-custom-targeting-with-google-ads):
  
  ### AppNexus Targeting
  
  To pass Permutive targeting data into AppNexus Ad Server on Android, please view the documentation [here](https://developer.permutive.com/docs/android#section-custom-targeting-with-app-nexus):`
  } else return ""
}

function returniOSAdserver(){
  if(document.getElementById('googleas').checked == true){
  return `### DFP Targeting

  To pass Permutive targeting data into DFP on iOS, please view the documentation [here](https://developer.permutive.com/docs/ios#section-google-ad-words-dfp-custom-targets):`
  } else return ""
}

function returnSwiftAdserver(){
  if(document.getElementById('googleas').checked == true){
  return `let request = DFPRequest()
  if let segments = Permutive.permutive()?.triggersProvider.dfpRequestCustomTargeting {
      request.customTargeting = segments
  }
  self.bannerView.load(request)`
  } else return ""
}

function returnObjectiveCAdserver(){
  if(document.getElementById('googleas').checked == true){
  return `// Get DFP custom segments
  NSDictionary *customSegments = [Permutive.permutive.triggersProvider dfpRequestCustomTargeting];
  if (customSegments != NULL) {
      // Assign dfpRequest.customTargetting = customSegments;
  }`
  } else return ""
}

function returnFIAAdserver(){
  if(document.getElementById('googleas').checked == true){
  return `### DFP Targeting

  To pass Permutive targeting data into DFP, include the following JavaScript within your \`<op-ad>\` elements:

    <script>  
    window.googletag = window.googletag || {};  window.googletag.cmd = window.googletag.cmd || [];  googletag.cmd.push(function() {    if (googletag.pubads().getTargeting('permutive').length == 0) {      var kvs = localStorage.getItem('_pdfps');      googletag.pubads().setTargeting('permutive', kvs ? JSON.parse(kvs) : []);    }  });
    </script>`
  } else return ""
}

var data = []
var uniObj

function downloadJson (){
  var dataString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(buildJsonObj(), null, 3));
  var downloadFunction = document.getElementById('copyfunc')
  downloadFunction.setAttribute('href', dataString)
  var date = new Date()
  downloadFunction.setAttribute('download', `${namespaceOutput(document.querySelector('#client-input').value) + '_' + date.getDate()+'-'+parseInt(date.getMonth()+1)+'-'+date.getFullYear()}.json`)
  downloadFunction.click()
}

function handleFileSelect(evt) { var files = evt.target.files; 
  var output = []; for (var i = 0, f; f = files[i]; i++) { 
    var reader = new FileReader()
    reader.onload = (function(file) { 
      return function(e) { 
        populateList(e.target.result)
      }; 
    })(f); 
    reader.readAsText(f);
  } 
  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>'; 
} 
document.getElementById('files').addEventListener('change', handleFileSelect, false);


var camelize = function(str) {
  return str
    .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
    .replace(/\s/g, '')
    .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
}

function variableType(objType){
  if(objType  == '<LIST>,<OF>,<STRINGS>'){
    return '<CSV_LIST>'
  }
  return objType
}

function keyBuilder(key,value){
  if(value == '<CSV_LIST>'){
    return 'properties.'+key+'!list[string]'
  }else{
    return 'properties.'+key
  }
}

const iterate = (obj,parentKey) => {
var obj_lngt = Object.keys(obj).length
var counter = 0
Object.keys(obj).forEach(key => {   
    counter++   
    if (obj[key] == '[object Object]') {
        keysTracker.push(key)
        iterate(obj[key], tempKey)
    }
    if(keysTracker.length > 0 && obj[key] != '[object Object]'){
      var temp = keyBuilder(keysTracker.join('.')+'.'+key,variableType(obj[key].toString()))
      amp.extraUrlParams[temp] = variableType(obj[key].toString())
    }else if (obj[key] != '[object Object]'){
      var temp = keyBuilder(key,variableType(obj[key].toString()))
      amp.extraUrlParams[temp] = variableType(obj[key].toString())
    }
    if(counter == obj_lngt || key == keysTracker.toString()){
        keysTracker.pop()
    }
  })
}

const listIterate = (obj, list) => {
var obj_lngt = Object.keys(obj).length
var counter = 0
Object.keys(obj).forEach(key => {   
    counter++   
    if (obj[key] == '[object Object]') {
      projKeysTracker.push(key)
        list.insertAdjacentHTML('beforeend', 
        `<li class="property-item" id="item-${counter}-${key}" style="width: 400px;">${key}                
        <select class="custom-select" id="property-type-item-${counter}-${key}" style="float: right;">
          <option value="string">String</option>
          <option value="integer">Integer</option>
          <option value="float">Float</option>
          <option value="object" selected>Object</option>
          <option value="date">Date/Time</option>
          <option value="boolean">Boolean</option>
          <option value="lostring">List of Strings</option>
          <option value="lointegers">List of Integers</option>
          <option value="lofloats">List of Floats</option>
        </select><button id="delete-btn-item-item-${counter}-${key}" class="delete"></button><svg enable-background="new 0 0 512 512" id="trash-svg" class="trash-svg" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M444.852,66.908h-99.339V47.04c0-21.943-17.792-39.736-39.736-39.736h-99.339   c-21.944,0-39.736,17.793-39.736,39.736v19.868H67.363v19.868h20.47l19.887,377.489c0,21.944,17.792,39.736,39.736,39.736h218.546   c21.944,0,39.736-17.792,39.736-39.736l19.538-377.489h19.577V66.908z M186.57,47.04c0-10.962,8.926-19.868,19.868-19.868h99.339   c10.962,0,19.868,8.906,19.868,19.868v19.868H186.57V47.04z M385.908,463.236l-0.039,0.505v0.524   c0,10.943-8.906,19.868-19.868,19.868H147.455c-10.942,0-19.868-8.925-19.868-19.868v-0.524l-0.019-0.523L107.72,86.776h297.669   L385.908,463.236z" fill="#8792a1"></path><rect fill="#8792a1" height="317.885" width="19.868" x="246.173" y="126.511"></rect><polygon fill="#8792a1" points="206.884,443.757 186.551,126.493 166.722,127.753 187.056,445.017  "></polygon><polygon fill="#8792a1" points="345.649,127.132 325.82,125.891 305.777,443.776 325.606,445.017  "></polygon></g></svg>
        <ul id="properties-${key}"></ul>
        <button id="add-sub-property-${key}" class="add-sub-property">+ Add Property</button></li>`)
        document.getElementById(`add-sub-property-${key}`).addEventListener('click', function(){
          addProperty(`properties-${key}`)
        })
        document.getElementById(`property-type-item-${counter}-${key}`).addEventListener('change', function () {
          var typeEl = document.getElementById(`property-type-item-${counter}-${key}`)
          propType(typeEl.value, property, key)
        })
        listIterate(obj[key], document.getElementById(`properties-${key}`))
    }
    if(projKeysTracker.length > 0 && obj[key] != '[object Object]'){
      list.insertAdjacentHTML('beforeend', propElement(key, obj[key].toString(), counter))
      document.getElementById(`property-type-${key}`).addEventListener('change', function () {
        var typeEl = document.getElementById(`property-type-${key}`)
        propType(typeEl.value, typeEl.parentNode, key)
      })
    }else if (obj[key] != '[object Object]'){
      list.insertAdjacentHTML('beforeend', propElement(key, obj[key].toString(), counter))
      document.getElementById(`property-type-${key}`).addEventListener('change', function () {
        var typeEl = document.getElementById(`property-type-${key}`)
        propType(typeEl.value, typeEl.parentNode, key)
      })
    }
    if(counter == obj_lngt || key == projKeysTracker.toString()){
      projKeysTracker.pop()
    }
  })
}

function propElement (key, type, counter){
  return `
  <li class="property-item" id="item-${counter}-${key}" style="width: 400px;">${key}
  <select class="custom-select" id="property-type-${key}">
    ${stringSelect(type)}
    ${integerSelect(type)}
    ${floatSelect(type)}
    <option value="object">Object</option>
    ${dateSelect(type)}
    ${booleanSelect(type)}
    ${lostringSelect(type)}
    ${lointegersSelect(type)}
    ${lofloatsSelect(type)}
  </select><button id="delete-btn-${key}" class="delete"></button><svg enable-background="new 0 0 512 512" id="trash-svg" class="trash-svg" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M444.852,66.908h-99.339V47.04c0-21.943-17.792-39.736-39.736-39.736h-99.339   c-21.944,0-39.736,17.793-39.736,39.736v19.868H67.363v19.868h20.47l19.887,377.489c0,21.944,17.792,39.736,39.736,39.736h218.546   c21.944,0,39.736-17.792,39.736-39.736l19.538-377.489h19.577V66.908z M186.57,47.04c0-10.962,8.926-19.868,19.868-19.868h99.339   c10.962,0,19.868,8.906,19.868,19.868v19.868H186.57V47.04z M385.908,463.236l-0.039,0.505v0.524   c0,10.943-8.906,19.868-19.868,19.868H147.455c-10.942,0-19.868-8.925-19.868-19.868v-0.524l-0.019-0.523L107.72,86.776h297.669   L385.908,463.236z" fill="#8792a1"/><rect fill="#8792a1" height="317.885" width="19.868" x="246.173" y="126.511"/><polygon fill="#8792a1" points="206.884,443.757 186.551,126.493 166.722,127.753 187.056,445.017  "/><polygon fill="#8792a1" points="345.649,127.132 325.82,125.891 305.777,443.776 325.606,445.017  "/></g></svg></li>`
}

function stringSelect(type){
  if(type == '<STRING>'){
    return '<option value="string" selected>String</option>'
  }else{
    return '<option value="string">String</option>'
  }
}

function integerSelect(type){
  if(type == '<INTEGER>'){
    return '<option value="integer" selected>Integer</option>'
  }else{
    return '<option value="integer">Integer</option>'
  }
}

function floatSelect(type){
  if(type == '<FLOAT>'){
    return '<option value="float" selected>Float</option>'
  }else{
    return '<option value="float">Float</option>'
  }
}

function dateSelect(type){
  if(type == '<DATE/TIME>'){
    return '<option value="date" selected>Date/Time</option>'
  }else{
    return '<option value="date">Date/Time</option>'
  }
}

function booleanSelect(type){
  if(type == '<BOOLEAN>'){
    return '<option value="boolean" selected>Boolean</option>'
  }else{
    return '<option value="boolean">Boolean</option>'
  }
}

function lostringSelect(type){
  if(type == '<LIST>,<OF>,<STRINGS>'){
    return '<option value="lostring" selected>List of Strings</option>'
  }else{
    return '<option value="lostring">List of Strings</option>'
  }
}

function lointegersSelect(type){
  if(type == '<LIST>,<OF>,<INTEGERS>'){
    return '<option value="lointegers" selected>List of Integers</option>'
  }else{
    return '<option value="lointegers">List of Integers</option>'
  }
}

function lofloatsSelect(type){
  if(type == '<LIST>,<OF>,<INTEGERS>'){
    return '<option value="lofloats" selected>List of Floats</option>'
  }else{
    return '<option value="lofloats">List of Floats</option>'
  }
}

function changeStateAddPropertiesButtons(value){
  var nodes = document.querySelectorAll('.add-property, .add-sub-property')
  var nodesArr = Array.prototype.slice.call(nodes)
  nodesArr.forEach(el => {
    el.disabled = value
  });
}

function populateList(jsonObj){
  document.getElementById('json-input').value = jsonObj
  console.log(JSON.parse(jsonObj))
  projectData = JSON.parse(jsonObj)
  projectSchemaData = projectData['schema']
  listIterate(projectSchemaData, document.getElementById('properties-propertyData'))
  populateDom(projectData)
  setUpEventListeners()
}

function populateDom (projectData){
  document.getElementById('client-input').value = projectData.clientName
  document.getElementById('sa-input').value = projectData.projectSa
  document.getElementById('csm-input').value = projectData.projectCsm
  document.getElementById('domains-list').insertAdjacentHTML('afterbegin', populateDomains(projectData.deploymentDomains))
  document.getElementById('projectid-input').value = projectData.projectId
  document.getElementById('apikey-input').value = projectData.apiKey
  projectData.type === true ? document.getElementById('type').checked = true : document.getElementById('type').checked = false
  projectData.content === true ? document.getElementById('content').checked = true : document.getElementById('content').checked = false
  projectData.article === true ? document.getElementById('article').checked = true : document.getElementById('article').checked = false
  projectData.user === true ? document.getElementById('user').checked = true : document.getElementById('user').checked = false
  projectData.amp === true ? document.getElementById('amp').checked = true : document.getElementById('amp').checked = false
  projectData.fia === true ? document.getElementById('fia').checked = true : document.getElementById('fia').checked = false
  if(projectData.android === true){
    var list = document.querySelector(".input-list-android")
    list.style = "display:block"
    document.getElementById('android').checked = true
    projectData.kotlin === true ? document.getElementById('kotlin').checked = true : document.getElementById('kotlin').checked = false
    projectData.java === true ? document.getElementById('java').checked = true : document.getElementById('java').checked = false
  }
  if(projectData.ios === true){
    var list = document.querySelector(".input-list-ios")
    list.style = "display:block"
    document.getElementById('ios').checked = true
    projectData.swift === true ? document.getElementById('swift').checked = true : document.getElementById('swift').checked = false
    projectData.objectiveC === true ? document.getElementById('objective-c').checked = true : document.getElementById('objective-c').checked = false
  }
  projectData.googleAS === true ? document.getElementById('googleas').checked = true : document.getElementById('googleas').checked = false
  projectData.appNexusAS === true ? document.getElementById('appnexusas').checked = true : document.getElementById('appnexusas').checked = false
  projectData.consent === true ? document.getElementById('consent').checked = true : document.getElementById('consent').checked = false
  projectData.dfp === true ? document.getElementById('dfp').checked = true : document.getElementById('dfp').checked = false
  projectData.appNexus === true ? document.getElementById('appnexus').checked = true : document.getElementById('appnexus').checked = false
}

function populateDomains (arr){
  var domEl = ''
  if(arr){
    for(var i=0; i<arr.length; i++){
      domEl += `<li>${arr[i]}</li>`
    }
  }
  return domEl
}

function populateObject(list, obj){
  var listNodes = list.childNodes
  var listArr = Array.prototype.slice.call(listNodes)
    for(var i = 0; i<listArr.length; i++){
        if(listArr[i].localName == 'li'){
            var subNodes = listArr[i].childNodes 
            var subListArr = Array.prototype.slice.call(subNodes)
            for(var y = 0; y<subListArr.length; y++){
                if(subListArr[y].localName == 'select'){
                    if(subListArr[y].value !== 'object'){
                        obj[`${camelize(subListArr[y-1].textContent.split('\n')[0])}`] = typeOutput(subListArr[y].value)
                    }else{
                        obj[`${camelize(subListArr[y-1].textContent.split('\n')[0])}`] = {}
                        var string = camelize(subListArr[y-1].textContent.split('\n')[0])
                        var propNodes = subListArr[y].parentNode.childNodes
                        var propListArr = Array.prototype.slice.call(propNodes)
                        for(var z = 0; z<propListArr.length; z++){
                            if(propListArr[z].localName == 'ul'){
                                populateObject(propListArr[z], obj[string])
                            }
                        }
                    }
                }
            }
        }
    }
}

function returnKotlinJson(propertyData){
  var json = JSON.stringify(propertyData,function(k,v){
      if(v instanceof Array)
        return JSON.stringify(v);
      return v;
   },3)
      .replace(/\\/g, "" )
      .replace(/"(\w+)"\s*: "<STRING>"\,?/g, '   .with("$1", "<STRING>")')
      .replace(/"(\w+)"\s*: "<INTEGER>"\,?/g, '   .with("$1", 12345)')
      .replace(/"(\w+)"\s*: "<FLOAT>"\,?/g, '   .with("$1", 123.45)')
      .replace(/"(\w+)"\s*: "<BOOLEAN>"\,?/g, '   .with("$1", true)')
      .replace(/"(\w+)"\s*: "<DATE\/TIME>"\,?/g, '   .with("$1", Date())')
      .replace(/"(\w+)"\s*: "\["<LIST>","<OF>","<STRINGS>"\]"\,?/g, '   .withStrings("$1", listOf("<LIST>","<OF>","<STRINGS>"))')
      .replace(/"(\w+)"\s*: "\[<LIST>,<OF>,<INTEGERS>\]"\,?/g, '   .withInts("$1", listOf(<LIST>,<OF>,<INTEGERS>))')
      .replace(/"(\w+)"\s*: "\[<LIST>,<OF>,<FLOATS>\]"\,?/g, '   .withFloats("$1", listOf(<LIST>,<OF>,<FLOATS>))')
      .replace(/"(\w+)"\s*: "<STRING>"\,?/g, '   .with("$1", "<STRING>")')
      .replace(/"(\w+)"\s*: {/g, '   .with("$1", EventProperties.Builder()')
      .replace(/( +)}/g, '  $1    .build()\n   $1)')
      .replace(/( +)},/g, '  $1    .build()\n   $1)')
      .replace(/\),/g, ')')
      .substr(3)
      .slice(0, -2)
  return json
}

function returnJavaJson(propertyData){
  var json = JSON.stringify(propertyData,function(k,v){
      if(v instanceof Array)
        return JSON.stringify(v);
      return v;
   },3)
      .replace(/\\/g, "" )
      .replace(/"(\w+)"\s*: "<STRING>"\,?/g, '   .with("$1", "<STRING>")')
      .replace(/"(\w+)"\s*: "<INTEGER>"\,?/g, '   .with("$1", 12345)')
      .replace(/"(\w+)"\s*: "<FLOAT>"\,?/g, '   .with("$1", 123.45)')
      .replace(/"(\w+)"\s*: "<BOOLEAN>"\,?/g, '   .with("$1", true)')
      .replace(/"(\w+)"\s*: "<DATE\/TIME>"\,?/g, '   .with("$1", new Date())')
      .replace(/"(\w+)"\s*: "\["<LIST>","<OF>","<STRINGS>"\]"\,?/g, '   .withStrings("$1", Arrays.asList("<LIST>","<OF>","<STRINGS>"))')
      .replace(/"(\w+)"\s*: "\[<LIST>,<OF>,<INTEGERS>\]"\,?/g, '   .withInts("$1", Arrays.asList(<LIST>,<OF>,<INTEGERS>))')
      .replace(/"(\w+)"\s*: "\[<LIST>,<OF>,<FLOATS>\]"\,?/g, '   .withFloats("$1", Arrays.asList(<LIST>,<OF>,<FLOATS>))')
      .replace(/"(\w+)"\s*: "<STRING>"\,?/g, '   .with("$1", "<STRING>")')
      .replace(/"(\w+)"\s*: {/g, '   .with("$1", new EventProperties.Builder()')
      .replace(/( +)}/g, '  $1    .build()\n   $1)')
      .replace(/( +)},/g, '  $1    .build()\n   $1)')
      .replace(/\),/g, ')')
      .substr(3)
      .slice(0, -2)
  return json
}

function returnJson(propertyData){
  var json = JSON.stringify(propertyData,function(k,v){
      if(v instanceof Array)
        return JSON.stringify(v);
      return v;
    },2)
      .replace(/\\/g, "" )
      .replace(/"(\w+)"\s*:/g, '      $1:')
      .replace(/"\[/g, `[`)
      .replace(/\]"/g, `]`)
      .replace(/\}/g, `      }`)
  return json
}

function returnSwiftJson(propertyData){
  var json = JSON.stringify(propertyData,function(k,v){
      if(v instanceof Array)
        return JSON.stringify(v);
      return v;
    },2)
      .replace(/\\/g, "" )
      .replace(/"(\w+)"\s*:/g, '  "$1":')
      .replace(/"\[/g, `[`)
      .replace(/\]"/g, `]`)
      .replace(/\}/g, `  ]`)
      .replace(/"(\w+)"\s*: "<DATE\/TIME>"/g, '"$1": iso8601DateFormatter.string(from: Date())')
      .replace(/\{/g, `[`)
      .replace("\"<BOOLEAN>\"", `true`)
      .replace(/"(\w+)"\s*: "<BOOLEAN>"\,/g, `"$1": true,`)
      .replace(/"(\w+)"\s*: "<BOOLEAN>"/g, `"$1": true`)
      .replace(/"(\w+)"\s*: "<INTEGER>"\,/g, `"$1": 12345,`)
      .replace(/"(\w+)"\s*: "<INTEGER>"/g, `"$1": 12345`)
      .replace(/"(\w+)"\s*: "<FLOAT>"\,/g, `"$1": 123.45,`)
      .replace(/"(\w+)"\s*: "<FLOAT>"/g, `"$1": 123.45`)
      .substr(3)
  return json
}

function returnObjectiveCJson(propertyData){
  var json = JSON.stringify(propertyData,function(k,v){
      if(v instanceof Array)
        return JSON.stringify(v);
      return v;
    },2)
      .replace(/\\/g, "" )
      .replace(/"(\w+)"\s*:/g, '  @"$1":')
      .replace(/"\[/g, `[`)
      .replace(/\]"/g, `]`)
      .replace(/\}/g, `  }`)
      .replace(/"(\w+)"\s*: "<DATE\/TIME>"/g, '"$1": [iso8601DateFormatter stringFromDate: articlePublishDate]')
      .replace(/\{/g, `@{`)
      .replace(/"(\w+)"\s*: "<BOOLEAN>"\,/g, `"$1": @YES,`)
      .replace(/"(\w+)"\s*: "<BOOLEAN>"/g, `"$1": @YES`)
      .replace(/"(\w+)"\s*: "<INTEGER>"\,/g, `"$1": @12345,`)
      .replace(/"(\w+)"\s*: "<INTEGER>"/g, `"$1": @12345`)
      .replace(/"(\w+)"\s*: "<FLOAT>"\,/g, `"$1": @123.45,`)
      .replace(/"(\w+)"\s*: "<FLOAT>"/g, `"$1": @123.45`)
      .replace(/"(\w+)"\s*: "<STRING>"\,/g, `"$1": @"<STRING>",`)
      .replace(/"(\w+)"\s*: "<STRING>"/g, `"$1": @"<STRING>"`)
      .replace(/"(\w+)"\s*: \["<LIST>","<OF>","<STRINGS>"\]\,/g, `"$1": @[@"<LIST>", @"<OF>", @"<STRINGS>"],`)
      .replace(/"(\w+)"\s*: \["<LIST>","<OF>","<STRINGS>"\]/g, `"$1": @[@"<LIST>", @"<OF>", @"<STRINGS>"]`)
      .substr(3)
  return json
}

function typeOutput(type){
  if(type == 'string'){
    return '<STRING>'
  }else if(type == 'integer'){
    return '<INTEGER>'
  }else if(type == 'float'){
    return '<FLOAT>'
  }else if(type == 'date'){
    return '<DATE/TIME>'
  }else if(type == 'boolean'){
    return '<BOOLEAN>'
  }else if(type == 'lostring'){
    return ["<LIST>","<OF>","<STRINGS>"]
  }else if(type == 'lointegers'){
    return "[<LIST>,<OF>,<INTEGERS>]"
  }else if(type == 'lofloats'){
    return "[<LIST>,<OF>,<FLOATS>]"
  }else {
    return '{'
  }
}

function returnDomainList (){
  var string = ``
  if(domainsArr.length > 0){
    for(var i = 0; i < domainsArr.length; i++){
      string += `- ${domainsArr[i]} \n`
    }
  }else if(projectData.deploymentDomains !== undefined && projectData.deploymentDomains.length > 0){
    for(var i = 0; i < projectData.deploymentDomains.length; i++){
      string += `- ${projectData.deploymentDomains[i]} \n`
    }
  }

  return string
}

function namespaceOutput (value){
  return value.toLowerCase().replace(' ', '')
}

function returnPerson(input, arr){
  var person 
  for(var i = 0 ; i < arr.length ; i++){
    if((arr[i].toLowerCase().includes(input.toLowerCase()) === true) || (arr[i].toLowerCase() == input.toLowerCase())){
      person = arr[i]
    }
  }
  console.log(person)
  return person
}

function setUpEventListeners() {
  document.getElementById('submit-btn').addEventListener('click', getGiphy)
  document.getElementById('copy-btn').addEventListener('click', copyJson)
  document.getElementById('dwnld-btn').addEventListener('click', downloadJson)
  document.getElementById('add-property').addEventListener('click', addProperty)
  document.getElementById('domains-input').addEventListener('keypress', function(e){
    if(e.keyCode === 13){
      addDomain()
    }
  })
  document.addEventListener('click', function(e){
    if(e.target.id.includes('delete-btn')){
      var child = e.target.parentNode
      child.parentNode.removeChild(child)
    }
  })

  document.getElementById("android").addEventListener('change', function(){
    var list = document.querySelector(".input-list-android")
    if(this.checked){
      list.style = "display:block"
    }else{
      list.style = "display:none"
    }
  })

  document.getElementById("ios").addEventListener('change', function(){
    var list = document.querySelector(".input-list-ios")
    if(this.checked){
      list.style = "display:block"
    }else{
      list.style = "display:none"
    }
  })
}

function addDomain(){ 
  var input = document.getElementById('domains-input')
  var list = document.getElementById('domains-list')
  if(input.value !== ''){
    domainsArr.push(input.value)
    var domain = document.createElement('li')
    domain.textContent = input.value
    list.appendChild(domain)
    input.value = ''
  } else return
}

function Property (id, value, type){
  this.id = id;
  this.value = value;
  this.type = type;
}

function addProperty (value) {
  var property = document.createElement('li')
  property.className = 'property-item'
  property.id = `item-${propertyDataArr.length + 1}`
  var list

  if (value && value.type !== 'click'){
    list = document.getElementById(value)
  }else{
    list = document.getElementById('properties-propertyData')
  }

  list.appendChild(property)
  var propertyInput = document.createElement('input')
  propertyInput.id = `item-${propertyDataArr.length + 1}`
  property.appendChild(propertyInput)
  propertyInput.style.width = '400px'
  propertyInput.classList = 'var-input'
  propertyInput.focus()
  changeStateAddPropertiesButtons(true)
  document.addEventListener('keypress', function(e){
    if (propertyInput.value !== '' && e.keyCode === 13){
      changeStateAddPropertiesButtons(false)
      property.innerHTML = ''
      property.style.width = '400px'
      if (property.id == `item-${propertyDataArr.length + 1}`){
        var propertyObj = new Property(propertyDataArr.length + 1, propertyInput.value)
        var listName = list.id.split('properties-')[1]
        propertyDataArr.push(propertyObj)
        propertyInput.value = ''
      }
      property.innerHTML = propertyObj.value + propetyType(`${property.id}`, property)
      var type = document.getElementById('property-type')
      type.id = `property-type-${property.id}`
      type.style = 'float: right;'
      document.getElementById(`property-type-${property.id}`).addEventListener('change', function () {
        var typeEl = document.getElementById(`property-type-${property.id}`)
        propType(typeEl.value, property, propertyDataArr[parseInt(typeEl.id.split('-')[3]) - 1].value)
      })
    }else{
      propertyInput.style = 'width: 400px; border: 1px solid rgb(249,99,107)'
      propertyInput.placeholder = "Please enter a property name"
      propertyInput.placeholder.color = "rgb(249,99,107)"
    }
  })
}

function propType (type, property, value) {
  var childNodes = property.childNodes
  var childNodesArr = Array.prototype.slice.call(childNodes)

  if (type === 'object'){
    console.log(type)
    for(var i = 0 ; i < childNodesArr.length ; i++){
      if (childNodesArr[i].type !== 'submit'){
        var addProp = document.createElement('button')
        addProp.id = `add-sub-property`
        addProp.classList = 'add-sub-property'
        addProp.innerText = '+ Add Property'
        var list = document.createElement('ul')
        list.id = `properties-${camelize(value)}`
        property.appendChild(list)
        property.appendChild(addProp)
        addProp.addEventListener('click', function(){
          addProperty(`properties-${camelize(value)}`)
        })
        return
      }else {
        childNodesArr[i].style = 'display:block'
      }
    }    
  } else if (type === 'string') {
    for(var i = 0 ; i < childNodesArr.length ; i++){
      if (childNodesArr[i].type === 'submit' && childNodesArr[i].innerText === '+ Add Property'){
        childNodesArr[i].style = 'display:none'
      }
    }
  } else if (type === 'integer') {
    for(var i = 0 ; i < childNodesArr.length ; i++){
      if (childNodesArr[i].type === 'submit' && childNodesArr[i].innerText === '+ Add Property'){
        childNodesArr[i].style = 'display:none'
      }
    }
  }
}

function ampSelected (){
  var input = document.getElementById('amp')
  if(input.checked == true){
    return strings.ampDeployment()
  }else return ""
}

function fiaSelected (){
  var input = document.getElementById('fia')
  if(input.checked == true){
    return strings.fiaDeployment()
  }else return ""
}

function androidSelected (){
  var input = document.getElementById('android')
  if(input.checked == true){
    return strings.androidDeployment()
  }else return ""
}

function iosSelected (){
  var input = document.getElementById('ios')
  if(input.checked == true){
    return strings.iosDeployment()
  }else return ""
}

function consentSelected (){
  var input = document.getElementById('consent')
  if(input.checked == true){
    return strings.consent()
  }else return ""
}

function dfpSelected (){
  var input = document.getElementById('dfp')
  if(input.checked == true){
    return strings.dfp()
  }else return ""
}

function appNexusSelected (){
  var input = document.getElementById('appnexus')
  if(input.checked == true){
    return strings.appNexus()
  }else return ""
}

typeCheck.addEventListener( 'change', function() {
  if(this.checked) {
      propertiesList.insertAdjacentHTML('afterbegin', typeElement)
  } else {
    if($(document.getElementById('item-type')).length == 0){
      return
    }else{
      var child = document.getElementById('item-type')
      child.parentNode.removeChild(child)
    }
  }
});

function addPropEventListener(button, string){
  button.addEventListener('click', function(){
    addProperty(string)
  })
}

contentCheck.addEventListener( 'change', function() {
  if(this.checked && $(document.getElementById('item-type')).length == 0) {
      propertiesList.insertAdjacentHTML('afterbegin', contentElement)
      addPropEventListener(document.getElementById('add-sub-property-content'), 'properties-content')
  } else if(this.checked && $(document.getElementById('item-type')).length > 0){
    document.getElementById('item-type').insertAdjacentHTML('afterend', contentElement)
    addPropEventListener(document.getElementById('add-sub-property-content'), 'properties-content')
  }else{
    if($(document.getElementById('item-content')).length == 0){
      return
    }else{
      var child = document.getElementById('item-content')
      child.parentNode.removeChild(child)
    }
  }
});

articleCheck.addEventListener( 'change', function() {
  if(this.checked && $(document.getElementById('item-type')).length == 0 && $(document.getElementById('item-content')).length == 0) {
      propertiesList.insertAdjacentHTML('afterbegin', articleElement)
      addPropEventListener(document.getElementById('add-sub-property-article'), 'properties-article')
  } else if(this.checked && ($(document.getElementById('item-type')).length > 0 || $(document.getElementById('item-content')).length > 0)){
    if($(document.getElementById('item-content')).length == 0){
      document.getElementById('item-type').insertAdjacentHTML('afterend', articleElement)
      addPropEventListener(document.getElementById('add-sub-property-article'), 'properties-article')
    }else{
      document.getElementById('item-content').insertAdjacentHTML('afterend', articleElement)
      addPropEventListener(document.getElementById('add-sub-property-article'), 'properties-article')
    }
  }else{
    if($(document.getElementById('item-article')).length == 0){
      return
    }else{
      var child = document.getElementById('item-article')
      child.parentNode.removeChild(child)
    }
  }
});

userCheck.addEventListener( 'change', function() {
  if(this.checked) {
      propertiesList.insertAdjacentHTML('beforeend', userElement)
      addPropEventListener(document.getElementById('add-sub-property-user'), 'properties-user')
  } else {
    if($(document.getElementById('item-user')).length == 0){
      return
    }else{
      var child = document.getElementById('item-user')
      child.parentNode.removeChild(child)
    }
  }
});

var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
  document.getElementById("giphy").src = ""
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById("giphy").src = ""
  }
}

function getGiphy(){
  var xhr = $.get("https://api.giphy.com/v1/gifs/random?api_key=7b2ntI38Cu0wNw7u1Wz050RBKjElZEIS&tag=celebrate&limit=1");
  xhr.done(function(data) { 
    document.getElementById("giphy").src = data.data.images.original.url
    copyFunction ()
  });
}

function returnDomains(){
  if (domainsArr.length === 0){
    return projectData.deploymentDomains
  }else return domainsArr
}

function buildJsonObj (){
  return {
    clientName: namespaceOutput(document.querySelector('#client-input').value),
    projectCsm: returnPerson(document.querySelector('#csm-input').value, csmArr),
    projectSa: returnPerson(document.querySelector('#sa-input').value, saArr),
    deploymentDomains: returnDomains(),
    projectId: document.querySelector('#projectid-input').value,
    apiKey: document.querySelector('#apikey-input').value,
    type: document.getElementById('type').checked,
    content: document.getElementById('content').checked,
    article: document.getElementById('article').checked,
    user: document.getElementById('user').checked,
    amp: document.getElementById('amp').checked,
    fia: document.getElementById('fia').checked,
    android: document.getElementById('android').checked,
    kotlin: document.getElementById('kotlin').checked,
    java: document.getElementById('java').checked,
    ios: document.getElementById('ios').checked,
    swift: document.getElementById('swift').checked,
    objectiveC: document.getElementById('objective-c').checked,
    googleAS: document.getElementById('googleas').checked,
    appNexusAS: document.getElementById('appnexusas').checked,
    consent: document.getElementById('consent').checked,
    dfp: document.getElementById('dfp').checked,
    appNexus: document.getElementById('appnexus').checked,
    schema: propertyData
  }
}

function copyJson (){
  var copyText = JSON.stringify(buildJsonObj(), null, 3)
  const textArea = document.createElement('textarea')
  textArea.textContent = copyText
  document.body.append(textArea)
  textArea.select()
  document.execCommand('copy')
}

function copyFunction () {
  objStr = ``
  populateObject(propertiesList, propertyData)
  iterate(propertyData)
  var projectJson = buildJsonObj()
  document.getElementById('json-input').value = JSON.stringify(projectJson, null, 3)
  console.log(projectJson)
  var fullString = strings.intro + "\n" + strings.depolymentTools() + "\n" + strings.keys() + "\n" + strings.contacts() + "\n" + strings.domains() + "\n" + strings.webDeployment() + "\n" + ampSelected() + "\n" + fiaSelected() + "\n" + strings.userIdentity() + "\n" + consentSelected() + "\n" + dfpSelected() + "\n" + appNexusSelected() + "\n" + androidSelected() + "\n" + iosSelected()
  const copyText = fullString
  const textArea = document.createElement('textarea')
  textArea.textContent = copyText
  document.body.append(textArea)
  textArea.select()
  modal.style.display = "block";
  document.execCommand('copy')
  amp =  {"vars": {"namespace": "<NAMESPACE>","key": "<PUBLIC_API_KEY>"},"extraUrlParams": {}}
}

function init() {
  setUpEventListeners()
}

init()