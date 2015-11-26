var ApiSpecRegistration = function(swagger){
	
	var getList={
		spec : {
			description : 'List the person',
			path : "/api/list",
			notes :"return list of person",
			summary : "display list of person",
			method:"GET",
			type:'Array[Person]',
			parameters:[],
			
			errorResponses : [],
			nickname : "list"
		},
		action: function(e,t){
			t.send([
					{ name : 'john'},
					{name : 'mike'}
				]);
		}
	};	
	swagger.addGet(getList);
	
	var getById ={
		spec:{
			description:"Find a person",
			path:"/api/{personId}",
			notes:"Returns a person based on ID",
			summary:"Find person by ID",
			type:"Person",
			httpMethod:"GET",
			// params:[swagger.pathParam("personId","ID of person that needs to be fetched","string")],
			parameters:[swagger.pathParam("personId","ID of person that needs to be fetched","string")],
			//responseClass:"Person",
			errorResponses:[swagger.errors.invalid("_id"),swagger.errors.notFound("person")],
			nickname:"getPersonById"
          },
          action:function(req,res){
            // if(!req.params.personId){
              res.send(req.params.personId);
           	// }
		  }
	};
	swagger.addGet(getById);
	
	var newUser = {
		spec:{
			description:"create new person",
			path:"/api/new",
			notes:"Create new person",
			summary:"Create new person",
			httpMethod:"POST",
			type:'void',
			parameters:[
				swagger.bodyParam("body","Person which new to create","Person","",true)
			],
			errorResponses:[],
			nickname:"createPerson"
          },
          action:function(req,res){
             console.log(req.body);
             res.send(req.body);
		  }
	};
	swagger.addPost(newUser);
};


module.exports = ApiSpecRegistration;