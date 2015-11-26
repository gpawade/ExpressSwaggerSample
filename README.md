# Swagger UI Setup in node express for API

### Prerequesite
- node 
- npm 
- express generator cli

### Project Setup
```bash
$ express myapp
$ cd myapp && npm install
$ npm i swagger-node-express --save
```

**Creating swagger instance**
```javascript
var swagger = require("swagger-node-express");
```

**Swagger-UI module setup**
```javascript
var swaggerui = __dirname + '/node_modules/swagger-node-express/swagger-ui/';
var docs_handler = express.static(swaggerui);

app.get(/^\/docs(\/.*)?$/, function (req, res, next) {
  if (req.url === '/docs') { 
    res.writeHead(302, { 'Location': req.url + '/' });
    res.end();
    return;
  }
  // take off leading /docs so that connect locates file correctly
  req.url = req.url.substr('/docs'.length);
  return docs_handler(req, res, next);
});
```

**Defining Model**
```javascript
var models ={
    "Person":{
         'id':'Category',
        'required': ['id', 'name'],
        'properties':{
          'id':{
            'type':'integer',
            
            'description': 'person unique identifier',
            
          },
          'name':{
            'type':'string',
            'description': 'Name of the category'
          }
      }
    }d
```
You can find the swagger API documentation at [Site](https://github.com/swagger-api/swagger-spec/blob/master/versions/1.2.md) 

**Initializing Swagger**
```javascript
swagger.setAppHandler(app);

//set models to swagger
swagger.addModels(models); 

/// Here we can set the api, will look into next api route section .

//set api meta data
swagger.setApiInfo({
  title: 'Sample API',
  description: 'Test the swagger UI'
/*  termsOfServiceUrl: '',
  contact: '',
  license: '',
  licenseUrl: ''*/
});



//below setting for setting base url with specified version & resource listing path
swagger.configureSwaggerPaths("", "api-docs", "")
swagger.configure("http://localhost:8002", "1.0.0");
```

**API Route**
```javascript
//Get Person List
var getList = {
	spec: {
		description: 'List the person',
		path: "/api/list",
		notes: "return list of person",
		summary: "display list of person",
		method: "GET",
		type: 'Array[Person]',
		parameters: [],

		errorResponses: [],
		nickname: "list"
	},
	action: function (e, t) {
		t.send([
			{ name: 'john' },
			{ name: 'mike' }
		]);
	}
};
swagger.addGet(getList);

//Get Person By Id
var getById = {
	spec: {
		description: "Find a person",
		path: "/api/{personId}",
		notes: "Returns a person based on ID",
		summary: "Find person by ID",
		type: "Person",
		httpMethod: "GET",
		parameters: [swagger.pathParam("personId", "ID of person that needs to be fetched", "string")],
		errorResponses: [swagger.errors.invalid("personId"), swagger.errors.notFound("person")],
		nickname: "getPersonById"
	},
	action: function (req, res) {
		res.send(req.params.personId);
	}
};
swagger.addGet(getById);

// Create Person
var newPerson = {
	spec: {
		description: "create new person",
		path: "/api/new",
		notes: "Create new person",
		summary: "Create new person",
		httpMethod: "POST",
		type: 'void',
		parameters: [
			swagger.bodyParam("body", "Person which new to create", "Person", "", true)
		],
		errorResponses: [],
		nickname: "createPerson"
	},
	action: function (req, res) {
		console.log(req.body);
		res.send(req.body);
	}
};
swagger.addPost(newPerson);
```

You can find more details for spec defination at [Site](https://github.com/swagger-api/swagger-spec/blob/master/versions/1.2.md#523-operation-object).