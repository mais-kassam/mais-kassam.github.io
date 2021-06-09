function isInt(n) {
	return n % 1 === 0;
}

function checkType(value) {
	var val;
	if (Object.prototype.toString.call(value) === '[object Number]') {
		isInt(value) ? (val = 'integer') : (val = 'float');
		console.log(val);
		return val;
	} else if (Object.prototype.toString.call(value) === '[object String]') {
		if (value === '<INTEGER>') {
			return 'integer';
		} else if (value === '<FLOAT>') {
			return 'float';
		} else if (value === '<BOOLEAN>') {
			return 'boolean';
		} else if (value === '<DATE/TIME>') {
			return 'date';
		} else {
			return 'string';
		}
	} else if (
		Object.prototype.toString.call(value) === '[object Boolean]' ||
		value === '<BOOLEAN>'
	) {
		return 'boolean';
	}
}

var swaggerOutput = {
	fields: {},
};

function convertSwagger(swaggerOutput) {
	var output = {};
	output.schema = swaggerOutput.fields;
	return output;
}

function capitalise(prop, parent) {
	var reg = /\b([a-zÁ-ú]{3,})/g;
	var propResult = prop
		.replace('_', ' ')
		.replace(reg, (w) => w.charAt(0).toUpperCase() + w.slice(1))
		.replace(/^./, function (str) {
			return str.toUpperCase();
		});
	if (parent) {
		var parentResult = parent
			.replace('_', ' ')
			.replace(reg, (w) => w.charAt(0).toUpperCase() + w.slice(1))
			.replace(/^./, function (str) {
				return str.toUpperCase();
			});
	} else {
		var parentResult = '';
	}

	var propResult = prop
		.replace(/([A-Z])/g, ' $1')
		.replace(/^./, function (str) {
			return str.toUpperCase();
		});
	var result = parent ? parentResult + ' ' + propResult : propResult;
	return result;
}

function clientName(prop, parent) {
	if (parent === 'client') {
		switch (prop) {
			case 'domain':
				return 'Client Domain';
			case 'referrer':
				return 'Client Referrer';
			case 'title':
				return 'Client Title';
			case 'type':
				return 'Client Type';
			case 'url':
				return 'Client URL';
			case 'user_agent':
				return 'Client User Agent';
			default:
				return capitalise(prop, parent);
		}
	} else if (parent === 'isp_info') {
		switch (prop) {
			case 'autonomous_system_number':
				return 'ISP - Autonomous System Number';
			case 'autonomous_system_organization':
				return 'ISP - Autonomous System Organization';
			case 'isp':
				return 'ISP - Name';
			case 'organization':
				return 'ISP - Organization';
			default:
				return capitalise(prop, parent);
		}
	} else if (parent === 'geo_info') {
		switch (prop) {
			case 'city':
				return 'Geo - City';
			case 'continent':
				return 'Geo - Continent';
			case 'country':
				return 'Geo - Country';
			case 'postal_code':
				return 'Geo - Postal Code';
			case 'province':
				return 'Geo - Province';
			default:
				return capitalise(prop, parent);
		}
	} else {
		return capitalise(prop, parent);
	}
}

function clientDesciption(prop, parent) {
	if (parent === 'client') {
		switch (prop) {
			case 'domain':
				return 'The domain the event fired on';
			case 'referrer':
				return 'The referrer to the URL';
			case 'title':
				return 'The title of the web page the event occurred on (shown in the page tab)';
			case 'type':
				return 'The type of the client, e.g. AMP, FIA, web, iOS, Android';
			case 'url':
				return 'The URL of the web page the event occurred on';
			case 'user_agent':
				return 'The user agent of the client the event occurred on';
			default:
				return '';
		}
	} else if (parent === 'isp_info') {
		switch (prop) {
			case 'autonomous_system_number':
				return "Autonomous system number for the user's ISP";
			case 'autonomous_system_organization':
				return "Autonomous system organization for the user's ISP";
			case 'isp':
				return "Name of the user's ISP";
			case 'organization':
				return "Organization of the user's ISP";
			default:
				return '';
		}
	} else if (parent === 'geo_info') {
		switch (prop) {
			case 'city':
				return "Geolocation data for the user's city";
			case 'continent':
				return "Geolocation data for the user's continent";
			case 'country':
				return "Geolocation data for the user's country";
			case 'postal_code':
				return "Geolocation data for the user's postal code";
			case 'province':
				return "Geolocation data for the user's province";
			default:
				return '';
		}
	} else {
		return '';
	}
}

function createSwagger(obj, parent, output) {
	for (prop in obj) {
		if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
			console.log(Object.prototype.toString.call(obj[prop]));
			output.fields[prop] = {
				fields: {},
				name: 'Object',
				required: false,
				type: 'struct',
			};
			createSwagger(obj[prop], prop, output.fields[prop]);
		} else {
			if (Object.prototype.toString.call(obj[prop]) !== '[object Array]') {
				checkType(obj[prop]);
				if (output.fields === undefined) {
					output[prop] = {
						name: clientName(prop, parent),
						required: false,
						description: clientDesciption(prop, parent),
						type: checkType(obj[prop]),
					};
				} else {
					output.fields[prop] = {
						name: clientName(prop, parent),
						required: false,
						description: clientDesciption(prop, parent),
						type: checkType(obj[prop]),
						// type: Object.prototype.toString.call(obj[prop]).slice(-7, -1).toLowerCase()
					};
				}
			} else {
				// We need to add in a check to see the array is an array of strings or an array of integers etc.
				if (output.fields === undefined) {
					output[prop] = {
						fieldType: {
							name: capitalise(prop, parent),
							required: false,
							type: 'string',
						},
						type: 'array',
					};
				} else {
					output.fields[prop] = {
						fieldType: {
							name: capitalise(prop, parent),
							required: false,
							type: 'string',
						},
						type: 'array',
						// type: Object.prototype.toString.call(obj[prop]).slice(-7, -1).toLowerCase()
					};
				}
			}
		}
	}
	return swaggerOutput;
}

// createSwagger(testSchema, null, swaggerOutput.fields)

var propertyData = {};
var projectData = {};
var projectSchemaData = {};
var propertyDataArr = [];
var domainsArr = [];
var space = '';
var objString = [];
var jsonObj = [];
var tempKey;
var amp = {
	vars: { namespace: '<NAMESPACE>', key: '<PUBLIC_API_KEY>' },
	extraUrlParams: {},
};
var java = {};
var keysTracker = [];
var projKeysTracker = [];
var javaKeysTracker = [];

var propertiesList = document.getElementById('properties-propertyData');
var typeCheck = document.getElementById('type');
var contentCheck = document.getElementById('content');
var articleCheck = document.getElementById('article');
var userCheck = document.getElementById('user');
// var watsonCheck = document.getElementById('watson')
var clientCheck = document.getElementById('client');
var ispCheck = document.getElementById('isp');
var geoCheck = document.getElementById('geo');

var trashSvg = function (string) {
	return `<button id="delete-btn-${string}" class="delete"></button><svg enable-background="new 0 0 512 512" id="trash-svg" class="trash-svg" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M444.852,66.908h-99.339V47.04c0-21.943-17.792-39.736-39.736-39.736h-99.339   c-21.944,0-39.736,17.793-39.736,39.736v19.868H67.363v19.868h20.47l19.887,377.489c0,21.944,17.792,39.736,39.736,39.736h218.546   c21.944,0,39.736-17.792,39.736-39.736l19.538-377.489h19.577V66.908z M186.57,47.04c0-10.962,8.926-19.868,19.868-19.868h99.339   c10.962,0,19.868,8.906,19.868,19.868v19.868H186.57V47.04z M385.908,463.236l-0.039,0.505v0.524   c0,10.943-8.906,19.868-19.868,19.868H147.455c-10.942,0-19.868-8.925-19.868-19.868v-0.524l-0.019-0.523L107.72,86.776h297.669   L385.908,463.236z" fill="#8792a1"/><rect fill="#8792a1" height="317.885" width="19.868" x="246.173" y="126.511"/><polygon fill="#8792a1" points="206.884,443.757 186.551,126.493 166.722,127.753 187.056,445.017  "/><polygon fill="#8792a1" points="345.649,127.132 325.82,125.891 305.777,443.776 325.606,445.017  "/></g></svg>`;
};

var optionsString = function (selected) {
	return `  
  <option value="string"${
		selected === 'string' ? ' selected' : ''
	}>String</option>
  <option value="integer"${
		selected === 'integer' ? ' selected' : ''
	}>Integer</option>
  <option value="float"${selected === 'float' ? ' selected' : ''}>Float</option>
  <option value="object"${
		selected === 'object' ? ' selected' : ''
	}>Object</option>
  <option value="date"${
		selected === 'date' ? ' selected' : ''
	}>Date/Time</option>
  <option value="boolean"${
		selected === 'boolean' ? ' selected' : ''
	}>Boolean</option>
  <option value="lostring"${
		selected === 'lostring' ? ' selected' : ''
	}>List of Strings</option>
  <option value="lointegers"${
		selected === 'lointegers' ? ' selected' : ''
	}>List of Integers</option>
  <option value="lofloats"${
		selected === 'lofloats' ? ' selected' : ''
	}>List of Floats</option>
  <option value="loobjects"${
		selected === 'loobjects' ? ' selected' : ''
	}>List of Objects</option>`;
};

var propetyType = function (string) {
	return `                
  <select class="custom-select" id="property-type">
    ${optionsString('string')}
  </select><button id="delete-btn-${string}" class="delete"></button><svg enable-background="new 0 0 512 512" id="trash-svg" class="trash-svg" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M444.852,66.908h-99.339V47.04c0-21.943-17.792-39.736-39.736-39.736h-99.339   c-21.944,0-39.736,17.793-39.736,39.736v19.868H67.363v19.868h20.47l19.887,377.489c0,21.944,17.792,39.736,39.736,39.736h218.546   c21.944,0,39.736-17.792,39.736-39.736l19.538-377.489h19.577V66.908z M186.57,47.04c0-10.962,8.926-19.868,19.868-19.868h99.339   c10.962,0,19.868,8.906,19.868,19.868v19.868H186.57V47.04z M385.908,463.236l-0.039,0.505v0.524   c0,10.943-8.906,19.868-19.868,19.868H147.455c-10.942,0-19.868-8.925-19.868-19.868v-0.524l-0.019-0.523L107.72,86.776h297.669   L385.908,463.236z" fill="#8792a1"/><rect fill="#8792a1" height="317.885" width="19.868" x="246.173" y="126.511"/><polygon fill="#8792a1" points="206.884,443.757 186.551,126.493 166.722,127.753 187.056,445.017  "/><polygon fill="#8792a1" points="345.649,127.132 325.82,125.891 305.777,443.776 325.606,445.017  "/></g></svg>`;
};

var typeElement = `
<li class="property-item" id="item-type" style="width: 400px;">Type                
<select class="custom-select" id="property-type-item-type" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('type')}</li>`;

var contentElement = `
<li class="property-item" id="item-content" style="width: 400px;">Content                
<select class="custom-select" id="property-type-item-content" style="float: right;">
${optionsString('object')}
</select>${trashSvg(
	'content'
)}<ul id="properties-content"><li class="property-item" id="item-content-categories" style="width: 400px;">Categories                
<select class="custom-select" id="property-type-item-content-categories" style="float: right;">
  ${optionsString('lostring')}
</select>${trashSvg(
	'content-categories'
)}</li></ul><button id="add-sub-property-content" class="add-sub-property">+ Add Property</button></li>`;

var articleElement = `
<li class="property-item" id="item-article" style="width: 400px;">Article                
<select class="custom-select" id="property-type-item-article" style="float: right;">
${optionsString('object')}
</select>${trashSvg(
	'article'
)}<ul id="properties-article"><li class="property-item" id="item-article-properties" style="width: 400px;">Id                
<select class="custom-select" id="property-type-item-article-properties" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg(
	'article-properties'
)}</li><li class="property-item" id="item-article-title" style="width: 400px;">Title                
<select class="custom-select" id="property-type-item-article-title" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg(
	'article-title'
)}</li><li class="property-item" id="item-article-description" style="width: 400px;">Description                
<select class="custom-select" id="property-type-item-article-description" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg(
	'article-description'
)}</li><li class="property-item" id="item-article-authors" style="width: 400px;">Authors                
<select class="custom-select" id="property-type-item-article-authors" style="float: right;">
  ${optionsString('lostring')}
</select>${trashSvg(
	'article-authors'
)}</li><li class="property-item" id="item-article-tags" style="width: 400px;">Tags                
<select class="custom-select" id="property-type-item-article-tags" style="float: right;">
  ${optionsString('lostring')}
</select>${trashSvg(
	'article-tags'
)}</li><li class="property-item" id="item-article-modified" style="width: 400px;">Modified at                
<select class="custom-select" id="property-type-item-article-modified" style="float: right;">
  ${optionsString('date')}
</select>${trashSvg(
	'article-modified'
)}</li><li class="property-item" id="item-article-published" style="width: 400px;">Published at                
<select class="custom-select" id="property-type-item-article-published" style="float: right;">
  ${optionsString('date')}
</select>${trashSvg(
	'article-published'
)}</li><li class="property-item" id="item-article-premium" style="width: 400px;">Premium                
<select class="custom-select" id="property-type-item-article-premium" style="float: right;">
  ${optionsString('boolean')}
</select>${trashSvg(
	'article-premium'
)}</li></ul><button id="add-sub-property-article" class="add-sub-property">+ Add Property</button></li>`;

var watsonElement = `
<li class="property-item" id="item-watson" style="width: 400px;">classifications_watson                
<select class="custom-select" id="property-type-item-classifications-watson" style="float: right;">
${optionsString('object')}
</select>${trashSvg(
	'classifications_watson'
)}<ul id="properties-classifications-watson">
<li class="property-item" id="item-classifications-watson-concepts" style="width: 400px;">concepts                
<select class="custom-select" id="property-type-item-classifications-watson-concepts" style="float: right;">
  ${optionsString('loobjects')}
</select>${trashSvg('classifications-watson-categories')}</li>
<li class="property-item" id="item-classifications-watson-categories" style="width: 400px;">categories                
<select class="custom-select" id="property-type-item-classifications-watson-categories" style="float: right;">
  ${optionsString('loobjects')}
</select>${trashSvg('classifications-watson-entities')}</li>
<li class="property-item" id="item-classifications-watson-concepts" style="width: 400px;">entities                
<select class="custom-select" id="property-type-item-classifications-watson-entities" style="float: right;">
  ${optionsString('loobjects')}
</select>${trashSvg('classifications-watson-keywords')}</li>
<li class="property-item" id="item-classifications-watson-keywords" style="width: 400px;">keywords                
<select class="custom-select" id="property-type-item-classifications-watson-keywords" style="float: right;">
  ${optionsString('loobjects')}
</select>${trashSvg('classifications-watson-keywords')}</li>
<li class="property-item" id="item-classifications-watson-concepts" style="width: 400px;">sentiment                
<select class="custom-select" id="property-type-item-classifications-watson-sentiment" style="float: right;">
  ${optionsString('loobjects')}
</select>${trashSvg(
	'classifications-watson-sentiment'
)}</li></ul><button id="add-sub-property-watson" class="add-sub-property">+ Add Property</button></li>`;

var clientElement = `
<li class="property-item" id="item-client" style="width: 400px;">client                
<select class="custom-select" id="property-type-item-client" style="float: right;">
${optionsString('object')}
</select>${trashSvg('client')}<ul id="properties-client">
<li class="property-item" id="item-client-domain" style="width: 400px;">domain                
<select class="custom-select" id="property-type-item-client-domain" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('client-domain')}</li>
<li class="property-item" id="item-client-referrer" style="width: 400px;">referrer                
<select class="custom-select" id="property-type-item-client-referrer" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('client-referrer')}</li>
<li class="property-item" id="item-client-title" style="width: 400px;">title                
<select class="custom-select" id="property-type-item-client-title" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('client-title')}</li>
<li class="property-item" id="item-client-type" style="width: 400px;">type                
<select class="custom-select" id="property-type-item-client-type" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('client-type')}</li>
<li class="property-item" id="item-client-url" style="width: 400px;">url                
<select class="custom-select" id="property-type-item-client-url" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('client-url')}</li>
<li class="property-item" id="item-client-user-agent" style="width: 400px;">user_agent                
<select class="custom-select" id="property-type-item-client-user-agent" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('client-user-agent')}</li>
</ul><button id="add-sub-property-client" class="add-sub-property">+ Add Property</button></li>`;

var ispElement = `
<li class="property-item" id="item-isp" style="width: 400px;">isp_info                
<select class="custom-select" id="property-type-item-isp" style="float: right;">
${optionsString('object')}
</select>${trashSvg('isp')}<ul id="properties-isp">
<li class="property-item" id="item-isp-autonomous-system-number" style="width: 400px;">autonomous_system_number                
<select class="custom-select" id="property-type-item-isp-autonomous-system-number" style="float: right;">
  ${optionsString('integer')}
</select>${trashSvg('isp-autonomous-system-number')}</li>
<li class="property-item" id="item-isp-autonomous-system-organization" style="width: 420px;">autonomous_system_organization                
<select class="custom-select" id="property-type-item-isp-autonomous-system-organization" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('isp-autonomous-system-organization')}</li>
<li class="property-item" id="item-isp-name" style="width: 400px;">isp                
<select class="custom-select" id="property-type-item-isp-name" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('isp-name')}</li>
<li class="property-item" id="item-isp-organization" style="width: 400px;">organization                
<select class="custom-select" id="property-type-item-isp-organization" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('isp-organization')}</li>
</ul><button id="add-sub-property-client" class="add-sub-property">+ Add Property</button></li>`;

var geoElement = `
<li class="property-item" id="item-geo" style="width: 400px;">geo_info                
<select class="custom-select" id="property-type-item-geo" style="float: right;">
${optionsString('object')}
</select>${trashSvg('geo')}<ul id="properties-isp">
<li class="property-item" id="item-geo-city" style="width: 400px;">city                
<select class="custom-select" id="property-type-item-geo-city" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('geo-city')}</li>
<li class="property-item" id="item-geo-continent" style="width: 400px;">continent                
<select class="custom-select" id="property-type-item-geo-continent" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('geo-continent')}</li>
<li class="property-item" id="item-geo-country" style="width: 400px;">country                
<select class="custom-select" id="property-type-item-geo-country" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('geo-country')}</li>
<li class="property-item" id="item-geo-postal-code" style="width: 400px;">postal_code                
<select class="custom-select" id="property-type-item-geo-postal-code" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('geo-postal-code')}</li>
<li class="property-item" id="item-geo-province" style="width: 400px;">province                
<select class="custom-select" id="property-type-item-geo-province" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg('geo-province')}</li>
</ul><button id="add-sub-property-client" class="add-sub-property">+ Add Property</button></li>`;

var userElement = `
<li class="property-item" id="item-user" style="width: 400px;">User                
<select class="custom-select" id="property-type-item-user" style="float: right;">
${optionsString('object')}
</select>${trashSvg(
	'user'
)}<ul id="properties-user"><li class="property-item" id="item-user-type" style="width: 400px;">Type                
<select class="custom-select" id="property-type-item-user-type" style="float: right;">
  ${optionsString('string')}
</select>${trashSvg(
	'user-type'
)}</li></ul><button id="add-sub-property-user" class="add-sub-property">+ Add Property</button></li>`;

var data = [];
var uniObj;

function downloadJson() {
	var dataString =
		'data:text/json;charset=utf-8,' +
		encodeURIComponent(JSON.stringify(buildJsonObj(), null, 3));
	var downloadFunction = document.getElementById('copyfunc');
	downloadFunction.setAttribute('href', dataString);
	var date = new Date();
	downloadFunction.setAttribute(
		'download',
		`${
			namespaceOutput(document.querySelector('#client-input').value) +
			'_' +
			date.getDate() +
			'-' +
			parseInt(date.getMonth() + 1) +
			'-' +
			date.getFullYear()
		}.json`
	);
	downloadFunction.click();
}

function handleFileSelect(evt) {
	var files = evt.target.files;
	var output = [];
	for (var i = 0, f; (f = files[i]); i++) {
		var reader = new FileReader();
		reader.onload = (function (file) {
			return function (e) {
				populateList(e.target.result);
			};
		})(f);
		reader.readAsText(f);
	}
	document.getElementById('list').innerHTML =
		'<ul>' + output.join('') + '</ul>';
}
document
	.getElementById('files')
	.addEventListener('change', handleFileSelect, false);

var camelize = function (str) {
	return str
		.replace(/\s(.)/g, function ($1) {
			return $1.toUpperCase();
		})
		.replace(/\s/g, '')
		.replace(/^(.)/, function ($1) {
			return $1.toLowerCase();
		});
};

function variableType(objType) {
	if (objType == '<LIST>,<OF>,<STRINGS>') {
		return '<CSV_LIST>';
	}
	return objType;
}

function keyBuilder(key, value) {
	if (value == '<CSV_LIST>') {
		return 'properties.' + key + '!list[string]';
	} else {
		return 'properties.' + key;
	}
}

const iterate = (obj, parentKey) => {
	var obj_lngt = Object.keys(obj).length;
	var counter = 0;
	Object.keys(obj).forEach((key) => {
		counter++;
		if (obj[key] == '[object Object]') {
			keysTracker.push(key);
			iterate(obj[key], tempKey);
		}
		if (keysTracker.length > 0 && obj[key] != '[object Object]') {
			var temp = keyBuilder(
				keysTracker.join('.') + '.' + key,
				variableType(obj[key].toString())
			);
			amp.extraUrlParams[temp] = variableType(obj[key].toString());
		} else if (obj[key] != '[object Object]') {
			var temp = keyBuilder(key, variableType(obj[key].toString()));
			amp.extraUrlParams[temp] = variableType(obj[key].toString());
		}
		if (counter == obj_lngt || key == keysTracker.toString()) {
			keysTracker.pop();
		}
	});
};

const listIterate = (obj, list) => {
	var obj_lngt = Object.keys(obj).length;
	var counter = 0;
	Object.keys(obj).forEach((key) => {
		counter++;
		if (obj[key] == '[object Object]') {
			projKeysTracker.push(key);
			list.insertAdjacentHTML(
				'beforeend',
				`<li class="property-item" id="item-${counter}-${key}" style="width: 400px;">${key}                
        <select class="custom-select" id="property-type-item-${counter}-${key}" style="float: right;">
          ${optionsString('object')}
        </select><button id="delete-btn-item-item-${counter}-${key}" class="delete"></button><svg enable-background="new 0 0 512 512" id="trash-svg" class="trash-svg" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M444.852,66.908h-99.339V47.04c0-21.943-17.792-39.736-39.736-39.736h-99.339   c-21.944,0-39.736,17.793-39.736,39.736v19.868H67.363v19.868h20.47l19.887,377.489c0,21.944,17.792,39.736,39.736,39.736h218.546   c21.944,0,39.736-17.792,39.736-39.736l19.538-377.489h19.577V66.908z M186.57,47.04c0-10.962,8.926-19.868,19.868-19.868h99.339   c10.962,0,19.868,8.906,19.868,19.868v19.868H186.57V47.04z M385.908,463.236l-0.039,0.505v0.524   c0,10.943-8.906,19.868-19.868,19.868H147.455c-10.942,0-19.868-8.925-19.868-19.868v-0.524l-0.019-0.523L107.72,86.776h297.669   L385.908,463.236z" fill="#8792a1"></path><rect fill="#8792a1" height="317.885" width="19.868" x="246.173" y="126.511"></rect><polygon fill="#8792a1" points="206.884,443.757 186.551,126.493 166.722,127.753 187.056,445.017  "></polygon><polygon fill="#8792a1" points="345.649,127.132 325.82,125.891 305.777,443.776 325.606,445.017  "></polygon></g></svg>
        <ul id="properties-${key}"></ul>
        <button id="add-sub-property-${key}" class="add-sub-property">+ Add Property</button></li>`
			);
			document
				.getElementById(`add-sub-property-${key}`)
				.addEventListener('click', function () {
					addProperty(`properties-${key}`);
				});
			document
				.getElementById(`property-type-item-${counter}-${key}`)
				.addEventListener('change', function () {
					var typeEl = document.getElementById(
						`property-type-item-${counter}-${key}`
					);
					propType(typeEl.value, property, key);
				});
			listIterate(obj[key], document.getElementById(`properties-${key}`));
		}
		if (projKeysTracker.length > 0 && obj[key] != '[object Object]') {
			list.insertAdjacentHTML(
				'beforeend',
				propElement(key, obj[key].toString(), counter)
			);
			document
				.getElementById(`property-type-${key}`)
				.addEventListener('change', function () {
					var typeEl = document.getElementById(`property-type-${key}`);
					propType(typeEl.value, typeEl.parentNode, key);
				});
		} else if (obj[key] != '[object Object]') {
			list.insertAdjacentHTML(
				'beforeend',
				propElement(key, obj[key].toString(), counter)
			);
			document
				.getElementById(`property-type-${key}`)
				.addEventListener('change', function () {
					var typeEl = document.getElementById(`property-type-${key}`);
					propType(typeEl.value, typeEl.parentNode, key);
				});
		}
		if (counter == obj_lngt || key == projKeysTracker.toString()) {
			projKeysTracker.pop();
		}
	});
};

function propElement(key, type, counter) {
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
  </select><button id="delete-btn-${key}" class="delete"></button><svg enable-background="new 0 0 512 512" id="trash-svg" class="trash-svg" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M444.852,66.908h-99.339V47.04c0-21.943-17.792-39.736-39.736-39.736h-99.339   c-21.944,0-39.736,17.793-39.736,39.736v19.868H67.363v19.868h20.47l19.887,377.489c0,21.944,17.792,39.736,39.736,39.736h218.546   c21.944,0,39.736-17.792,39.736-39.736l19.538-377.489h19.577V66.908z M186.57,47.04c0-10.962,8.926-19.868,19.868-19.868h99.339   c10.962,0,19.868,8.906,19.868,19.868v19.868H186.57V47.04z M385.908,463.236l-0.039,0.505v0.524   c0,10.943-8.906,19.868-19.868,19.868H147.455c-10.942,0-19.868-8.925-19.868-19.868v-0.524l-0.019-0.523L107.72,86.776h297.669   L385.908,463.236z" fill="#8792a1"/><rect fill="#8792a1" height="317.885" width="19.868" x="246.173" y="126.511"/><polygon fill="#8792a1" points="206.884,443.757 186.551,126.493 166.722,127.753 187.056,445.017  "/><polygon fill="#8792a1" points="345.649,127.132 325.82,125.891 305.777,443.776 325.606,445.017  "/></g></svg></li>`;
}

function stringSelect(type) {
	if (type == '<STRING>') {
		return '<option value="string" selected>String</option>';
	} else {
		return '<option value="string">String</option>';
	}
}

function integerSelect(type) {
	if (type == '<INTEGER>') {
		return '<option value="integer" selected>Integer</option>';
	} else {
		return '<option value="integer">Integer</option>';
	}
}

function floatSelect(type) {
	if (type == '<FLOAT>') {
		return '<option value="float" selected>Float</option>';
	} else {
		return '<option value="float">Float</option>';
	}
}

function dateSelect(type) {
	if (type == '<DATE/TIME>') {
		return '<option value="date" selected>Date/Time</option>';
	} else {
		return '<option value="date">Date/Time</option>';
	}
}

function booleanSelect(type) {
	if (type == '<BOOLEAN>') {
		return '<option value="boolean" selected>Boolean</option>';
	} else {
		return '<option value="boolean">Boolean</option>';
	}
}

function lostringSelect(type) {
	if (type == '<LIST>,<OF>,<STRINGS>') {
		return '<option value="lostring" selected>List of Strings</option>';
	} else {
		return '<option value="lostring">List of Strings</option>';
	}
}

function lointegersSelect(type) {
	if (type == '<LIST>,<OF>,<INTEGERS>') {
		return '<option value="lointegers" selected>List of Integers</option>';
	} else {
		return '<option value="lointegers">List of Integers</option>';
	}
}

function lofloatsSelect(type) {
	if (type == '<LIST>,<OF>,<INTEGERS>') {
		return '<option value="lofloats" selected>List of Floats</option>';
	} else {
		return '<option value="lofloats">List of Floats</option>';
	}
}

function changeStateAddPropertiesButtons(value) {
	var nodes = document.querySelectorAll('.add-property, .add-sub-property');
	var nodesArr = Array.prototype.slice.call(nodes);
	nodesArr.forEach((el) => {
		el.disabled = value;
	});
}

function populateList(jsonObj) {
	document.getElementById('properties-propertyData').innerHTML = '';
	document.getElementById('json-input').value = jsonObj;
	projectData = JSON.parse(jsonObj);
	projectSchemaData = projectData['schema'];
	listIterate(
		projectSchemaData,
		document.getElementById('properties-propertyData')
	);
	setUpEventListeners();
}

function populateListSwagger(jsonObj) {
	document.getElementById('properties-propertyData').innerHTML = '';
	document.getElementById('json-input-swagger').value = jsonObj;
	projectData = JSON.parse(jsonObj);
	projectSchemaData = projectData['schema'];
	listIterate(
		projectSchemaData,
		document.getElementById('properties-propertyData')
	);
	setUpEventListeners();
}

function domainEventListeners() {
	var nodes = document.querySelectorAll('#delete-domain');
	var nodesArr = Array.prototype.slice.call(nodes);
	if (nodesArr) {
		nodesArr.forEach((el) => {
			el.addEventListener('click', function () {
				if (this.parentNode.parentNode === null) {
					return;
				} else {
					this.parentNode.parentNode.removeChild(this.parentNode);
					for (var i = 0; i < domainsArr.length; i++) {
						if (this.parentNode.textContent === domainsArr[i]) {
							domainsArr.splice(i, 1);
						}
					}
					return;
				}
			});
		});
	}
}

function populateDomains(arr) {
	var domEl = '';
	if (arr) {
		for (var i = 0; i < arr.length; i++) {
			domEl += `<li>${arr[i]}<a class="icon icon-inline icon-remove remove-domain" id="delete-domain" style="display: inline-block; position: relative; top: 1px;"></a></li>`;
		}
	}
	return domEl;
}

function populateObject(list, obj) {
	var listNodes = list.childNodes;
	var listArr = Array.prototype.slice.call(listNodes);
	for (var i = 0; i < listArr.length; i++) {
		if (listArr[i].localName == 'li') {
			var subNodes = listArr[i].childNodes;
			var subListArr = Array.prototype.slice.call(subNodes);
			for (var y = 0; y < subListArr.length; y++) {
				if (subListArr[y].localName == 'select') {
					if (subListArr[y].value !== 'object') {
						obj[`${camelize(subListArr[y - 1].textContent.split('\n')[0])}`] =
							typeOutput(subListArr[y].value);
					} else {
						obj[`${camelize(subListArr[y - 1].textContent.split('\n')[0])}`] =
							{};
						var string = camelize(subListArr[y - 1].textContent.split('\n')[0]);
						var propNodes = subListArr[y].parentNode.childNodes;
						var propListArr = Array.prototype.slice.call(propNodes);
						for (var z = 0; z < propListArr.length; z++) {
							if (propListArr[z].localName == 'ul') {
								populateObject(propListArr[z], obj[string]);
							}
						}
					}
				}
			}
		}
	}
}

function typeOutput(type) {
	if (type == 'string') {
		return '<STRING>';
	} else if (type == 'integer') {
		return '<INTEGER>';
	} else if (type == 'float') {
		return '<FLOAT>';
	} else if (type == 'date') {
		return '<DATE/TIME>';
	} else if (type == 'boolean') {
		return '<BOOLEAN>';
	} else if (type == 'lostring') {
		return ['<LIST>', '<OF>', '<STRINGS>'];
	} else if (type == 'lointegers') {
		return '[<LIST>,<OF>,<INTEGERS>]';
	} else if (type == 'lofloats') {
		return '[<LIST>,<OF>,<FLOATS>]';
	} else {
		return '{';
	}
}

function returnDomainList() {
	var string = ``;
	if (domainsArr.length > 0) {
		for (var i = 0; i < domainsArr.length; i++) {
			string += `- ${domainsArr[i]} \n`;
		}
	} else if (
		projectData.deploymentDomains !== undefined &&
		projectData.deploymentDomains.length > 0
	) {
		for (var i = 0; i < projectData.deploymentDomains.length; i++) {
			string += `- ${projectData.deploymentDomains[i]} \n`;
		}
	}

	return string;
}

function namespaceOutput(value) {
	return value.toLowerCase().replace(' ', '');
}

function returnPerson(input, arr) {
	var person;
	for (var i = 0; i < arr.length; i++) {
		if (
			arr[i].toLowerCase().includes(input.toLowerCase()) === true ||
			arr[i].toLowerCase() == input.toLowerCase()
		) {
			person = arr[i];
		}
	}
	return person;
}

function setUpEventListeners() {
	document.getElementById('submit-btn').addEventListener('click', getGiphy);
	document.getElementById('copy-btn').addEventListener('click', copyJson);
	document.getElementById('dwnld-btn').addEventListener('click', downloadJson);
	document
		.getElementById('add-property')
		.addEventListener('click', addProperty);

	document.addEventListener('click', function (e) {
		if (e.target.id.includes('delete-btn')) {
			var child = e.target.parentNode;
			child.parentNode.removeChild(child);
		}
	});
}

function Property(id, value, type) {
	this.id = id;
	this.value = value;
	this.type = type;
}

function addProperty(value) {
	var property = document.createElement('li');
	property.className = 'property-item';
	property.id = `item-${propertyDataArr.length + 1}`;
	var list;

	if (value && value.type !== 'click') {
		list = document.getElementById(value);
	} else {
		list = document.getElementById('properties-propertyData');
	}

	list.appendChild(property);
	var propertyInput = document.createElement('input');
	propertyInput.id = `item-${propertyDataArr.length + 1}`;
	property.appendChild(propertyInput);
	propertyInput.style.width = '400px';
	propertyInput.classList = 'var-input';
	propertyInput.focus();
	changeStateAddPropertiesButtons(true);
	document.addEventListener('keypress', function (e) {
		if (propertyInput.value !== '' && e.keyCode === 13) {
			changeStateAddPropertiesButtons(false);
			property.innerHTML = '';
			property.style.width = '400px';
			if (property.id == `item-${propertyDataArr.length + 1}`) {
				var propertyObj = new Property(
					propertyDataArr.length + 1,
					propertyInput.value
				);
				var listName = list.id.split('properties-')[1];
				propertyDataArr.push(propertyObj);
				propertyInput.value = '';
			}
			property.innerHTML =
				propertyObj.value + propetyType(`${property.id}`, property);
			var type = document.getElementById('property-type');
			type.id = `property-type-${property.id}`;
			type.style = 'float: right;';
			document
				.getElementById(`property-type-${property.id}`)
				.addEventListener('change', function () {
					var typeEl = document.getElementById(`property-type-${property.id}`);
					propType(
						typeEl.value,
						property,
						propertyDataArr[parseInt(typeEl.id.split('-')[3]) - 1].value
					);
				});
		} else {
			propertyInput.style = 'width: 400px; border: 1px solid rgb(249,99,107)';
			propertyInput.placeholder = 'Please enter a property name';
			propertyInput.placeholder.color = 'rgb(249,99,107)';
		}
	});
}

function propType(type, property, value) {
	var childNodes = property.childNodes;
	var childNodesArr = Array.prototype.slice.call(childNodes);

	if (type === 'object') {
		for (var i = 0; i < childNodesArr.length; i++) {
			if (childNodesArr[i].type !== 'submit') {
				var addProp = document.createElement('button');
				addProp.id = `add-sub-property`;
				addProp.classList = 'add-sub-property';
				addProp.innerText = '+ Add Property';
				var list = document.createElement('ul');
				list.id = `properties-${camelize(value)}`;
				property.appendChild(list);
				property.appendChild(addProp);
				addProp.addEventListener('click', function () {
					addProperty(`properties-${camelize(value)}`);
				});
				return;
			} else {
				childNodesArr[i].style = 'display:block';
			}
		}
	} else if (type === 'string') {
		for (var i = 0; i < childNodesArr.length; i++) {
			if (
				childNodesArr[i].type === 'submit' &&
				childNodesArr[i].innerText === '+ Add Property'
			) {
				childNodesArr[i].style = 'display:none';
			}
		}
	} else if (type === 'integer') {
		for (var i = 0; i < childNodesArr.length; i++) {
			if (
				childNodesArr[i].type === 'submit' &&
				childNodesArr[i].innerText === '+ Add Property'
			) {
				childNodesArr[i].style = 'display:none';
			}
		}
	}
}

typeCheck.addEventListener('change', function () {
	if (this.checked) {
		propertiesList.insertAdjacentHTML('afterbegin', typeElement);
	} else {
		if ($(document.getElementById('item-type')).length == 0) {
			return;
		} else {
			var child = document.getElementById('item-type');
			child.parentNode.removeChild(child);
		}
	}
});

function addPropEventListener(button, string) {
	button.addEventListener('click', function () {
		addProperty(string);
	});
}

contentCheck.addEventListener('change', function () {
	if (this.checked && $(document.getElementById('item-type')).length == 0) {
		propertiesList.insertAdjacentHTML('afterbegin', contentElement);
		addPropEventListener(
			document.getElementById('add-sub-property-content'),
			'properties-content'
		);
	} else if (
		this.checked &&
		$(document.getElementById('item-type')).length > 0
	) {
		document
			.getElementById('item-type')
			.insertAdjacentHTML('afterend', contentElement);
		addPropEventListener(
			document.getElementById('add-sub-property-content'),
			'properties-content'
		);
	} else {
		if ($(document.getElementById('item-content')).length == 0) {
			return;
		} else {
			var child = document.getElementById('item-content');
			child.parentNode.removeChild(child);
		}
	}
});

articleCheck.addEventListener('change', function () {
	if (
		this.checked &&
		$(document.getElementById('item-type')).length == 0 &&
		$(document.getElementById('item-content')).length == 0
	) {
		propertiesList.insertAdjacentHTML('afterbegin', articleElement);
		addPropEventListener(
			document.getElementById('add-sub-property-article'),
			'properties-article'
		);
	} else if (
		this.checked &&
		($(document.getElementById('item-type')).length > 0 ||
			$(document.getElementById('item-content')).length > 0)
	) {
		if ($(document.getElementById('item-content')).length == 0) {
			document
				.getElementById('item-type')
				.insertAdjacentHTML('afterend', articleElement);
			addPropEventListener(
				document.getElementById('add-sub-property-article'),
				'properties-article'
			);
		} else {
			document
				.getElementById('item-content')
				.insertAdjacentHTML('afterend', articleElement);
			addPropEventListener(
				document.getElementById('add-sub-property-article'),
				'properties-article'
			);
		}
	} else {
		if ($(document.getElementById('item-article')).length == 0) {
			return;
		} else {
			var child = document.getElementById('item-article');
			child.parentNode.removeChild(child);
		}
	}
});

userCheck.addEventListener('change', function () {
	if (this.checked) {
		propertiesList.insertAdjacentHTML('beforeend', userElement);
		addPropEventListener(
			document.getElementById('add-sub-property-user'),
			'properties-user'
		);
	} else {
		if ($(document.getElementById('item-user')).length == 0) {
			return;
		} else {
			var child = document.getElementById('item-user');
			child.parentNode.removeChild(child);
		}
	}
});

// watsonCheck.addEventListener( 'change', function() {
//   if(this.checked) {
//       propertiesList.insertAdjacentHTML('beforeend', watsonElement)
//       addPropEventListener(document.getElementById('add-sub-property-watson'), 'properties-classifications-watson')
//   } else {
//     if($(document.getElementById('item-watson')).length == 0){
//       return
//     }else{
//       var child = document.getElementById('item-watson')
//       child.parentNode.removeChild(child)
//     }
//   }
// });

clientCheck.addEventListener('change', function () {
	if (this.checked) {
		propertiesList.insertAdjacentHTML('beforeend', clientElement);
		addPropEventListener(
			document.getElementById('add-sub-property-client'),
			'properties-client'
		);
	} else {
		if ($(document.getElementById('item-client')).length == 0) {
			return;
		} else {
			var child = document.getElementById('item-client');
			child.parentNode.removeChild(child);
		}
	}
});

ispCheck.addEventListener('change', function () {
	if (this.checked) {
		propertiesList.insertAdjacentHTML('beforeend', ispElement);
		addPropEventListener(
			document.getElementById('add-sub-property-isp'),
			'properties-isp'
		);
	} else {
		if ($(document.getElementById('item-isp')).length == 0) {
			return;
		} else {
			var child = document.getElementById('item-isp');
			child.parentNode.removeChild(child);
		}
	}
});

geoCheck.addEventListener('change', function () {
	if (this.checked) {
		propertiesList.insertAdjacentHTML('beforeend', geoElement);
		addPropEventListener(
			document.getElementById('add-sub-property-geo'),
			'properties-geo'
		);
	} else {
		if ($(document.getElementById('item-geo')).length == 0) {
			return;
		} else {
			var child = document.getElementById('item-geo');
			child.parentNode.removeChild(child);
		}
	}
});

var modal = document.getElementById('myModal');

var span = document.getElementsByClassName('close')[0];

span.onclick = function () {
	modal.style.display = 'none';
	document.getElementById('giphy').src = '';
};

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
		document.getElementById('giphy').src = '';
	}
};

function getGiphy() {
	var xhr = $.get(
		'https://api.giphy.com/v1/gifs/random?api_key=7b2ntI38Cu0wNw7u1Wz050RBKjElZEIS&tag=celebrate&limit=1'
	);
	xhr.done(function (data) {
		document.getElementById('giphy').src = data.data.images.original.url;
		copyFunction();
	});
}

function buildJsonObj() {
	return {
		schema: propertyData,
	};
}

function copyJson() {
	var projectJson = buildJsonObj();
	var copyText = JSON.stringify(
		convertSwagger(createSwagger(projectJson.schema, null, swaggerOutput)),
		null,
		3
	);
	const textArea = document.createElement('textarea');
	textArea.textContent = copyText;
	document.body.append(textArea);
	textArea.select();
	document.execCommand('copy');
}

function copyFunction() {
	objStr = ``;
	populateObject(propertiesList, propertyData);
	iterate(propertyData);
	var projectJson = buildJsonObj();
	document.getElementById('json-input').value = JSON.stringify(
		projectJson,
		null,
		3
	);
	console.log(projectJson.schema);
	document.getElementById('json-input-swagger').value = JSON.stringify(
		convertSwagger(createSwagger(projectJson.schema, null, swaggerOutput)),
		null,
		3
	);
}

function init() {
	setUpEventListeners();
}

init();
